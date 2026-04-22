import express from "express";
import { errorMiddleware } from "./middleware/error.middleware.js";
import morgan from "morgan";
import cors from "cors";
import cookieParser from 'cookie-parser'


const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors({ origin: ["http://localhost:5173", "*"], credentials: true, }));
app.use(cookieParser());



app.use(errorMiddleware);
export default app;
