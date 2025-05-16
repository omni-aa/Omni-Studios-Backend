import express from "express";
import {connectDB} from "./db/connectDB.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({origin: "http://localhost:5173", credentials: true}));
// allows to parse incoming requests:req.body
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.listen(PORT, () => {
    connectDB();
    console.log("Listening on port:",PORT);
})