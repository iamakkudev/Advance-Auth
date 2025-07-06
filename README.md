# 🔐 Auth-Project – MERN Stack Authentication System

This is a full-stack **authentication system** built with the **MERN stack** (MongoDB, Express, React, Node.js). It includes:

- ✅ Email verification
- 🔁 Token refresh mechanism
- 🔒 Route protection (frontend & backend)
- 📧 Forgot/reset password
- 🧪 Production-ready build

---

## 🚀 Features

- **User Sign Up & Login**
- **Email Verification** via unique token link
- **JWT Access & Refresh Token Strategy**
- **Forgot Password + Reset Flow**
- **Frontend Route Protection with React Router**
- **Persistent Login using HttpOnly Cookies**
- **Fully Responsive UI**
- **React Hot Toast Notifications**
- **Loading States and Auth Guards**
- **Production configuration for Express + React**
  
---

## 🧱 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- dotenv
- cookie-parser
- CORS
- Mailer (e.g., Brevo or Mailtrap for development)
- JWT

### Frontend
- React
- Vite
- React Router DOM
- Zustand (auth store)
- React Hot Toast
- TailwindCSS (or your choice of styling)
  
---

## 📂 Project Structure

Auth-Project/
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── middleware/
│ ├── db/
│ └── index.js
├── frontend/
│ ├── pages/
│ ├── components/
│ └── main.jsx

yaml
Copy
Edit

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/auth-project.git
cd auth-project
2. Install Dependencies
Backend
bash
Copy
Edit
cd backend
npm install
Frontend
bash
Copy
Edit
cd frontend
npm install
3. Set Environment Variables
Create a .env file inside backend/:

env
Copy
Edit
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
CLIENT_URL=http://localhost:5173
4. Run the App
Development
bash
Copy
Edit
# Run backend
cd backend
npm run dev

# Run frontend
cd frontend
npm run dev
Production
bash
Copy
Edit
# Build React app
cd frontend
npm run build

# Serve with Express
cd ..
npm start
🧪 API Endpoints
POST /api/auth/signup
Registers a user and sends verification email.

POST /api/auth/login
Logs in and returns access/refresh tokens.

POST /api/auth/verify-email
Verifies email using token.

POST /api/auth/forgot-password
Sends password reset link.

POST /api/auth/reset-password/:resetToken
Resets password using token.

POST /api/auth/logout
Clears refresh token cookie.

POST /api/auth/check-auth
Verifies token validity and user status.

🔐 Route Protection
Backend: Middleware verifyToken protects APIs.

Frontend: ProtectedRoute and RedirectAuthenticatedUser guard pages like /, /login, /signup, etc.

🌐 Deployment Notes
In index.js:

js
Copy
Edit
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  // Route all non-API requests to index.html
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}
This prevents path-to-regexp crashes and cleanly separates API vs frontend routing.

🧠 Lessons Learned
Handling auth across frontend/backend securely

Using cookies for refresh tokens (HttpOnly)

Building middleware to protect routes

Managing auth state with Zustand

Avoiding routing bugs in Express with static + wildcard paths


🙌 Acknowledgments
Email logic inspired by Brevo (Sendinblue)

Toasts by react-hot-toast

Form styling powered by Tailwind

📫 Contact
If you have any questions or suggestions:

Akash Sahani
📧 sahaniakashdev@gmail.com
🔗 LinkedIn

🏁 License
This project is licensed under the MIT License.

yaml
Copy
Edit

---

Let me know if you want a version with Markdown formatting disabled, or if you want to include a logo, badge (like Vercel deploy), or link to a live demo!








Ask ChatGPT
