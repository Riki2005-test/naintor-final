# ▲ Deploying to Vercel

## What is Vercel?

Vercel is a modern hosting platform created by the company behind Next.js. It's known for its excellent performance and simple deployment process.

**Estimated Cost**: **FREE** (Hobby tier)

**Difficulty Level**: ⭐⭐ Easy (About 15-20 minutes)

---

## 📋 What You'll Need

1. A **GitHub**, **GitLab**, or **Bitbucket** account (OR just an email)
2. About **15-20 minutes** of your time
3. The website files from this package

---

## 📖 Step-by-Step Guide

### Step 1: Install Node.js

First, we need Node.js to build your website:

1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version (the one that says "Recommended")
3. Run the installer and click "Next" through all steps
4. Restart your computer after installation

---

### Step 2: Build Your Website

1. Open the `CLIENT_DEPLOYMENT_PACKAGE` folder on your computer
2. Open a terminal/command prompt here:
   - **Windows**: Hold Shift + Right-click in the folder → "Open PowerShell window here"
   - **Mac**: Right-click the folder → "New Terminal at Folder"

3. Type this command and press Enter:
```bash
npm install
```
(Wait 1-2 minutes for it to complete)

4. Type this command and press Enter:
```bash
npm run build
```
(Wait about 30 seconds)

5. You should now see a `dist` folder - this is your ready-to-deploy website!

---

### Step 3: Create a Vercel Account

1. Go to [vercel.com](https://vercel.com/)
2. Click **"Sign Up"** (top-right)
3. Choose how to sign up:
   - **Continue with GitHub** (recommended)
   - Continue with GitLab
   - Continue with Bitbucket
   - Continue with Email
4. Complete the sign-up process
5. If asked about your usage, select **"Hobby"** (it's free!)

---

### Step 4: Deploy Using Vercel CLI

The easiest way to deploy is using Vercel's command-line tool:

1. In your terminal (still in the `CLIENT_DEPLOYMENT_PACKAGE` folder), run:

```bash
npm install -g vercel
```

2. Then run:

```bash
vercel login
```

3. Follow the prompts to log in (it will open your browser)

4. Now deploy your website:

```bash
vercel --prod
```

5. When asked questions, answer:
   - **Set up and deploy?** Yes
   - **Which scope?** (Press Enter for your account)
   - **Link to existing project?** No
   - **Project name?** naintor-website (or your preferred name)
   - **Directory?** `./dist`
   - **Override settings?** No

6. **Wait for deployment** (usually 1-2 minutes)

7. You'll see a URL like: `https://naintor-website.vercel.app`

**Your website is now live!** 🎉

---

## 🌐 Alternative: Deploy via Web Interface

If you prefer not to use the command line:

1. Go to [vercel.com/new](https://vercel.com/new)
2. If you have your code on GitHub:
   - Select your repository
   - Vercel will auto-detect settings
   - Click "Deploy"

3. If you don't use GitHub:
   - Click **"Deploy from template"**
   - Or use the CLI method above (recommended)

---

## 🔗 Connecting Your Custom Domain

To use your own domain (like nainfit.com):

### Step A: Add Domain in Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your project
3. Go to **"Settings"** → **"Domains"**
4. Enter your domain (e.g., `nainfit.com`)
5. Click **"Add"**

### Step B: Configure DNS

Vercel will show you the DNS records to add. Go to your domain provider:

**For root domain (nainfit.com):**
- Add an A record:
  - Name: `@`
  - Value: `76.76.21.21`

**For www subdomain (www.nainfit.com):**
- Add a CNAME record:
  - Name: `www`
  - Value: `cname.vercel-dns.com`

### Step C: Verify

1. Wait 5-30 minutes for DNS to propagate
2. Go back to Vercel → Settings → Domains
3. Click **"Refresh"** to verify the domain is connected
4. Vercel automatically enables HTTPS for you! 🔒

---

## 🔄 How to Update Your Website

When you have changes to make:

### Method 1: Using CLI

```bash
# In the CLIENT_DEPLOYMENT_PACKAGE folder
npm run build
vercel --prod
```

### Method 2: Git Integration

If your code is on GitHub:
1. Just push your changes to GitHub
2. Vercel automatically rebuilds and deploys!

---

## 💰 Vercel Free Tier Limits

| Feature | Hobby (Free) |
|---------|--------------|
| Bandwidth | 100 GB/month |
| Serverless Functions | 100 GB-hours |
| Deployments | Unlimited |
| HTTPS | ✅ Free |
| Custom Domains | Unlimited |

**Perfect for personal/small business websites!**

---

## 🚀 Cool Vercel Features

- **Instant rollbacks**: Go back to any previous version in one click
- **Preview deployments**: Each git branch gets its own URL
- **Edge network**: Your site loads fast from anywhere in the world
- **Analytics**: Basic website analytics (free)
- **Real-time logs**: See what's happening on your site

---

## 🆘 Troubleshooting

### "vercel: command not found"
- Node.js might not be installed properly
- Close and reopen your terminal
- Try running: `npx vercel --prod` instead

### "Error during build"
- Make sure you ran `npm install` first
- Make sure you're in the correct folder
- Delete `node_modules` and run `npm install` again

### "404 Not Found" after deployment
- Wait 2-3 minutes for deployment to complete
- Clear your browser cache
- Make sure the `dist` folder was selected during deployment

### "Domain verification failed"
- DNS changes can take up to 48 hours (usually 5-30 minutes)
- Double-check the DNS records match exactly
- Use [DNS Checker](https://dnschecker.org/) to verify

### Large files not loading
- Vercel has a 250MB total deployment limit
- If your 3D models are too large, contact your development team

---

## ✅ Checklist

- [ ] Installed Node.js
- [ ] Ran `npm install` successfully
- [ ] Ran `npm run build` successfully
- [ ] Created Vercel account
- [ ] Installed Vercel CLI (`npm install -g vercel`)
- [ ] Deployed with `vercel --prod`
- [ ] Website is live at `.vercel.app` URL
- [ ] (Optional) Connected custom domain
- [ ] (Optional) Set up GitHub integration for auto-deploy

**Congratulations! Your website is now live on Vercel! 🎊**
