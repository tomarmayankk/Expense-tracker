import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';

import authRoutes from './routes/auth.routes.js'
import expenseRoutes from './routes/expense.routes.js';
import budgetRoutes from './routes/budget.routes.js';
import dashboardRoutes from './routes/dashboard.routes.js';
import {connectDB} from './lib/db.js'

const app = express();
app.use(express.json());
dotenv.config();
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials:true
})); 

const PORT = process.env.PORT;

app.use("/api/auth", authRoutes);   
app.use("/api/expense", expenseRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/dashboard', dashboardRoutes);


app.listen(PORT, () => {
    console.log("server running" + PORT);
    connectDB();
})