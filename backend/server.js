
import 'dotenv/config'

import express from 'express'
import cors from 'cors'
import connectDB from './config/mongoDB.js'
import userRouter from './routes/userRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import challengeRouter from './routes/challengeRoutes.js'


const app = express()

app.use(cors())

app.use(express.json())

//config
connectDB()
connectCloudinary()

app.use("/api/auth",userRouter)
app.use('/api/challenge',challengeRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('Server running on port 5000');
});