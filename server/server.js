import express from 'express'
import dotenv from 'dotenv'
import cors from'cors'
import { connectDB } from './configs/db.js';
import adminRouter from './routes/adminRoutes.js';
import newRouter from './routes/blogRoutes.js';
import imageRouter from './routes/imageRoutes.js';
// import imagekit from './configs/imagekit.js';
const app=express();

dotenv.config()
await connectDB();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT||4000;


app.get('/', (req,res)=>
    res.send("Backend is running.")
)
app.use('/api/admin',adminRouter)
app.use('/api/add',newRouter)
app.use('/api/image', imageRouter);
app.listen(PORT,()=>{
    console.log('Server is runing on port'+ PORT)
})
export default app