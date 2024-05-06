// server/src/index.js
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import { mailRouter } from "./routes/mailRoutes.js";
import { chatRouter } from "./routes/chatRoutes.js";
import { projectRouter } from "./routes/projectRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_ATLAS_URI, {
    // retryWrites: true, // MongoDB Atlas requires this to be true
    // w: "majority", // Write concern options
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// //////// PRODUCTION ///////
// const corsOptions = {
//   origin: [
//     "https://philippecharpentier.dev",
//     "https://193.203.169.236",
//   ],
//   credentials: true, // Important for sessions or when using cookies / authentication headers
// };
// app.use(cors(corsOptions));

//////// DEV ONLY ///////
app.use(cors());

app.use(express.json());
app.use("/api/v1/mail", mailRouter);
app.use("/api/v1/chat", chatRouter);
app.use("/api/v1/projects", projectRouter);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
