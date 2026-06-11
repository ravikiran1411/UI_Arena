
import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import connectDB from './config/mongoDB.js'
import userRouter from './routes/userRoutes.js'


const app = express()

app.use(cors())

app.use(express.json())

//config
connectDB()

app.use("/api/auth",userRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server running on port 5000');
});