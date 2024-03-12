import express from 'express';
import colors   from'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js'

//configure env
dotenv.config();

// databse config
connectDB();


// rest object
const app = express()

// middleware
app.use(morgan('dev'))
app.use(express.json())


// routes 
app.use('/api/v1/auth', authRoutes);
// rest api 
app.get('/', (req,res) => {
    res.send('<h1>Welcome to ecommerce app</h1>');
});

// PORT 
const PORT  = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`Server runnig on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})