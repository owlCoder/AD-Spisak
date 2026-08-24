import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import export_routes from "../controllers/xlsx_export_controller";
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3005;

// Apply CORS middleware with options
app.use(cors());
app.options('*', cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Lightweight endpoint used during deployment checks and the defense demo.
app.get("/api/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "evidencija-xlsx-api" });
});

// Use routes
app.use("/api", export_routes)

// For Vercel, we need to export the Express app
module.exports = app;

// Start the server
app.listen(port, () => {});
