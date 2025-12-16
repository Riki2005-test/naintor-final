# ☁️ Deploying to Cloudflare Pages

## What is Cloudflare Pages?

Cloudflare Pages is a FREE hosting service that's incredibly fast because it serves your website from data centers all around the world. It's one of the easiest ways to get a website online.

**Estimated Cost**: **FREE** (Yes, really!)

**Difficulty Level**: ⭐⭐ Easy (About 15-20 minutes)

---

## 📋 What You'll Need

1. An **email address** to create a Cloudflare account
2. About **15-20 minutes** of your time
3. The website files from this package

---

## 📖 Step-by-Step Guide

### Step 1: Create a Cloudflare Account

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Click **"Sign Up"** (top-right corner)
3. Enter your email and create a password
4. Check your email and click the verification link
5. You're now logged into your Cloudflare dashboard!

---

### Step 2: Install Node.js on Your Computer

Before we can prepare the website files, we need Node.js:

1. Go to [nodejs.org](https://nodejs.org/)
2. Click the **LTS** version (the recommended one)
3. Download and run the installer
4. Follow the installation wizard (just click "Next" through everything)
5. Restart your computer after installation

---

### Step 3: Build the Website Files

1. Open the `CLIENT_DEPLOYMENT_PACKAGE` folder
2. **On Windows**: Hold Shift + Right-click in the folder, select "Open PowerShell window here"
   **On Mac**: Right-click the folder, select "New Terminal at Folder"
3. In the terminal, type these commands one by one:

```bash
npm install
```
(Wait for it to finish - might take 1-2 minutes)

```bash
npm run build
```
(Wait for it to finish - usually takes about 30 seconds)

4. You should now see a new folder called **`dist`** - this contains your ready-to-deploy website!

---

### Step 4: Deploy to Cloudflare Pages

1. Go back to your [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. In the left sidebar, click **"Workers & Pages"**
3. Click **"Create application"**
4. Click **"Pages"** tab
5. Click **"Upload assets"** (the option on the right)

---

### Step 5: Upload Your Website

1. Give your project a name, for example: `naintor-website`
2. Click **"Create project"**
3. Now you need to upload the `dist` folder:
   - Click **"Select a folder"** or drag the `dist` folder into the upload area
   - Navigate to your `CLIENT_DEPLOYMENT_PACKAGE` folder
   - Select the entire `dist` folder
4. Wait for all files to upload (you'll see a progress indicator)
5. Click **"Deploy site"**
6. Wait for deployment to complete (usually 1-2 minutes)

---

### Step 6: Your Website is Live! 🎉

After deployment, you'll see:
- A message saying "Success!"
- Your website URL, something like: `https://naintor-website.pages.dev`

Click the URL to see your live website!

---

## 🌐 Connecting Your Custom Domain

To use your own domain (like nainfit.com):

### Step A: Add Your Domain

1. In Cloudflare Pages, click on your project
2. Go to **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter your domain name (e.g., `nainfit.com`)
5. Click **"Continue"**

### Step B: Update DNS Settings

Cloudflare will show you DNS records to add. Here's what to do:

**If your domain is ALREADY on Cloudflare:**
- Cloudflare automatically handles this for you!

**If your domain is on GoDaddy, Namecheap, etc.:**

1. Log into your domain provider's website
2. Find **DNS Settings** or **Manage DNS**
3. Add a new **CNAME record**:
   - **Name**: `@` or your subdomain
   - **Value**: `naintor-website.pages.dev` (your Cloudflare Pages URL)
4. If you want `www.yourdomain.com` to work too:
   - Add another CNAME record with Name: `www`
   - Value: `naintor-website.pages.dev`

5. Wait 5-30 minutes for DNS to update

---

## 🔄 How to Update Your Website

When you have changes to deploy:

### Method A: Re-upload (Easiest)

1. On your computer, run `npm run build` again
2. Go to Cloudflare Pages → Your project
3. Click **"Create new deployment"**
4. Upload the `dist` folder again
5. Click **"Deploy site"**

### Method B: Using Git (Advanced)

If your code is on GitHub, you can set up automatic deployments:
1. In your Cloudflare Pages project, go to Settings
2. Connect to your GitHub repository
3. Every time you push code to GitHub, it auto-deploys!

---

## 💰 Is It Really Free?

Yes! Cloudflare Pages Free tier includes:
- ✅ Unlimited bandwidth
- ✅ 500 builds per month
- ✅ Automatic SSL certificates
- ✅ Global CDN (your site loads fast everywhere)
- ✅ No credit card required

---

## 🆘 Troubleshooting

### "npm: command not found"
- Node.js isn't installed correctly
- Go back to Step 2 and reinstall Node.js
- Restart your computer after installation

### "Build failed" or errors during `npm install`
- Delete the `node_modules` folder if it exists
- Run `npm install` again
- Make sure you're in the correct folder

### Large file errors
- Cloudflare Pages has a 25MB per-file limit
- If your 3D models are larger, contact your development team

### Website not loading after deployment
- Wait 2-3 minutes
- Clear your browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Try a different browser

### Custom domain not working
- DNS changes can take up to 24-48 hours (usually faster)
- Double-check your DNS settings match what Cloudflare showed
- Make sure there are no typos in the domain name

---

## ✅ Checklist

- [ ] Created Cloudflare account
- [ ] Installed Node.js on computer
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run build` successfully (created `dist` folder)
- [ ] Uploaded `dist` folder to Cloudflare Pages
- [ ] Website is live at `.pages.dev` URL
- [ ] (Optional) Connected custom domain

**Congratulations! Your website is now live on Cloudflare Pages for FREE! 🎊**
