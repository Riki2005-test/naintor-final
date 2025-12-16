# 🚀 NainTor Website - Deployment Package

Welcome! This package contains everything you need to deploy your NainTor website to the internet.

---

## 📁 What's Included in This Package

| File/Folder | What it is |
|-------------|------------|
| `index.html` | The main webpage file |
| `main.js` | The JavaScript code that makes the website interactive |
| `style.css` | The styling that makes the website look beautiful |
| `public/` | Folder containing images, videos, and 3D models |
| `src/` | Source code files |
| `package.json` | Lists the software dependencies needed |
| `package-lock.json` | Locks the exact versions of dependencies |
| `Dockerfile` | Instructions for building a Docker container |
| `nginx.conf` | Web server configuration file |
| `.dockerignore` | Tells Docker which files to ignore |

---

## 📚 Deployment Guides

We've prepared easy-to-follow guides for deploying on popular platforms. Choose the one that best fits your needs:

| Guide | Best For | Estimated Cost |
|-------|----------|----------------|
| [Google Cloud Run](./GUIDE_GOOGLE_CLOUD_RUN.md) | Professional hosting with great performance | ~$0-5/month for low traffic |
| [Cloudflare Pages](./GUIDE_CLOUDFLARE_PAGES.md) | Simple, fast, and FREE hosting | FREE |
| [Netlify](./GUIDE_NETLIFY.md) | Beginner-friendly with easy setup | FREE tier available |
| [Vercel](./GUIDE_VERCEL.md) | Great for developers, simple deployment | FREE tier available |
| [AWS Amplify](./GUIDE_AWS_AMPLIFY.md) | Enterprise-grade Amazon hosting | Pay-as-you-go |
| [Traditional Web Hosting](./GUIDE_TRADITIONAL_HOSTING.md) | Using cPanel/Hostinger/GoDaddy hosting | Varies by provider |

---

## 🏆 Our Recommendations

### For **Simplicity** (Easiest Setup):
👉 **Cloudflare Pages** - It's FREE, fast, and takes about 10 minutes to set up.

### For **Professional Use**:
👉 **Google Cloud Run** - Reliable, scalable, and great performance worldwide.

### For **Budget-Conscious**:
👉 **Netlify or Vercel** - Both offer generous free tiers.

---

## ⚠️ Important Notes

1. **Large Files**: This website includes large 3D model files (~20MB). Some platforms may have file size limits.

2. **Custom Domain**: All platforms support connecting your own domain name (like nainfit.com).

3. **SSL Certificate**: All recommended platforms provide FREE SSL certificates (the padlock in browsers).

4. **Need Help?**: If you run into any issues, please contact the development team.

---

## 🔧 Technical Requirements

If you want to run the website locally on your computer for testing:

1. Install [Node.js](https://nodejs.org/) (version 18 or higher)
2. Open a terminal/command prompt in this folder
3. Run: `npm install`
4. Run: `npm run dev`
5. Open your browser and go to: `http://localhost:5173`

---

## 📞 Support

If you need any assistance with deployment, please don't hesitate to reach out to your development team.

**Happy Deploying! 🎉**
