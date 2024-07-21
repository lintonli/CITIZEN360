import mssql from "mssql";
import ejs from "ejs";
import {v4 as uid} from 'uuid'
import { sqlConfig } from "../config";
import { sendMail } from "../Helpers";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

interface IUser {
  ID: string;
  UNAME: string;
  EMAIL: string;
  UPASSWORD: string;
  Rolename: string;
  USTATUS: string;
  isEmailSent: number;
  isPasswordResetEmailSent: number; 
  resetToken:string;
  resetTokenExpires:string;
  isDeleted: number;
}

export async function sendForgotEmail() {
  try {
    let pool = await mssql.connect(sqlConfig);
    let users = (
      await pool
        .request()
        .query("SELECT * FROM Users WHERE isPasswordResetEmailSent=0")
    ).recordset as IUser[];
    users.forEach((user) => {
        const resetToken= uid()
        const resetLink = ``;
      ejs.renderFile(
        "Templates/register.ejs",
        { name: user.UNAME, resetLink },
        async (error, data) => {
          let messageOptions = {
            to: user.EMAIL,
            from: process.env.EMAIL_ADDRESS,
            subject: "CITIZEN_CONNECT360",
            html: data,
          };
          await sendMail(messageOptions);
          await pool
            .request()
            .input('resetToken', resetToken)
            .query(`UPDATE Users SET resetToken=@resetToken, resetTokenExpires = DATEADD(hour, 1, GETDATE()), ispasswordResetEmailSent=1 WHERE ID='${user.ID}'`);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
}
