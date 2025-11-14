import express from "express";
import serverless from "serverless-http";
import { registerRoutes } from "../server/routes";  // adjust path if needed

const app = express();

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Register routes (NO Vite, NO static)
registerRoutes(app);

// Error handler
app.use((err, _req, res, _next) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
});

// Required by Vercel
export const config = {
  runtime: "nodejs20.x",
};

// Export serverless handler
export default serverless(app);
