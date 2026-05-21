🎉 URJOTSAV – College Fest Management System

A full-stack web application for managing a college technical and cultural fest. It includes event registration, admin control panel, user authentication, and event management with a modern UI.

🚀 Features
👨‍🎓 User Side
Browse fest events
Register for events
View event details
Login / Signup system
Personal dashboard
🛠️ Admin Panel
Admin login (JWT secured)
Create / update / delete events
View all registrations
Manage contact messages 
⚙️ System Features
Fully responsive UI
REST API integration
Secure authentication (JWT + bcrypt)
MongoDB database integration
Role-based access (User / Admin)
🧰 Tech Stack
Frontend
React (Vite)
Tailwind CSS
React Router
Axios
Backend
Node.js
Express.js
Database
MongoDB (Mongoose)
Authentication
JWT (JSON Web Token)
bcrypt.js
📁 Project Structure
URJOTSAV/
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.jsx
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
│
└── README.md
🔌 API Endpoints
Auth Routes
POST /api/auth/register → Register user
POST /api/auth/login → Login user
GET /api/auth/profile → Get user profile
Event Routes
GET /api/events → Get all events
POST /api/events → Create event (Admin)
PUT /api/events/:id → Update event (Admin)
DELETE /api/events/:id → Delete event (Admin)
Registration Routes
POST /api/register → Register for event
GET /api/register → View registrations (Admin)
Contact Routes
POST /api/contact → Send message
GET /api/contact → View messages (Admin)
⚙️ Setup Instructions
1. Clone the repository
git clone https://github.com/your-username/urjotsav.git
cd urjotsav
2. Backend Setup
cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm start
3. Frontend Setup
cd frontend
npm install
npm run dev
🌐 Environment Variables
Key	Description
MONGO_URI	MongoDB connection string
JWT_SECRET	Secret key for authentication
PORT	Backend server port
📸 Screenshots

(Add your project screenshots here)

🔥 Future Improvements
Live chat support
Payment gateway for paid events
Email notifications
QR-based event entry system
Certificate generator
👨‍💻 Author
Ram Mehta
Project: URJOTSAV Fest Management System
📜 License

This project is for educational purposes only.
