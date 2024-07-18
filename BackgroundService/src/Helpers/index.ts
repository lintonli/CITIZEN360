import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({path:path.resolve(__dirname, "../../.env")})
let config={
    host:"smtp.gmail.com",
    service:"gmail",
    port:587,
    auth:{
        user:process.env.EMAIL_ADDRESS,
        pass:process.env.EMAIL_PASS,
    },
}
 function createTransport(config:any){
    return nodemailer.createTransport(config)
 }
 export async function sendMail(messageOptions:any){
    let transporter = createTransport(config)
    await transporter.verify()
    await transporter.sendMail(messageOptions,(err, info)=>{
        if(err){
            console.log(err)
        }
        console.log(info)
    })
 }