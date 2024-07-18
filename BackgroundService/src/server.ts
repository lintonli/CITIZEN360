import express, {json} from 'express'
import cron from 'node-cron'
import { sendUserEmail } from './emailService/userEmail'

const app= express()
app.use(json())
cron.schedule('*/10 * * * * *', async()=>{
await sendUserEmail()
})
app.listen(4001, ()=>{
    console.log("Background service is running")
})