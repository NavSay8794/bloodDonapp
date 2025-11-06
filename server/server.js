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
const allowedOrigins = ['https://blooddonapp-1.onrender.com'];

app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true); // Allow non-browser requests like curl
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Explicitly handle OPTIONS requests
app.options('*', cors()); 
app.use('/user', userRoutes)
app.use('/bloodReq', bloodRoutes)


// app.get('/', (req,res)=>{
//     res.send('Welcome to Blood Bank')
// })

await connectDB()
app.listen(PORT, ()=>{
    console.log(`Server is up and running on port: ${PORT}`)
})
