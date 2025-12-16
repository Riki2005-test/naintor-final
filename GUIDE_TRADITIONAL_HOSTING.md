# 🏠 Deploying to Traditional Web Hosting

## What is Traditional Hosting?

Traditional web hosting is the classic way to host websites. Companies like GoDaddy, Hostinger, Bluehost, SiteGround, and Namecheap offer hosting plans where you upload your website files to their servers.

**Estimated Cost**: $3-10/month depending on provider

**Difficulty Level**: ⭐⭐ Easy (About 20-30 minutes)

---

## 📋 What You'll Need

1. A **web hosting account** (GoDaddy, Hostinger, Bluehost, etc.)
2. Your **hosting login credentials**
3. About **20-30 minutes** of your time
4. The website files from this package

---

## 📖 Step-by-Step Guide

### Step 1: Build Your Website Files

First, we need to prepare the files for upload:

#### Install Node.js:
1. Go to [nodejs.org](https://nodejs.org/)
2. Download the **LTS** version
3. Install it (click "Next" through the wizard)
4. Restart your computer

#### Build the website:
1. Open the `CLIENT_DEPLOYMENT_PACKAGE` folder
2. Open a terminal/command prompt:
   - **Windows**: Shift + Right-click → "Open PowerShell window here"
   - **Mac**: Right-click → "New Terminal at Folder"

3. Run these commands:

```bash
npm install
```

```bash
npm run build
```

4. You now have a `dist` folder containing your website!

---

### Step 2: Access Your Hosting Control Panel

Most hosts use one of these control panels:

- **cPanel** (most common)
- **Plesk**
- **hPanel** (Hostinger)
- **Custom panels**

1. Log into your hosting provider's website
2. Find and click on **"cPanel"**, **"Hosting"**, or **"Manage"**
3. You'll see a dashboard with various tools

---

### Step 3: Open File Manager

1. In your control panel, find **"File Manager"**
2. Click to open it
3. You'll see a file browser interface

**Navigate to the correct folder:**
- Usually called `public_html` or `www` or `htdocs`
- This is your website's root directory

---

### Step 4: Upload Your Website Files

#### Method A: Upload via File Manager

1. In File Manager, make sure you're in `public_html`
2. Click the **"Upload"** button (usually at the top)
3. Upload ALL files from inside your `dist` folder:
   - `index.html`
   - `assets/` folder (contains CSS, JS, etc.)
   - All other files and folders

**Important**: Upload the CONTENTS of the `dist` folder, not the folder itself!

#### Method B: Upload via FTP (Alternative)

If File Manager is slow for large files, use FTP:

1. Download an FTP client: [FileZilla](https://filezilla-project.org/) (free)
2. Install and open FileZilla
3. Get your FTP credentials from your host (usually in cPanel under "FTP Accounts")
4. Connect using:
   - **Host**: Your domain or server IP
   - **Username**: Your FTP username
   - **Password**: Your FTP password
   - **Port**: 21 (or as specified)
5. Navigate to `public_html` on the remote side
6. Drag all files from your local `dist` folder to the remote `public_html`

---

### Step 5: Verify Your Website

1. Open your browser
2. Go to your domain (e.g., `https://nainfit.com`)
3. Your website should now be live! 🎉

---

## 🔧 Important Configuration

### Setting Up SSL (HTTPS)

Most hosts offer free SSL:

1. In cPanel, find **"SSL/TLS"** or **"Let's Encrypt"**
2. Click on it
3. Select your domain
4. Click **"Install Certificate"** or **"Enable"**
5. Wait a few minutes
6. Your site now has HTTPS! 🔒

### Pointing Your Domain

If your domain was purchased separately:

1. Get your hosting's **nameservers** (looks like `ns1.yourhost.com`)
2. Go to your domain registrar (where you bought the domain)
3. Find **"Nameservers"** or **"DNS Management"**
4. Replace existing nameservers with your hosting's nameservers
5. Wait 24-48 hours for propagation

---

## 📋 Provider-Specific Instructions

### GoDaddy Hosting

1. Log into [GoDaddy](https://www.godaddy.com/)
2. Go to **"My Products"** → **"Web Hosting"** → **"Manage"**
3. Click **"cPanel Admin"**
4. Open **"File Manager"**
5. Navigate to `public_html`
6. Upload your `dist` folder contents
7. For SSL: Look for "SSL Certificates" or "Manage SSL"

### Hostinger

1. Log into [Hostinger](https://www.hostinger.com/)
2. Go to **"Hosting"** → Your plan → **"Manage"**
3. Click **"File Manager"** in hPanel
4. Navigate to `public_html`
5. Upload your files
6. For SSL: Go to **"SSL"** in hPanel and enable it

### Bluehost

1. Log into [Bluehost](https://www.bluehost.com/)
2. Go to **"Advanced"** → **"File Manager"**
3. Navigate to `public_html`
4. Upload all files from your `dist` folder
5. SSL is usually auto-enabled with Let's Encrypt

### SiteGround

1. Log into [SiteGround](https://www.siteground.com/)
2. Go to **"Websites"** → **"Site Tools"**
3. Click **"File Manager"**
4. Navigate to `public_html`
5. Upload your files
6. For SSL: Go to **"Security"** → **"SSL Manager"**

### Namecheap

1. Log into [Namecheap](https://www.namecheap.com/)
2. Go to **"Hosting List"** → **"Manage"**
3. Click **"Go to cPanel"**
4. Open **"File Manager"**
5. Navigate to `public_html`
6. Upload your files
7. For SSL: Look for **"AutoSSL"** or **"SSL/TLS Status"**

---

## 🔄 How to Update Your Website

When you need to make changes:

1. Update your source files locally
2. Run `npm run build` again
3. Go to your File Manager
4. Delete old files in `public_html` (or overwrite them)
5. Upload new files from the `dist` folder

**Tip**: Keep a backup of your current files before updating!

---

## 🆘 Troubleshooting

### Site shows "Index of /" directory listing
- Make sure `index.html` is in the `public_html` folder
- The file should be named exactly `index.html` (lowercase)

### CSS/JS not loading (unstyled page)
- Check that the `assets` folder was uploaded correctly
- Make sure all files are in `public_html`, not in a subfolder

### 404 Page Not Found
- Verify you're accessing the correct domain
- Check that files are in the right directory
- Clear your browser cache

### Large files (3D models) not loading
- Some hosts have upload limits (usually 50-100MB)
- Use FTP instead of File Manager for large files
- Check if your host has a file size limit setting

### SSL not working
- Wait 24 hours after enabling
- Make sure your domain is pointing to the correct server
- Contact your hosting support

### "Site can't be reached"
- Domain DNS might not have propagated (wait 24-48 hours)
- Check if your hosting account is active
- Verify nameservers are correctly set

---

## 💡 Tips for Traditional Hosting

1. **Enable Gzip compression**: Speeds up your website
   - In cPanel, look for "Optimize Website" or add to `.htaccess`

2. **Set up browser caching**: Makes repeat visits faster
   - Add caching rules to `.htaccess`

3. **Create regular backups**: Use cPanel's backup feature

4. **Monitor disk space**: Don't exceed your hosting limits

---

## ✅ Checklist

- [ ] Installed Node.js
- [ ] Ran `npm install` and `npm run build`
- [ ] Logged into hosting control panel
- [ ] Opened File Manager
- [ ] Navigated to `public_html`
- [ ] Uploaded all files from `dist` folder
- [ ] Website is visible at your domain
- [ ] Enabled SSL/HTTPS
- [ ] (If needed) Updated nameservers

**Congratulations! Your website is now live on traditional hosting! 🎊**
