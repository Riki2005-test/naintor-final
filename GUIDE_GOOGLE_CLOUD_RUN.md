# 🌐 Deploying to Google Cloud Run

## What is Google Cloud Run?

Google Cloud Run is a service by Google that hosts your website on their powerful servers. It's reliable, fast, and can handle websites of any size.

**Estimated Cost**: $0-5/month for low-medium traffic websites (You only pay for what you use)

**Difficulty Level**: ⭐⭐⭐ Moderate (About 30-45 minutes for first-time setup)

---

## 📋 What You'll Need

1. A **Google account** (Gmail account works)
2. A **credit/debit card** for billing verification (You get $300 free credits!)
3. About **30-45 minutes** of your time

---

## 📖 Step-by-Step Guide

### Step 1: Create a Google Cloud Account

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Sign in with your Google account
3. Click **"Get started for free"** or **"Try for Free"**
4. Enter your billing information (You get $300 free credits and won't be charged unless you upgrade)
5. Complete the setup wizard

---

### Step 2: Create a New Project

1. In the top-left corner, click on the project dropdown (it might say "Select a project")
2. Click **"NEW PROJECT"**
3. Enter a project name, for example: `naintor-website`
4. Click **"CREATE"**
5. Wait a few seconds for the project to be created
6. Make sure your new project is selected in the dropdown

---

### Step 3: Enable Required Services

1. In the search bar at the top, type **"Cloud Run API"**
2. Click on **"Cloud Run API"** from the results
3. Click the blue **"ENABLE"** button
4. Wait for it to enable (takes a few seconds)

5. In the search bar, type **"Cloud Build API"**
6. Click on **"Cloud Build API"** from the results
7. Click the blue **"ENABLE"** button

8. In the search bar, type **"Artifact Registry API"**
9. Click on **"Artifact Registry API"** from the results
10. Click the blue **"ENABLE"** button

---

### Step 4: Open Cloud Shell

1. In the top-right corner, click on the **terminal icon** (looks like `>_`) - this is called "Cloud Shell"
2. A black terminal window will appear at the bottom of your screen
3. Wait for it to initialize (you'll see a blinking cursor when ready)

---

### Step 5: Upload Your Website Files

1. In Cloud Shell, click the **three dots (⋮)** menu in the top-right of the terminal
2. Click **"Upload"**
3. You need to upload this entire folder as a ZIP file first

**On Your Computer:**
1. Right-click on the `CLIENT_DEPLOYMENT_PACKAGE` folder
2. Select **"Compress"** or **"Send to → Compressed (zipped) folder"**
3. This creates a `.zip` file

4. Back in Cloud Shell, select the ZIP file you just created
5. Click **"Upload"**
6. Wait for the upload to complete

7. In Cloud Shell, type these commands one by one (press Enter after each):

```bash
# Unzip the uploaded file
unzip CLIENT_DEPLOYMENT_PACKAGE.zip

# Go into the folder
cd CLIENT_DEPLOYMENT_PACKAGE
```

---

### Step 6: Deploy to Cloud Run

1. In Cloud Shell, type this command:

```bash
gcloud run deploy naintor-website \
  --source . \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080 \
  --memory 512Mi
```

2. Press **Enter**

3. If asked about creating an Artifact Registry, type **Y** and press Enter

4. **Wait patiently** - The first deployment takes 5-10 minutes. You'll see progress messages.

5. When complete, you'll see a message with your website URL like:
   ```
   Service URL: https://naintor-website-abc123-el.a.run.app
   ```

6. **Copy this URL** and open it in your browser - Your website is now live! 🎉

---

### Step 7: Connect Your Custom Domain (Optional)

If you want to use your own domain (like nainfit.com):

1. In the Cloud Console, search for **"Cloud Run"**
2. Click on your service **"naintor-website"**
3. At the top, click **"MANAGE CUSTOM DOMAINS"**
4. Click **"ADD MAPPING"**
5. Select your service and enter your domain
6. Follow the instructions to add DNS records at your domain provider

---

## 💰 Understanding Costs

Google Cloud Run uses a **pay-per-use** model:

| What You Pay For | Cost |
|------------------|------|
| CPU time | $0.00002400 / vCPU-second |
| Memory | $0.00000250 / GiB-second |
| Requests | $0.40 / million requests |

**What this means in practice:**
- A small website with ~1,000 visitors/month: **$0-2/month**
- A medium website with ~10,000 visitors/month: **$2-5/month**
- You get: **2 million free requests per month**

---

## 🔄 How to Update Your Website

When you have updates to deploy:

1. Open [Google Cloud Console](https://console.cloud.google.com/)
2. Open Cloud Shell (terminal icon)
3. Upload your new files (same process as Step 5)
4. Run the same deploy command:

```bash
cd CLIENT_DEPLOYMENT_PACKAGE
gcloud run deploy naintor-website \
  --source . \
  --platform managed \
  --region asia-south1 \
  --allow-unauthenticated \
  --port 8080
```

---

## 🆘 Troubleshooting

### "Permission denied" error
- Make sure you're in the correct project (check the dropdown at the top)
- Make sure all APIs are enabled (Step 3)

### "Build failed" error  
- Check if all files were uploaded correctly
- Make sure the Dockerfile is present in your folder

### Website shows "Page not found"
- Wait 2-3 minutes after deployment
- Try refreshing the page
- Clear your browser cache

### Need more help?
Contact your development team with a screenshot of any error messages.

---

## ✅ Checklist

- [ ] Created Google Cloud account
- [ ] Created new project
- [ ] Enabled Cloud Run, Cloud Build, and Artifact Registry APIs
- [ ] Uploaded website files
- [ ] Ran deployment command
- [ ] Website is live at the Cloud Run URL
- [ ] (Optional) Connected custom domain

**Congratulations! Your website is now live on Google Cloud Run! 🎊**
