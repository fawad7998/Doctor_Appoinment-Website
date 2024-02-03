import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import authRouter from "./Routes/authRouter.js";
import userRouter from "./Routes/userRouter.js";
import doctorRouter from "./Routes/doctorRouter.js";
import reviewRouter from "./Routes/reviewRouter.js";

dotenv.config();

const app = express();

const port = process.env.PORT || 8080;

const corsOptions = {
  origin: true,
};

app.get("/", (req, res) => {
  res.send("API is working...");
});

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev"));

// route middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/doctors", doctorRouter);
app.use("/api/v1/reviews", reviewRouter);

// mongodb connection
const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("DB Connections successful!"))
  .catch((err) => {
    console.log("DB Connections Error🎆", err);
  });

const server = app.listen(port, () => {
  console.log(`App running on port ${port}....`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! 💥 shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED EXCEPTION! 💥 shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
