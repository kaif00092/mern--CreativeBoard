import express from "express";
import notesRoutes from "./routes/notesRoutes.js";

import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import path from "path";
import ratelimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

if (!process.env.NODE_ENV) {
  console.warn("⚠️  Warning: NODE_ENV is not set. Check your .env formatting.");
}

//middleware
if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

app.use(express.json()); //this middleware will parse json body
app.use(ratelimiter);

// app.use((req, res, next) => {
//   console.log(`request method is ${req.method} and req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}
connectDB().then(() => {
  app.listen(5001, () => {
    console.log("server is running on PORT:", PORT);
  });
});

//What is an endpoint ?
//An endpoint is a combination of a URL + HTTP method that lets the client interact with specific resource
