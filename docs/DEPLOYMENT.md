# 🚀 TaskFlow Backend Deployment Guide - Render

This guide will help you deploy the TaskFlow backend to Render in under 10 minutes.

---

## 📋 Prerequisites

Before you begin, make sure you have:

- ✅ A [Render](https://render.com) account (free tier works!)
- ✅ Your code pushed to a GitHub repository
- ✅ MongoDB Atlas connection string
- ✅ A strong JWT secret key

---

## 🔧 Step 1: Prepare Your Repository

Your backend code is already in the `/server` directory. Render will automatically detect it.

**Important Files:**
- ✅ `package.json` - Already configured
- ✅ `.env.example` - Template for environment variables
- ✅ Start command: `npm start` (uses `node src/index.js`)

---

## 🌐 Step 2: Create a New Web Service on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:

   | Setting | Value |
   |---------|-------|
   | **Name** | `taskflow-backend` (or your choice) |
   | **Environment** | `Node` |
   | **Build Command** | `npm install` |
   | **Start Command** | `npm start` |
   | **Root Directory** | `server` |

---

## 🔐 Step 3: Add Environment Variables

In the Render dashboard, scroll to **"Environment Variables"** and add:
---

## 📡 Step 4: Deploy!

1. Click **"Create Web Service"**
2. Render will:
   - Clone your repository
   - Install dependencies (`npm install`)
   - Start the server (`npm start`)
3. Wait 2-3 minutes for the build to complete

---

## ✅ Step 5: Verify Deployment

Once deployed, you'll get a URL like: `https://taskflow-backend.onrender.com`

### Test the API:

**Health Check:**
```bash
curl https://your-app.onrender.com/api/health
```

**Register Test User:**
```bash
curl -X POST https://your-app.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"Test1234!"}'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": { ... }
}
```

---

## 🔄 Step 6: Connect Frontend

Update your Vercel frontend environment variable:

```env
NEXT_PUBLIC_API_URL=https://your-app.onrender.com/api
```

Then redeploy your frontend on Vercel.

---

## ⚠️ Important Notes

### 🐌 Free Tier Limitations
- Render's free tier **sleeps after 15 minutes of inactivity**
- First request after sleep takes ~30-60 seconds to wake up
- Upgrade to paid plan ($7/month) for always-on service

### 🗄️ MongoDB Atlas Setup
Make sure your MongoDB Atlas cluster:
1. Allows connections from **all IPs** (`0.0.0.0/0`) or Render's IPs
2. Has a database user with read/write permissions
3. Connection string includes the database name

### 🔒 CORS Configuration
Your Express server already has CORS configured to accept requests from `CLIENT_URL`. Make sure it matches your Vercel URL exactly.

---

## 🛠️ Troubleshooting

### Build Fails
- Check that `package.json` is in the `/server` directory
- Ensure all dependencies are listed in `dependencies`, not `devDependencies`

### Can't Connect to MongoDB
- Verify MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Check connection string format
- Ensure database user has correct permissions

### 500 Errors
- Check Render logs: Dashboard → Your Service → Logs
- Verify all environment variables are set correctly
- Check `NODE_ENV=production`

---

## 📊 Monitoring

**View Logs:**
1. Go to your service in Render Dashboard
2. Click **"Logs"** tab
3. Monitor real-time server logs

**Metrics:**
- CPU usage
- Memory usage
- Request count

---

## 🎉 Next Steps

After successful deployment:

1. ✅ Update frontend to use production API URL
2. ✅ Test all endpoints (auth, tasks, contact)
3. ✅ Run the seed script if needed: `npm run seed`
4. ✅ Update README with live demo link

---

## 📞 Need Help?

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)

---

**Good luck with your deployment! 🚀**
