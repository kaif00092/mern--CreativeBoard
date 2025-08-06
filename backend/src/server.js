import express from "express";
import notesRoutes from "./routes/notesRoutes.js";

import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import ratelimiter from "./middleware/rateLimiter.js";
import cors from "cors";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

//middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); //this middleware will parse json body
app.use(ratelimiter);

// app.use((req, res, next) => {
//   console.log(`request method is ${req.method} and req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(5001, () => {
    console.log("server is running on PORT:", PORT);
  });
});

//What is an endpoint ?
//An endpoint is a combination of a URL + HTTP method that lets the client interact with specific resource
