import express from "express";
import userRouter from "./routes/user.js";
import blogRouter from "./routes/blog.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

config({
  path: "./data/config.env",
});

// Using Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials: true, origin: 'http://localhost:3000',methods: ["GET", "POST", "PUT", "DELETE"]}));

// Using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogRouter);


app.get("/", (req, res) => {
  res.send("Nice working");
});

// Using Error Middleware
app.use(errorMiddleware);
