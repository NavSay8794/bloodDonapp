import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './utils/connectDB.js'
import userRoutes from './routes/userRoute.js'
import bloodRoutes from './routes/bloodroute.js'


const app = express()
dotenv.config()

const PORT = process.env.PORT || 5000
app.use(express.json())
app.use(cors())


app.use('/user', userRoutes)
app.use('/bloodReq', bloodRoutes)


// app.get('/', (req,res)=>{
//     res.send('Welcome to Blood Bank')
// })

await connectDB()
app.listen(PORT, ()=>{
    console.log(`Server is up and running on port: ${PORT}`)
})
