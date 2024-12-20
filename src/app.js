import express from 'express'
import authRouter from './routes/authRoutes.js'
import adminRouter from './routes/adminRoutes.js'
import userRouter from './routes/candidateRoutes.js'
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config({})


export const app = express()

app.use(cors());
app.use(express.json())

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/admin", adminRouter)
app.use("/api/v1/user", userRouter)

app.get("/", (req, res) => {
    res.send("Nice work Arpit!")
})