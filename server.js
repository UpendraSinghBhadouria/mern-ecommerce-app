import express from 'express';
import dotenv, { config } from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import morgan from 'morgan';
import cors from 'cors';
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productsRoutes.js'

// rest object
const app = express();

// configure env
dotenv.config();

// database config
connectDB();

// middlewares
app.use(cors());
app.use(express.json())
app.use(morgan("dev"))


// routes
app.use('/api/v1/auth', authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes)


app.get("/", (req, res) => {
    res.send("<h1>Welcome to ecommerce app </h1>")
})



const PORT = process.env.PORT || 8080;



app.listen(PORT, () => {
    console.log(`Server listening on ${process.env.DEV_MODE} mode on port ${PORT}`);
})