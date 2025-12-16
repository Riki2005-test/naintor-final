import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three' // Import Three.js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { parseGIF, decompressFrames } from 'gifuct-js'

gsap.registerPlugin(ScrollTrigger)

// --- Transparent GIF Player ---
const loadTransparentGif = async (url, canvasId) => {
    const canvas = document.getElementById(canvasId)
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Fetch GIF
    const resp = await fetch(url)
    const buffer = await resp.arrayBuffer()
    const gif = parseGIF(buffer)
    const frames = decompressFrames(gif, true)

    // Setup Canvas Size
    canvas.width = frames[0].dims.width
    canvas.height = frames[0].dims.height

    // Temp canvas for frame composition
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = canvas.width
    tempCanvas.height = canvas.height
    const tempCtx = tempCanvas.getContext('2d')

    let frameIndex = 0
    let lastTime = 0
    let accumulatedTime = 0

    // Render Frame
    const renderFrame = () => {
        const frame = frames[frameIndex]
        const { width, height, top, left } = frame.dims

        // Draw frame patch to temp canvas
        // Note: gifuct-js gives patch data. For transparency we need to handle disposal.
        // Simplified: Clear temp if disposal is 2 (restore bg). 
        // For this specific black-bg GIF, we just want to draw frame and key out black.

        const imageData = new ImageData(frame.patch, width, height)
        tempCtx.putImageData(imageData, left, top)

        // Keying out Black
        const frameData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height)
        const data = frameData.data

        for (let i = 0; i < data.length; i += 4) {
            const r = data[i]
            const g = data[i + 1]
            const b = data[i + 2]

            // Chroma Key: If pixels are dark (black background), make transparent
            // Threshold 40 to catch compression artifacts
            if (r < 40 && g < 40 && b < 40) {
                data[i + 3] = 0 // Alpha 0
            }
        }

        ctx.putImageData(frameData, 0, 0)
    }

    const animate = (time) => {
        if (!lastTime) lastTime = time
        const delta = time - lastTime
        lastTime = time
        accumulatedTime += delta

        const frame = frames[frameIndex]

        // Handle GIF delay quirks. Some GIFs have 0 delay which means 'fast as possible' (browser defaults to 100ms)
        // Others might report centiseconds vs ms. 
        // We enforce a sane minimum to prevent 'warp speed'.
        let delay = frame.delay || 100
        if (delay < 20) delay = 100 // If delay is < 20ms, assume it's garbage or too fast, default to 100ms

        if (accumulatedTime >= delay) {
            renderFrame()
            accumulatedTime -= delay
            frameIndex = (frameIndex + 1) % frames.length
        }

        requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
}
// Load Hero Video - Using optimized WebM (2.3MB vs 27MB GIF)
let heroVideoLoaded = false
const initHeroVideo = () => {
    const heroCanvas = document.getElementById('hero-gif-canvas')
    if (!heroCanvas || heroVideoLoaded) return

    // Use Intersection Observer to lazy load video when visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !heroVideoLoaded) {
                heroVideoLoaded = true
                // Load smaller video on mobile for faster performance
                const videoPath = isMobileDevice() ? '/hero-glasses-mobile.webm' : '/hero-glasses.webm'
                loadTransparentVideo(videoPath, 'hero-gif-canvas')
                observer.disconnect()
            }
        })
    }, { threshold: 0.1 })

    observer.observe(heroCanvas)
}

// Video player with black background removal (chroma key)
const loadTransparentVideo = (url, canvasId) => {
    const canvas = document.getElementById(canvasId)
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    // Create hidden video element
    const video = document.createElement('video')
    video.src = url
    video.loop = true
    video.muted = true
    video.playsInline = true
    video.setAttribute('playsinline', '') // iOS Safari
    video.setAttribute('webkit-playsinline', '') // Older iOS
    video.crossOrigin = 'anonymous'
    video.preload = 'auto'

    video.addEventListener('loadedmetadata', () => {
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight
        video.play().catch(e => console.warn('Video autoplay blocked:', e))
    })

    // Manual loop fallback for mobile browsers where loop attribute may fail
    video.addEventListener('ended', () => {
        video.currentTime = 0
        video.play().catch(e => console.warn('Video replay blocked:', e))
    })

    // Keep render loop running continuously
    let isRendering = false
    const renderFrame = () => {
        // Skip frame if video is paused, but keep loop running for when it resumes
        if (!video.paused && !video.ended) {
            ctx.drawImage(video, 0, 0)

            // Apply chroma key to remove black background
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
            const data = imageData.data

            for (let i = 0; i < data.length; i += 4) {
                const r = data[i]
                const g = data[i + 1]
                const b = data[i + 2]

                // If pixel is dark (black background), make transparent
                if (r < 40 && g < 40 && b < 40) {
                    data[i + 3] = 0 // Alpha 0
                }
            }

            ctx.putImageData(imageData, 0, 0)
        }
        requestAnimationFrame(renderFrame)
    }

    video.addEventListener('play', () => {
        if (!isRendering) {
            isRendering = true
            requestAnimationFrame(renderFrame)
        }
    })
}

// --- Mobile Detection Utility ---
const isMobileDevice = () => {
    return window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
}

// --- Reduced Motion Preference ---
const prefersReducedMotion = () => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// --- Shader Background Effect (Three.js) ---
const initShaderAnimation = () => {
    const canvas = document.getElementById('matrix-canvas')
    if (!canvas) return

    // Mobile optimization: use lower pixel ratio for performance
    const isMobile = isMobileDevice()
    const pixelRatio = isMobile ? 1 : Math.min(window.devicePixelRatio, 2)

    // Renderer attached to existing canvas
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true })
    renderer.setPixelRatio(pixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    // Camera
    const camera = new THREE.Camera()
    camera.position.z = 1

    // Scene
    const scene = new THREE.Scene()

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2)

    // Uniforms - Use drawing buffer size for correct centering on high DPI screens
    const uniforms = {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2() }
    }

    // Set initial size
    renderer.getDrawingBufferSize(uniforms.resolution.value)

    // Shaders
    const vertexShader = `
    void main() {
      gl_Position = vec4( position, 1.0 );
    }
  `

    const fragmentShader = `
    #define TWO_PI 6.2831853072
    #define PI 3.14159265359

    precision highp float;
    uniform vec2 resolution;
    uniform float time;
      
    float random (in float x) {
        return fract(sin(x)*1e4);
    }
    float random (vec2 st) {
        return fract(sin(dot(st.xy,
                             vec2(12.9898,78.233)))*
            43758.5453123);
    }
    
    void main(void) {
      vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
      
      vec2 fMosaicScal = vec2(4.0, 2.0);
      vec2 vScreenSize = vec2(256,256);
      uv.x = floor(uv.x * vScreenSize.x / fMosaicScal.x) / (vScreenSize.x / fMosaicScal.x);
      uv.y = floor(uv.y * vScreenSize.y / fMosaicScal.y) / (vScreenSize.y / fMosaicScal.y);       
        
      float t = time*0.06+random(uv.x)*0.4;
      float lineWidth = 0.0008;

      vec3 color = vec3(0.0);
      for(int j = 0; j < 3; j++){
        for(int i=0; i < 5; i++){
          // Zoom adjustment: 0.8 makes the pattern smaller/tighter than 0.4
          color[j] += lineWidth*float(i*i) / abs(fract(t - 0.01*float(j)+float(i)*0.01)*1.0 - length(uv) * 0.8);        
        }
      }
      
      // Theme Match: Napalm/Toxic Green
      // Calculate total intensity from the 3 channels
      float intensity = (color[0] + color[1] + color[2]) / 3.0;
      
      // Apply to Green channel dominant, slight Blue for tech feel
      vec3 themeColor = vec3(0.0, 1.0, 0.4) * intensity;
      
      gl_FragColor = vec4(themeColor, 1.0);
    }
  `

    // Material
    const material = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
    })

    // Mesh
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Resize Handler
    const onWindowResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.getDrawingBufferSize(uniforms.resolution.value)
    }
    window.addEventListener('resize', onWindowResize, false)

    // Animation Loop - throttled on mobile for performance
    let lastTime = 0
    const targetFPS = isMobile ? 30 : 60
    const frameInterval = 1000 / targetFPS

    const animate = (currentTime) => {
        requestAnimationFrame(animate)

        const deltaTime = currentTime - lastTime
        if (deltaTime < frameInterval) return

        lastTime = currentTime - (deltaTime % frameInterval)
        uniforms.time.value += 0.05
        renderer.render(scene, camera)
    }
    requestAnimationFrame(animate)
}

// Start shader
// initShaderAnimation() moved to window.load

// --- HyperText Effect ---
const initHyperText = () => {
    const element = document.getElementById('hero-title')
    if (!element) return

    const originalText = element.textContent
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const duration = 800
    let iterations = 0
    let intervalId = null

    // Split text into words, then letters
    const words = originalText.split(' ')
    element.innerHTML = words.map((word, wIndex) => {
        const letters = word.split('').map((char, cIndex) => {
            // Calculate global index for staggering
            const globalIndex = words.slice(0, wIndex).join('').length + cIndex
            return `<span class="hyper-letter" data-index="${globalIndex}">${char}</span>`
        }).join('')

        let output = `<span class="hyper-word" style="display: inline-block; white-space: nowrap; margin-right: 0.5em;">${letters}</span>`

        // Configurable line break (Hardcoded for this specific title design)
        if (word === 'YOUR') {
            output += '<br>'
        }

        return output
    }).join('')

    const letters = element.querySelectorAll('.hyper-letter')
    const cleanText = originalText.replace(/ /g, '')

    const scramble = () => {
        if (intervalId) clearInterval(intervalId)
        iterations = 0

        intervalId = setInterval(() => {
            letters.forEach((letter, i) => {
                // Use cleanText for comparison since spaces are structural now
                if (i <= iterations) {
                    if (letter.textContent !== cleanText[i]) {
                        letter.textContent = cleanText[i]
                        // Animate settled letter only once
                        gsap.fromTo(letter,
                            { opacity: 0, y: -10 },
                            { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
                        )
                    }
                } else {
                    letter.textContent = alphabets[Math.floor(Math.random() * 26)]
                }
            })

            iterations += 0.1

            if (iterations >= cleanText.length) {
                clearInterval(intervalId)
                intervalId = null
            }
        }, duration / (cleanText.length * 10))
    }

    // Trigger on load immediately
    setTimeout(scramble, 100)

    // Trigger on hover
    element.addEventListener('mouseenter', scramble)
}

// initHyperText() moved to window.load

// --- GSAP Animations ---

// Hero Content Entry
const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } })

heroTl.from('.logo-img', {
    y: -50,
    opacity: 0,
    duration: 1,
    delay: 0.2
})
    .from('.nav-links a', {
        y: -20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8
    }, '-=0.5')
    .from('.hero-content > *:not(#hero-title)', {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.15
    }, '-=0.5')
    .fromTo('.hero-visual', {
        y: 50,
        opacity: 0
    }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
    }, '-=1')

// Scroll Animations
gsap.utils.toArray('section').forEach((section, i) => {
    if (section.id === 'hero') return // Skip hero as it's handled above

    gsap.from(section.children, {
        scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power2.out'
    })
})

// Navbar glass effect on scroll
const navbar = document.getElementById('navbar')
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.borderBottom = '1px solid rgba(0, 255, 65, 0.3)'
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)'
    } else {
        navbar.style.borderBottom = '1px solid rgba(0, 255, 65, 0.1)'
        navbar.style.boxShadow = 'none'
    }
})

// --- Border Glow Effect ---
const glowCards = document.querySelectorAll('.value-card, .feature-item')
glowCards.forEach(card => {
    card.classList.add('glow-effect') // Ensure class is added

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        // Calculate angle
        const angle = Math.atan2(y - centerY, x - centerX) * 180 / Math.PI + 90

        card.style.setProperty('--angle', `${angle}deg`)
        card.style.setProperty('--opacity', '1')
    })

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--opacity', '0')
    })
})

// --- 3D Glasses Model Viewer (Interactive) ---
// OrbitControls imported at top

let model3DLoaded = false
const init3DModel = () => {
    const canvas = document.getElementById('model-canvas')
    if (!canvas || model3DLoaded) return

    const loadBtn = document.getElementById('load-3d-btn')
    const statusText = document.getElementById('system-status')

    if (!canvas || !loadBtn || model3DLoaded) return

    loadBtn.addEventListener('click', () => {
        model3DLoaded = true
        loadBtn.textContent = 'LOADING...'
        loadBtn.style.opacity = '0.7'
        setup3DScene(canvas)
    })
}

const setup3DScene = (canvas) => {
    // Scene setup
    const scene = new THREE.Scene()

    // Camera
    const camera = new THREE.PerspectiveCamera(
        45,
        canvas.parentElement.offsetWidth / canvas.parentElement.offsetHeight,
        0.1,
        1000
    )
    camera.position.z = 4

    // Check if mobile for initial centering
    const isMobile = window.innerWidth < 768
    camera.position.y = isMobile ? 0 : 0.3

    // Renderer
    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    })
    renderer.setSize(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5 // Brighter

    // Orbit Controls for interaction
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = true
    controls.minDistance = 2
    controls.maxDistance = 8
    controls.enablePan = false
    controls.autoRotate = false
    controls.target.set(0, 0, 0) // Force look at center

    // Lighting - brightened for visibility
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5) // Stronger base light
    scene.add(ambientLight)

    const keyLight = new THREE.DirectionalLight(0xffffff, 3) // Intense key
    keyLight.position.set(5, 5, 5)
    scene.add(keyLight)

    const fillLight = new THREE.DirectionalLight(0xffffff, 1.5)
    fillLight.position.set(-5, 0, 3)
    scene.add(fillLight)

    const rimLight = new THREE.DirectionalLight(0x00ff41, 0.8) // Stronger green rim
    rimLight.position.set(0, 5, -5)
    scene.add(rimLight)

    // Load 3D Model

    const loader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('/draco/') // Path to decoder scripts
    loader.setDRACOLoader(dracoLoader)

    let glassesModel = null // Define in outer scope

    loader.load(
        '/FINAL_GLASS_FINAL.glb',
        (gltf) => {
            glassesModel = gltf.scene // Assign to outer variable

            // Enhance materials
            glassesModel.traverse((child) => {
                if (child.isMesh) {
                    if (child.material) {
                        child.material.roughness = 0.4 // Shinier
                        child.material.metalness = 0.6 // More metallic
                        child.material.envMapIntensity = 1.5
                        // Ensure color isn't too dark
                        if (child.material.color.r < 0.1 && child.material.color.g < 0.1 && child.material.color.b < 0.1) {
                            child.material.color.setHex(0x333333) // Lighter black
                        }
                    }
                }
            })

            // Center and scale model
            const box = new THREE.Box3().setFromObject(glassesModel)
            const center = box.getCenter(new THREE.Vector3())
            glassesModel.position.sub(center)

            // Set base position for animation
            glassesModel.userData.baseY = glassesModel.position.y // Capture calculated center Y

            const size = box.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z)
            const scale = 2.5 / maxDim
            glassesModel.scale.setScalar(scale)

            // Set diagonal starting rotation (like product photo)
            glassesModel.rotation.y = -0.3  // Slight left rotation
            glassesModel.rotation.x = -0.15 // Slight downward tilt

            scene.add(glassesModel)

            // Update Status to ONLINE
            const statusText = document.getElementById('system-status')
            if (statusText) {
                statusText.textContent = 'ONLINE'
                statusText.className = 'blink' // Remove offline, add blink
                statusText.style.color = 'var(--neon-green)'
            }

            // Hide Button
            const loadBtn = document.getElementById('load-3d-btn')
            if (loadBtn) {
                loadBtn.classList.add('hidden')
            }
        },
        (progress) => {
            // Progress tracking (silent in production)
        },
        (error) => {
            console.error('Error loading model:', error)
            const loadBtn = document.getElementById('load-3d-btn')
            if (loadBtn) {
                loadBtn.textContent = 'ERROR // RETRY'
                model3DLoaded = false
            }
        }
    )

    // Animation loop
    const animate = () => {
        requestAnimationFrame(animate)

        // Gentle floating effect relative to base position
        if (glassesModel && glassesModel.userData.baseY !== undefined) {
            const time = Date.now() * 0.001
            // Float around the base Y position
            glassesModel.position.y = glassesModel.userData.baseY + Math.sin(time) * 0.05
        }

        controls.update() // Required for damping
        renderer.render(scene, camera)
    }
    animate()

    // Handle resize with debounce/delay
    const handleResize = () => {
        if (!canvas.parentElement) return
        const width = canvas.parentElement.offsetWidth
        const height = canvas.parentElement.offsetHeight

        camera.aspect = width / height
        camera.updateProjectionMatrix()

        // Update vertical position on resize to keep it centered
        const isMobile = window.innerWidth < 768
        camera.position.y = isMobile ? 0 : 0.3

        renderer.setSize(width, height)
    }

    window.addEventListener('resize', handleResize)
    // Initial resize to catch layout shifts
    setTimeout(handleResize, 100)
    setTimeout(handleResize, 500)
}

// init3DModel() moved to window.load


// Mobile Menu Toggle - Re-implemented
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger')
    const navLinks = document.querySelector('.nav-links')

    if (!hamburger) {
        return
    }
    if (!navLinks) {
        return
    }

    // Use direct onclick for robustness
    hamburger.onclick = function (e) {
        e.preventDefault()
        e.stopPropagation()
        navLinks.classList.toggle('active')
    }

    // Close menu when clicking a link
    const links = navLinks.querySelectorAll('a')
    links.forEach(link => {
        link.onclick = function () {
            navLinks.classList.remove('active')
        }
    })
}

// Run after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu)
} else {
    initMobileMenu()
}

// Matrix Rain Effect for Pre-book Section
const initMatrixRain = () => {
    const canvas = document.getElementById('matrix-rain')
    if (!canvas) return

    const ctx = canvas.getContext('2d')

    // Set canvas size
    const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Matrix characters - katakana + latin
    const chars = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track drop position for each column
    const drops = Array(columns).fill(1)

    const draw = () => {
        // Semi-transparent black to create fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        ctx.fillStyle = '#00FF41' // Neon green
        ctx.font = `${fontSize}px monospace`

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)]
            const x = i * fontSize
            const y = drops[i] * fontSize

            ctx.fillText(text, x, y)

            // Reset drop to top randomly
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0
            }
            drops[i]++
        }
    }

    // Animate
    setInterval(draw, 50)
}

// Spotlight Glow Logic for Feature Cards
const initSpotlightCards = () => {
    const cards = document.querySelectorAll('.feature-item')

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top

            card.style.setProperty('--x', `${x}px`)
            card.style.setProperty('--y', `${y}px`)
        })

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--opacity', '0')
        })
    })
}
const initPrebookForm = () => {
    const submitBtn = document.getElementById('prebook-submit')
    const nameInput = document.getElementById('prebook-name')
    const phoneInput = document.getElementById('prebook-phone')
    const emailInput = document.getElementById('prebook-email')
    const messageBox = document.getElementById('prebook-message')

    if (!submitBtn || !nameInput || !phoneInput || !emailInput || !messageBox) {
        console.warn('Prebook form elements not found')
        return
    }

    const showMessage = (msg, type) => {
        messageBox.textContent = msg
        messageBox.className = `form-message ${type}`
        messageBox.style.display = 'block'
        setTimeout(() => messageBox.style.opacity = '1', 10)
    }

    const hideMessage = () => {
        messageBox.style.opacity = '0'
        setTimeout(() => messageBox.style.display = 'none', 300)
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
    }

    const validatePhone = (phone) => {
        // Strict check: Exactly 10 digits, removes common separators
        const cleaned = phone.replace(/[\s\-\+\(\)]/g, '')
        return /^[0-9]{10}$/.test(cleaned)
    }

    const clearErrors = () => {
        [nameInput, phoneInput, emailInput].forEach(input => {
            input.classList.remove('input-error')
        })
        hideMessage()
    }

    submitBtn.addEventListener('click', async (e) => {
        e.preventDefault()
        clearErrors()

        const name = nameInput.value.trim()
        const phone = phoneInput.value.trim()
        const email = emailInput.value.trim()

        let hasError = false

        if (!name) {
            nameInput.classList.add('input-error')
            hasError = true
        }

        if (!validatePhone(phone)) {
            phoneInput.classList.add('input-error')
            hasError = true
        }

        if (!validateEmail(email)) {
            emailInput.classList.add('input-error')
            hasError = true
        }

        if (hasError) {
            showMessage('// ERROR: INVALID CREDENTIALS DETECTED. PLEASE VERIFY INPUTS.', 'error')
            return
        }

        // Prepare Data
        const payload = {
            name: name,
            phone: phone,
            email: email,
            timestamp: new Date().toISOString()
        }

        // Loading State
        const originalText = submitBtn.innerHTML
        submitBtn.innerHTML = 'TRANSMITTING DATA... <span class="btn-shine"></span>'
        submitBtn.classList.add('btn-loading')

        try {
            const response = await fetch('https://ari2005.app.n8n.cloud/webhook/naintor-contact-info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (response.ok) {
                // Success - Switch Views
                const formView = document.getElementById('prebook-form-container')
                const successView = document.getElementById('prebook-success-container')

                if (formView && successView) {
                    // Hide Form with Fade Out
                    formView.style.opacity = '0'
                    setTimeout(() => {
                        formView.style.display = 'none'
                        successView.classList.remove('hidden')
                        // Trigger reflow
                        void successView.offsetWidth
                        successView.style.opacity = '1'
                    }, 300)
                } else {
                    // Fallback if containers missing
                    showMessage('// SUCCESS: PREBOOK REGISTRATION SAVED.', 'success')
                }

            } else {
                throw new Error('Network response was not ok')
            }

        } catch (error) {
            console.error('Submission error:', error)
            showMessage('// ERROR: CONNECTION FAILURE. RETRY UPLINK.', 'error')
            submitBtn.innerHTML = originalText
        } finally {
            submitBtn.classList.remove('btn-loading')
            if (submitBtn.innerHTML.includes('TRANSMITTING')) {
                submitBtn.innerHTML = originalText
            }
        }
    })

    // Clear error on input
    const inputs = [nameInput, phoneInput, emailInput]
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.classList.contains('input-error')) {
                input.classList.remove('input-error')
            }
        })
    })
}

// --- Initialization ---
window.addEventListener('load', () => {
    // Vanilla JS inits
    initMobileMenu()
    initMatrixRain()
    initSpotlightCards()
    initPrebookForm()

    // Three.js features
    initShaderAnimation()
    init3DModel()

    // GSAP features
    initHyperText()

    // Performance features
    initHeroVideo()
})
