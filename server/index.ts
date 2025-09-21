import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Logging middleware for /api routes
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      if (logLine.length > 80) logLine = logLine.slice(0, 79) + "…";
      log(logLine);
    }
  });

  next();
});

(async () => {
  // Register API routes
  await registerRoutes(app);

  // Error-handling middleware
  app.use((err: unknown, _req: Request, res: Response, _next: NextFunction) => {
    const e = err as { status?: number; statusCode?: number; message?: string };
    const status = e.status || e.statusCode || 500;
    const message = e.message || "Internal Server Error";

    res.status(status).json({ message });

    // Only throw in development for debugging
    if (app.get("env") === "development") throw err;
  });

  // Dev vs Production
  if (app.get("env") === "development") {
    await setupVite(app);
  } else {
    serveStatic(app, "../dist/public");
  }

  // Start server
  const DEFAULT_PORT = process.env.PORT || 7000;
  const HOST = process.env.HOST || "127.0.0.1";

  const server = app.listen(DEFAULT_PORT, HOST, () => {
    const port = (server.address() as any).port;
    console.log(`✅ Server running on http://${HOST}:${port} (${app.get("env")})`);
  });

  // Handle port in use
  server.on("error", (err: any) => {
    if (err.code === "EADDRINUSE") {
      console.warn(`⚠️ Port ${DEFAULT_PORT} is in use. Trying another port...`);
      const fallbackServer = app.listen(0, HOST, () => {
        const newPort = (fallbackServer.address() as any).port;
        console.log(`✅ Server switched to http://${HOST}:${newPort}`);
      });
    } else {
      console.error("❌ Server failed to start:", err);
      process.exit(1);
    }
  });
})();
