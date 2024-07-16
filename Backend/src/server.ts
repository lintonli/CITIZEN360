import express, {json} from 'express'
import authRoutes from './Routes/authRouter';
const app = express();
app.use(json())
app.use("/auth", authRoutes)
app.listen(4000,()=>{
    console.log('Connect360 is running at port 4000')
})