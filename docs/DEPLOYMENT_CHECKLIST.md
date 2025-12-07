# 🚀 Deployment Checklist

## Backend (Render)
- [ ] Push code to GitHub
- [ ] Create new Web Service on Render
- [ ] Set root directory to `server`
- [ ] Set build command: `npm install`
- [ ] Set start command: `npm start`
- [ ] Add environment variables:
  - [ ] PORT=5000
  - [ ] MONGO_URI
  - [ ] JWT_SECRET
  - [ ] CLIENT_URL
  - [ ] NODE_ENV=production
  - [ ] EMAIL_USER (optional)
  - [ ] EMAIL_PASS (optional)
- [ ] Deploy and wait for build
- [ ] Test `/api/health` endpoint
- [ ] Test `/api/auth/register` endpoint

## Frontend (Vercel)
- [ ] Push code to GitHub
- [ ] Import repository to Vercel
- [ ] Set root directory to `client`
- [ ] Add environment variable:
  - [ ] NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api
- [ ] Deploy
- [ ] Test login/registration
- [ ] Test task creation

## MongoDB Atlas
- [ ] Whitelist all IPs (0.0.0.0/0)
- [ ] Create database user
- [ ] Copy connection string
- [ ] Test connection from local

## Post-Deployment
- [ ] Update README.md with live demo links
- [ ] Test all features end-to-end
- [ ] Monitor Render logs for errors
