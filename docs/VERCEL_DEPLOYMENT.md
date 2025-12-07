# 🚀 TaskFlow Frontend Deployment Guide - Vercel

This guide will help you deploy the TaskFlow frontend to Vercel successfully.

---

## ⚠️ Common Error Fix

If you see this error:
```
Error: Could not read /vercel/path0/package.json: Expected property name or '}' in JSON at position 2
```

**This means Vercel is looking in the wrong directory!**

---

## ✅ Correct Vercel Configuration

### Step 1: Import Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository

### Step 2: Configure Build Settings

**CRITICAL:** Set these values correctly:

| Setting | Value |
|---------|-------|
| **Framework Preset** | `Next.js` |
| **Root Directory** | `client` ⚠️ **IMPORTANT!** |
| **Build Command** | `npm run build` (auto-detected) |
| **Output Directory** | `.next` (auto-detected) |
| **Install Command** | `npm install` (auto-detected) |

### Step 3: Environment Variables

Add this environment variable:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | Your Render backend URL + `/api` |

**Example:**
```
NEXT_PUBLIC_API_URL=https://taskflow-backend.onrender.com/api
```

### Step 4: Deploy!

Click **"Deploy"** and wait 2-3 minutes.

---

## 🔧 If Deployment Still Fails

### Option A: Redeploy with Correct Settings

1. Go to your Vercel project → **Settings** → **General**
2. Scroll to **"Root Directory"**
3. Click **Edit** → Enter `client`
4. Save and redeploy

### Option B: Delete and Reimport

1. Delete the project from Vercel
2. Go back and import again
3. **Make sure** to set Root Directory to `client` before deploying

---

## ✅ Verify Deployment

Once deployed, test your frontend:

1. Visit your Vercel URL (e.g., `https://taskflow-psi-two.vercel.app`)
2. Try to register a new account
3. Login with demo credentials
4. Create a task
5. Test dark mode toggle

---

## 📱 Update Backend CORS

After deployment, update your Render backend environment variable:

```env
CLIENT_URL=https://your-app.vercel.app
```

Then restart the Render service.

---

## 🎉 Success!

Your TaskFlow app should now be fully deployed and working!

**Next Steps:**
- Update README.md with live demo links
- Share your project portfolio

---

## 📞 Troubleshooting

### Build Fails
- Check that `client/package.json` exists and is valid JSON
- Ensure Root Directory is set to `client`
- Check Vercel build logs for specific errors

### API Connection Issues
- Verify `NEXT_PUBLIC_API_URL` is correct
- Check that backend is deployed and running
- Verify backend CORS allows your Vercel domain

### Dark Mode Not Working
- Clear browser cache
- Check browser console for errors

---

**Good luck! 🚀**
