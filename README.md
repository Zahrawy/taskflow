# 📋 TaskFlow

A simple, professional task management system built with Next.js, Express, and MongoDB.

![TaskFlow](https://img.shields.io/badge/TaskFlow-Task%20Manager-blue)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![Express](https://img.shields.io/badge/Express-4.x-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen)

## 🌟 Features

- **User Authentication**: Register, login, logout with JWT HttpOnly cookies
- **Task Management**: Full CRUD operations (Create, Read, Update, Delete)
- **Dashboard**: Overview with stats, completion rate, and recent tasks
- **Filtering**: Filter tasks by status and priority
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Modern UI**: Tailwind CSS with Framer Motion animations

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- React Hot Toast

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- bcrypt Password Hashing
- express-validator
- helmet, cors, rate-limit

## 📁 Project Structure

```
/taskflow
├── /client                 # Next.js frontend
│   ├── /src
│   │   ├── /app           # App Router pages
│   │   ├── /components    # React components
│   │   ├── /context       # React Context (Auth)
│   │   └── /lib           # Utilities (API client)
│   └── package.json
├── /server                 # Express backend
│   ├── /src
│   │   ├── /config        # Database config
│   │   ├── /controllers   # Route handlers
│   │   ├── /middleware    # Auth, validation
│   │   ├── /models        # Mongoose schemas
│   │   ├── /routes        # API routes
│   │   ├── /utils         # Seed script
│   │   └── index.js       # Entry point
│   └── package.json
├── /docs                   # Documentation
│   └── postman-collection.json
├── .gitignore
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/taskflow.git
cd taskflow
```

### 2. Setup Environment Variables

Copy the example environment files:

```bash
# Root
cp .env.example .env

# Server
cp server/.env.example server/.env

# Client
cp client/.env.example client/.env.local
```

Update the variables in `server/.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskflow
JWT_SECRET=your_super_secret_jwt_key_here
CLIENT_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Install Dependencies

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 4. Seed the Database

```bash
cd server
npm run seed
```

This creates:
- Demo user: `demo@taskflow.test` / `Demo1234!`
- 5 sample tasks

### 5. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```

### 6. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

## 🔐 Demo Account

```
Email: demo@taskflow.test
Password: Demo1234!
```

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout user |
| GET | `/api/auth/me` | Get current user (protected) |

### Tasks (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get single task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

### Query Parameters for GET /api/tasks

- `status`: Filter by status (todo, in-progress, done)
- `priority`: Filter by priority (low, medium, high)
- `sortBy`: Sort field (createdAt, dueDate, priority)
- `order`: Sort order (asc, desc)

## 📝 cURL Examples

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{"email":"demo@taskflow.test","password":"Demo1234!"}'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"title":"New Task","description":"Task description","priority":"high"}'
```

### Get Tasks
```bash
curl http://localhost:5000/api/tasks -b cookies.txt
```

## 🚀 Deployment

### Backend (Render/Railway/Heroku)

1. Create a new Web Service
2. Connect your GitHub repository
3. Set build command: `cd server && npm install`
4. Set start command: `cd server && npm start`
5. Add environment variables:
   - `PORT`
   - `MONGO_URI`
   - `JWT_SECRET`
   - `CLIENT_URL` (your Vercel URL)
   - `NODE_ENV=production`

### Frontend (Vercel)

1. Import your GitHub repository
2. Set root directory to `client`
3. Add environment variable:
   - `NEXT_PUBLIC_API_URL` (your backend URL + /api)

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Get the connection string
5. Add your IP to Network Access (or allow all IPs for production)

## 📜 Scripts

### Server

```bash
npm start     # Start production server
npm run dev   # Start development server with nodemon
npm run seed  # Seed database with demo data
```

### Client

```bash
npm run dev   # Start development server
npm run build # Build for production
npm start     # Start production server
npm run lint  # Run ESLint
```

## 🧪 Testing with Postman

Import the Postman collection from `/docs/postman-collection.json` for easy API testing.

## 📄 License

MIT License

## 👨‍💻 Author

Built with ❤️ using Next.js, Express, and MongoDB
