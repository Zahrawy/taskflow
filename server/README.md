# 📋 TaskFlow

A modern, professional task management system built with Next.js, Express, and MongoDB.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.x-green?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## 🚀 Live Demo

**[🔗 Live Demo Link Coming Soon]**

## ✨ Features

- 🔐 **Secure Authentication**: JWT-based auth with HttpOnly cookies.
- 📋 **Smart Task Management**: Create, track, and organize tasks with ease.
- 📊 **Productivity Dashboard**: Visual insights, progress tracking, and stats.
- 🌗 **Dark Mode**: Fully responsive, beautiful UI with theme persistence.
- ⚡ **Modern Experience**: Built with Next.js 14, Framer Motion, and TypeScript.
- 📧 **Contact Integration**: Functional contact form with email notifications.

## 🛠️ Tech Stack

| Frontend | Backend |
|----------|---------|
| **Next.js 14** (App Router) | **Node.js** + Express |
| **TypeScript** | **MongoDB** + Mongoose |
| **Tailwind CSS** | **JWT** Authentication |
| Framer Motion | Nodemailer |

## 📁 Structure

```
/taskflow
├── /client                 # Next.js Frontend application
│   ├── /src/app           # App Router pages & layouts
│   └── /src/components    # Reusable UI components
├── /server                 # Express Backend API
│   ├── /src/controllers   # Route controllers
│   └── /src/models        # Database schemas
└── /docs                   # Project documentation
```

## ⚡ Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow

# Install dependencies for both ends
cd server && npm install
cd ../client && npm install
```

### 2. Environment Setup
Create `.env` files in `server/` and `client/` based on the provided `.env.example` files.

**Key Variables:**
- **Server**: `PORT`, `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`
- **Client**: `NEXT_PUBLIC_API_URL`

### 3. Start Development
```bash
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend
cd client && npm run dev
```

## 🔐 Demo Account

Use these credentials to test the platform instantly:

- **Email:** `demo@taskflow.test`
- **Password:** `Demo1234!`

## 📜 Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server (both client/server) |
| `npm start` | Start production server |
| `npm run seed` | **(Server)** Seed database with sample data |
| `npm run build` | **(Client)** Build for production |

## 👨‍💻 Author

Built with ❤️ using **Next.js** and **Express**.
