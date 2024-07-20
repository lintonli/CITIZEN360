import express, {json} from 'express'
import authRoutes from './Routes/authRouter';
import viewRoutes from './Routes/viewRouter';
import incidentRoutes from './Routes/incidentRouter';
import pollRoutes from './Routes/pollRouter';
const app = express();
app.use(json())
app.use("/auth", authRoutes)
app.use("/views", viewRoutes)
app.use("/incidents", incidentRoutes)
app.use("/polls", pollRoutes)
app.listen(4000,()=>{
    console.log('Connect360 is running at port 4000')
})