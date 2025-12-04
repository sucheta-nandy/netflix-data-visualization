# 🚀 Deployment Guide - Netflix Data Visualization Portfolio

## Quick Deploy to GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the **"+"** icon in the top right → **"New repository"**
3. Repository settings:
   - **Name**: `netflix-data-viz` (or any name you prefer)
   - **Description**: "Interactive Netflix Data Visualization Portfolio - Built with D3.js"
   - **Visibility**: Public
   - **DO NOT** initialize with README (we already have one)
4. Click **"Create repository"**

### Step 2: Push Your Code

GitHub will show you commands. Use these in your terminal:

```bash
cd /Users/suchetanandy/.gemini/antigravity/scratch/netflix-data-viz

# Add your GitHub repository as remote (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/netflix-data-viz.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **"Settings"** tab
3. Scroll down to **"Pages"** in the left sidebar
4. Under **"Source"**, select:
   - Branch: `main`
   - Folder: `/ (root)`
5. Click **"Save"**

### Step 4: Get Your Public URL

After 1-2 minutes, your site will be live at:
```
https://YOUR_USERNAME.github.io/netflix-data-viz/
```

You can find the exact URL in Settings → Pages.

---

## Alternative: Deploy to Vercel (Even Easier!)

### Option A: Vercel CLI

```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy (from project directory)
cd /Users/suchetanandy/.gemini/antigravity/scratch/netflix-data-viz
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Your account
# - Link to existing project? No
# - Project name? netflix-data-viz
# - Directory? ./
# - Override settings? No
```

Your site will be live instantly at: `https://netflix-data-viz.vercel.app`

### Option B: Vercel Web Interface

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click **"Add New..."** → **"Project"**
4. Import your GitHub repository
5. Click **"Deploy"**

Done! Vercel will give you a public URL immediately.

---

## Alternative: Deploy to Netlify

### Netlify Drop (Easiest - No Git Required!)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Sign in (or create free account)
3. Drag and drop your entire `netflix-data-viz` folder
4. Get instant public URL: `https://random-name.netlify.app`
5. (Optional) Customize the URL in Site Settings

### Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
cd /Users/suchetanandy/.gemini/antigravity/scratch/netflix-data-viz
netlify deploy --prod

# Follow prompts to create new site
```

---

## Recommended Approach

**For Netflix Application**: Use **GitHub Pages** because:
- ✅ Shows your Git/GitHub proficiency
- ✅ Professional URL structure
- ✅ Free and reliable
- ✅ Easy to update (just `git push`)

**For Quick Testing**: Use **Netlify Drop** because:
- ✅ Instant deployment (no Git needed)
- ✅ Get URL in 30 seconds
- ✅ No command line required

---

## After Deployment

### Update Your Application

Include your public URL in your Netflix job application:

```
Portfolio URL: https://YOUR_USERNAME.github.io/netflix-data-viz/

This interactive portfolio showcases:
- 5 data visualizations built with D3.js
- Netflix-inspired UI with smooth animations
- Responsive design across all devices
- Advanced JavaScript and data storytelling skills
```

### Share on LinkedIn (Optional)

Post about your portfolio:
```
🎬 Just built an interactive Netflix data visualization portfolio! 

Featuring streaming trends, genre distribution, global viewership maps, 
and engagement analytics - all with smooth D3.js animations.

Check it out: [YOUR_URL]

#DataVisualization #D3js #JavaScript #Netflix #WebDevelopment
```

---

## Troubleshooting

### GitHub Pages not loading?
- Wait 2-3 minutes after enabling
- Check Settings → Pages for deployment status
- Ensure `index.html` is in root directory ✅

### Visualizations not showing?
- Check browser console for errors
- Ensure D3.js CDN is loading (check internet connection)
- All our files use relative paths, so should work fine ✅

### Want to update the site?
```bash
# Make your changes, then:
git add .
git commit -m "Update visualizations"
git push
```

GitHub Pages will auto-update in 1-2 minutes!

---

**Ready to deploy! Choose your method above and get your public URL. 🚀**
