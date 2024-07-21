import express, {json} from 'express'
import cron from 'node-cron'
import { sendUserEmail } from './emailService/userEmail'
import { sendForgotEmail } from './emailService/forgotEmail'

const app= express()
app.use(json())
cron.schedule('*/10 * * * * *', async()=>{
await sendUserEmail()
})
cron.schedule("*/10 * * * * *", async () => {
  await sendForgotEmail();
});
app.listen(4001, ()=>{
    console.log("Background service is running")
})