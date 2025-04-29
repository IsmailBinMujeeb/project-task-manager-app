import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
config();

// Importing routes
import userRouter from "./routes/api/user.routes.js";
import projectRouter from "./routes/api/project.routes.js";
import taskRouter from "./routes/api/task.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.set('port', PORT);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({origin: 'http://localhost:5173', credentials: true, methods: ['GET', 'POST', 'DELETE', 'PUT']}));
app.use("/api/user/", userRouter);
app.use("/api/project/", projectRouter);
app.use("/api/task/", taskRouter);

export default app;