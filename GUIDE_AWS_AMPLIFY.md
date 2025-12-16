# 📦 Deploying to AWS Amplify

## What is AWS Amplify?

AWS Amplify is Amazon's hosting service for websites and web applications. It's enterprise-grade, meaning it's used by big companies, but it's also easy enough for anyone to use.

**Estimated Cost**: **FREE tier** for first 12 months, then pay-as-you-go (typically $0-5/month for small sites)

**Difficulty Level**: ⭐⭐⭐ Moderate (About 30-40 minutes)

---

## 📋 What You'll Need

1. An **email address** to create an AWS account
2. A **credit/debit card** for account verification (you get free tier!)
3. About **30-40 minutes** of your time
4. The website files from this package

---

## 📖 Step-by-Step Guide

### Step 1: Create an AWS Account

1. Go to [AWS](https://aws.amazon.com/)
2. Click **"Create an AWS Account"** (top-right)
3. Enter your email and choose an account name
4. Create a password
5. Choose **"Personal"** account type
6. Enter your personal information
7. Enter payment method (you won't be charged unless you exceed free tier)
8. Complete phone verification
9. Select the **"Basic Support - Free"** plan

**Note**: Account creation can take up to 24 hours to fully activate, but usually it's instant.

---

### Step 2: Install Node.js and Build Your Site

#### Install Node.js:
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version
3. Install it (keep clicking "Next")
4. Restart your computer

#### Build your website:
1. Open the `CLIENT_DEPLOYMENT_PACKAGE` folder
2. Open a terminal here:
   - **Windows**: Shift + Right-click → "Open PowerShell window here"
   - **Mac**: Right-click → "New Terminal at Folder"

3. Run these commands:

```bash
npm install
```

```bash
npm run build
```

4. You'll now have a `dist` folder ready for deployment!

---

### Step 3: Open AWS Amplify Console

1. Sign in to the [AWS Console](https://console.aws.amazon.com/)
2. In the search bar at the top, type **"Amplify"**
3. Click on **"AWS Amplify"**
4. You'll see the Amplify Hosting page

---

### Step 4: Create a New App

1. Click **"Get started"** under "Amplify Hosting"
   (Or click "New app" → "Host web app")

2. You'll see options for connecting code:
   - **GitHub**
   - **GitLab**
   - **Bitbucket**
   - **AWS CodeCommit**
   - **Deploy without Git provider**

3. Select **"Deploy without Git provider"** (easiest for manual upload)

4. Click **"Continue"**

---

### Step 5: Upload Your Website

1. **App name**: Enter `naintor-website` (or your preferred name)

2. **Environment name**: Keep it as `main` or type `production`

3. **Method**: Select **"Drag and drop"**

4. A upload area will appear

5. **Create a ZIP file of your `dist` folder**:
   - **Windows**: Right-click `dist` folder → "Send to" → "Compressed (zipped) folder"
   - **Mac**: Right-click `dist` folder → "Compress 'dist'"

6. Drag the ZIP file into the upload area (or click to browse)

7. Wait for the upload to complete

8. Click **"Save and deploy"**

---

### Step 6: Wait for Deployment

1. You'll see a deployment progress screen
2. Wait for the status to change to **"Deployed"** (2-5 minutes)
3. Once complete, you'll see a URL like: `https://main.d1234abc.amplifyapp.com`

**Click the URL - your website is now live!** 🎉

---

## 🌐 Connecting Your Custom Domain

### Step A: Add Your Domain

1. In the Amplify Console, click on your app
2. In the left sidebar, click **"Domain management"**
3. Click **"Add domain"**
4. Enter your domain (e.g., `nainfit.com`)
5. Click **"Configure domain"**

### Step B: Configure Subdomains

1. You'll see options for configuring subdomains
2. Common setup:
   - `nainfit.com` → points to your app
   - `www.nainfit.com` → points to your app (redirects to root)
3. Click **"Save"**

### Step C: Update DNS at Your Provider

Amplify will show you DNS records to add. At your domain provider:

**If using Route 53 (Amazon's DNS):**
- Amplify can configure this automatically!

**If using external DNS (GoDaddy, Namecheap, etc.):**

Add a CNAME record:
- **Name**: `www` (or `@` for root)
- **Value**: The value Amplify shows you (looks like `d1234abc.cloudfront.net`)

**For root domains**, you may need:
- An ANAME/ALIAS record (if your provider supports it), OR
- Transfer DNS to Route 53 (Amplify will guide you)

### Step D: SSL Certificate

1. Amplify automatically provisions an SSL certificate
2. Wait 30-60 minutes for it to be issued
3. Your site will then have HTTPS! 🔒

---

## 🔄 How to Update Your Website

### Manual Update:

1. Make changes to your source files
2. Run `npm run build` again
3. Create a new ZIP of the `dist` folder
4. Go to Amplify Console → Your app
5. Click **"Deploy updates"**
6. Upload the new ZIP file
7. Click **"Save and deploy"**

### Automatic Updates (With Git):

If you set up Git integration:
1. Push changes to your repository
2. Amplify automatically rebuilds and deploys!

---

## 💰 AWS Amplify Pricing

### Free Tier (First 12 months):
- 1,000 build minutes/month
- 15 GB served/month
- 5 GB stored

### After Free Tier:
| Resource | Cost |
|----------|------|
| Build & Deploy | $0.01/build minute |
| Hosting | $0.023/GB served |
| Storage | $0.023/GB stored |

**Typical cost for a small website**: $0-5/month

---

## 🚀 Cool AWS Amplify Features

- **Continuous deployment**: Auto-deploy from Git
- **Branch deployments**: Each branch gets its own URL
- **Password protection**: Protect staging sites
- **Custom headers**: Full control over HTTP headers
- **Redirects & rewrites**: URL management

---

## 🆘 Troubleshooting

### "Access Denied" errors
- Make sure you're logged into the correct AWS account
- Check if IAM permissions are set correctly
- Try signing out and back in

### Upload fails
- Make sure your ZIP file isn't too large (under 100MB is safe)
- Try zipping just the contents of `dist`, not the folder itself
- Check your internet connection

### Site shows "Hello World" or default page
- Make sure your `dist` folder contains `index.html`
- Re-build with `npm run build`
- Check Amplify build logs for errors

### Custom domain not working
- DNS can take 24-48 hours (usually faster)
- SSL certificate can take up to 1 hour
- Verify DNS records match exactly

### Large files not loading
- AWS Amplify has a 25MB individual file limit
- If 3D models are larger, consider using AWS S3 for assets

---

## ✅ Checklist

- [ ] Created AWS account
- [ ] Installed Node.js
- [ ] Ran `npm install` and `npm run build`
- [ ] Opened AWS Amplify Console
- [ ] Created new app with "Deploy without Git"
- [ ] Uploaded `dist` folder as ZIP
- [ ] Deployment successful
- [ ] Website live at `.amplifyapp.com` URL
- [ ] (Optional) Added custom domain
- [ ] (Optional) SSL certificate active

**Congratulations! Your website is now live on AWS Amplify! 🎊**
