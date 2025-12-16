# 🌟 Deploying to Netlify

## What is Netlify?

Netlify is a popular, beginner-friendly hosting platform that's loved by developers worldwide. It's known for its simplicity and generous free tier.

**Estimated Cost**: **FREE** (up to 100GB bandwidth/month)

**Difficulty Level**: ⭐ Very Easy (About 10-15 minutes)

---

## 📋 What You'll Need

1. An **email address** or a **GitHub/Google account**
2. About **10-15 minutes** of your time
3. The website files from this package

---

## 📖 Step-by-Step Guide

### Step 1: Create a Netlify Account

1. Go to [Netlify](https://www.netlify.com/)
2. Click **"Sign up"** (top-right corner)
3. Choose how to sign up:
   - **GitHub** (recommended if you have one)
   - **GitLab**
   - **Bitbucket**
   - **Email**
4. Complete the sign-up process
5. You'll be taken to your Netlify dashboard!

---

### Step 2: Prepare Your Website Files

Before uploading, we need to build the website:

#### Install Node.js (if not already installed):
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version
3. Install it (click "Next" through the wizard)
4. Restart your computer

#### Build the website:
1. Open the `CLIENT_DEPLOYMENT_PACKAGE` folder
2. Open a terminal/command prompt in this folder:
   - **Windows**: Hold Shift + Right-click → "Open PowerShell window here"
   - **Mac**: Right-click folder → "New Terminal at Folder"

3. Run these commands:

```bash
npm install
```

```bash
npm run build
```

4. A new `dist` folder will be created - this is what we'll upload!

---

### Step 3: Deploy to Netlify (Drag & Drop Method)

This is the easiest method:

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. You'll see a big area that says "Drag and drop your site output folder here"
3. Open your file explorer and find the `dist` folder inside `CLIENT_DEPLOYMENT_PACKAGE`
4. **Drag the entire `dist` folder** into the Netlify browser window
5. Wait for upload to complete (20-60 seconds)

**That's it!** Your site is now live! 🎉

You'll see a URL like: `https://random-name-12345.netlify.app`

---

### Step 4: Customize Your Site Name

The random URL isn't very memorable. Let's change it:

1. Click **"Site configuration"** or go to **"Site settings"**
2. Find **"Site details"** section
3. Click **"Change site name"**
4. Enter a custom name (e.g., `naintor-website`)
5. Your new URL will be: `https://naintor-website.netlify.app`

---

## 🌐 Connecting Your Custom Domain

To use your own domain (like nainfit.com):

### Step A: Add Your Domain in Netlify

1. Go to your site dashboard
2. Click **"Domain settings"** or **"Set up a custom domain"**
3. Click **"Add custom domain"**
4. Type your domain (e.g., `nainfit.com`)
5. Click **"Verify"** → **"Add domain"**

### Step B: Configure DNS at Your Domain Provider

Netlify will show you what DNS records to add:

1. Log into your domain provider (GoDaddy, Namecheap, etc.)
2. Find **DNS Settings** or **Manage DNS**
3. You need to add these records:

**Option 1: Using CNAME (Recommended)**
- Add a CNAME record:
  - Name: `www`
  - Value: `your-site-name.netlify.app`

**Option 2: For root domain (@)**
- Add an A record:
  - Name: `@`
  - Value: `75.2.60.5`

4. Wait 5-30 minutes for changes to take effect

### Step C: Enable HTTPS

1. Back in Netlify, go to **"Domain settings"**
2. Scroll to **"HTTPS"**
3. Click **"Verify DNS configuration"**
4. Once verified, click **"Provision certificate"**
5. Your site now has a secure padlock! 🔒

---

## 🔄 How to Update Your Website

### Method 1: Drag & Drop Again

1. Make your changes to the source files
2. Run `npm run build` again
3. Go to Netlify → Your site → **Deploys**
4. Drag the new `dist` folder to deploy

### Method 2: Netlify CLI (For frequent updates)

Install Netlify's command-line tool:

```bash
npm install -g netlify-cli
```

Login to Netlify:
```bash
netlify login
```

Deploy:
```bash
npm run build
netlify deploy --prod --dir=dist
```

---

## 💰 Netlify Free Tier Limits

| Feature | Free Limit |
|---------|------------|
| Bandwidth | 100 GB/month |
| Build minutes | 300 minutes/month |
| Sites | Unlimited |
| HTTPS | ✅ Free |
| Custom domains | ✅ Free |

For most websites, the free tier is more than enough!

---

## 🚀 Cool Netlify Features

- **Automatic HTTPS**: Free SSL certificates
- **Form handling**: Accept form submissions for free
- **Deploy previews**: Preview changes before going live
- **Rollbacks**: Easily go back to previous versions

---

## 🆘 Troubleshooting

### "Drop zone not working"
- Try a different browser (Chrome recommended)
- Make sure you're dragging the entire `dist` folder, not individual files

### "Build failed" during npm commands
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again
- Run `npm run build` again

### Site shows old version
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Wait 2-3 minutes for CDN to update
- Try incognito/private browsing mode

### Custom domain not working
- DNS can take up to 24-48 hours (usually 5-30 minutes)
- Double-check the DNS records are correct
- Use [DNS Checker](https://dnschecker.org/) to verify propagation

### Large file issues
- Make sure no single file exceeds 10MB
- If your 3D models are too large, contact your development team

---

## ✅ Checklist

- [ ] Created Netlify account
- [ ] Installed Node.js on computer
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run build` successfully (created `dist` folder)
- [ ] Dragged `dist` folder to Netlify
- [ ] Website is live at `.netlify.app` URL
- [ ] (Optional) Changed site name to something memorable
- [ ] (Optional) Connected custom domain
- [ ] (Optional) Enabled HTTPS

**Congratulations! Your website is now live on Netlify! 🎊**
