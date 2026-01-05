# 🎥 Video Upload, Sensitivity Processing & Streaming Application

A full-stack application that allows users to upload videos, process them for content sensitivity, and stream them efficiently with real-time progress tracking.

---

Video Walkthrough: https://drive.google.com/file/d/1zdpjsohY6IdGqaTe31aC0l71RRrSENrl/view?usp=sharing
---

## 🚀 Features

- Secure video upload with metadata storage  
- Real-time processing progress using Socket.io  
- Simulated content sensitivity analysis (Safe / Flagged)  
- HTTP Range-based video streaming (206 Partial Content)  
- Role-based access control (Admin, Editor, Viewer)  
- Multi-tenant architecture (organization-level isolation)  
- JWT-based authentication & authorization  

---

## 🏗️ Tech Stack

### Backend
- Node.js (Express.js)
- MongoDB (Mongoose ODM)
- JWT Authentication
- Multer (File Upload)
- Socket.io (Real-time updates)
- FFmpeg-ready processing pipeline (logical placeholder)

### Frontend
- React (Vite)
- Axios
- React Router
- Socket.io Client

---

## 📂 Project Structure

```
video-sensitivity-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   ├── services/
│   │   └── server.js
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   └── api/
│   └── vite.config.js
│
├── API_DOCS.md
├── ARCHITECTURE.md
└── README.md
```

---

## 🔐 User Roles & Permissions

| Role | Permissions |
|------|------------|
| Viewer | View & stream videos |
| Editor | Upload, view, delete own videos |
| Admin | Full system access |

---

## 🔄 Application Workflow

1. User registers / logs in  
2. Editor uploads a video  
3. Video enters processing state  
4. Sensitivity analysis runs (simulated)  
5. Real-time progress updates via Socket.io  
6. Video marked READY  
7. Video streamed using HTTP Range requests  

---

## ▶️ Setup Instructions

### Backend Setup
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open:
http://localhost:5173

---

## 🧪 Testing Checklist

- Login / Logout  
- Video upload  
- Real-time progress updates  
- Dashboard updates  
- Video streaming (206 Partial Content)  
- Role-based access  
- Multi-user isolation  

---

## 📌 Assumptions & Design Decisions

- Sensitivity analysis is simulated  
- Streaming optimized using HTTP range requests  
- Multi-tenant support at data layer  
- Scalable for future ML integration  

---

## 🚀 Deployment Ready

- Backend: Render / Railway  
- Frontend: Vercel / Netlify  
- MongoDB Atlas supported  

---

# 📡 API Documentation

## Authentication

### POST /api/auth/login
Login user and receive JWT token

---

## Video APIs

### POST /api/videos/upload
Upload video (Editor/Admin)

**Headers**
Authorization: Bearer token

**Body**
form-data → video (file)

---

### GET /api/videos
- List videos of logged-in user
+ List videos of logged-in user (role-aware)

---

### GET /api/videos/stream/:id
Stream video using HTTP range requests

---

### DELETE /api/videos/:id
Delete video (Owner only)

---

## Admin APIs

### GET /api/admin/users
List all users (Admin only)

---

# 🧠 System Architecture

## Backend
- RESTful API using Express.js
- Controllers handle business logic
- Services handle processing logic
- Centralized error handling middleware
- JWT-secured routes

## Frontend
- React Single Page Application
- Context API for authentication state
- Axios with request/response interceptors
- Socket.io client for real-time updates

## Scalability
- Organization-based multi-tenancy
- Ready for FFmpeg & ML integration
- CDN & cloud storage compatible

## Security
- JWT Authentication
- Role-based authorization
- User & organization data isolation

---

## 👩‍💻 Author

Bhargavi Sharma