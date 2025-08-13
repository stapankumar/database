import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

app.get("/health", (req, res) => {
  const states = ["disconnected", "connected", "connecting", "disconnecting"];
  const dbState = mongoose.connection.readyState;

  res.json({
    status: dbState === 1 ? "ok" : "error",
    dbState: states[dbState],
    time: new Date(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Database service running on port ${PORT}`));



//you need to build secure server with https for production grade 
//with a trusted CA or when you deploy it in domain providing sites they will automatically
//re dircet to https 
//this is not tested till now
