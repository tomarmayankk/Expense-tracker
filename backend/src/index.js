import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.routes.js'
import expenseRoutes from './routes/expense.routes.js';
import {connectDB} from './lib/db.js'

const app = express();
app.use(express.json());
dotenv.config();
app.use(cookieParser());

const PORT = process.env.PORT;


app.use("/api/auth", authRoutes);   
app.use("/api/expenses", expenseRoutes);
app.listen(PORT, () => {
    console.log("server running" + PORT);
    connectDB();
})