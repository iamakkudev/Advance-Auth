import express from 'express'
import cors from 'cors'
import dotenv from "dotenv";
dotenv.config();
import authRoutes from './routes/auth.route.js'
import path from 'path'
import { connectDB } from './db/connectDB.js';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// CORS configuration
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true 
}));

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(cookieParser()); // Parse incoming cookies

// Routes
app.use("/api/auth", authRoutes);


// Production configuration
if (process.env.NODE_ENV === "production") {
  // Serve static files from frontend build
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  
  // Handle React routing - serve index.html for all non-API routes
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Start server
app.listen(PORT, () => {
  connectDB();
  console.log("Server is running on port", PORT);
});