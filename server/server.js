import express from "express";
import cors from "cors";
import dbConnection from "./configs/db.js";
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from "./inngest/index.js"
import { serve } from "inngest/express";

const app = express();
const port = 4000;

// Connect to DB
await dbConnection();

// Middleware
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware())


// API Routes
app.get("/", (req, res) => {
  res.send("Live server");
});

app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
