import { Response, Request, RequestHandler } from "express";
import mssql from 'mssql'
import Bcrypt from 'bcrypt'
import {v4 as uid} from 'uuid'
import dotenv from 'dotenv'
import path from "path";
import { sqlConfig } from "../config";
import { RegisterSchema } from "../Helpers/authvalidation";
import { DbHelper } from "../Helpers/databaseHelpers";
import  Jwt  from "jsonwebtoken";
import { IUser, Payload } from "../models/user";

const databaseInstance = new DbHelper()


export const registerUser = async(req:Request, res:Response)=>{
    try {
        const id = uid()
        const{UNAME,UPASSWORD,EMAIL,Rolename}=req.body
         const USTATUS="APPROVED"
         const {error}= RegisterSchema.validate(req.body)
         if(error){
            return res.status(400).json(error.details[0].message)
         }
         const hashedPassword= await Bcrypt.hash(UPASSWORD, 10)
         await databaseInstance.exec("addUser", {
            ID:id,
            NAME:UNAME,
            PASSWORD:hashedPassword,
            EMAIL:EMAIL,
            ROLE:Rolename,
            STATUS:USTATUS
         });
         return res.status(200).json({message:"User added successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const loginUser= async (req:Request, res:Response)=>{
    try {
        const{EMAIL, UPASSWORD}=req.body
        let user = await(await databaseInstance.exec("getUser",{EMAIL})).recordset
        if(user.length !==0){
            const isValid = await Bcrypt.compare(UPASSWORD, user[0].UPASSWORD)
            if(isValid){
                const payload:Payload={
                    SUB:user[0].ID,
                    UNAME:user[0].UNAME,
                    UROLE:user[0].Rolename
                }
                const token = Jwt.sign(payload, process.env.SECRET as string,{expiresIn:"3h"})
                return res.status(200).json({message:"Login Successful", token})
            }
            return res.status(400).json({message:"Invalid credentials"})
        }
    } catch (error) {
        return res.status(500).json(error)
    }
}
 export const getUsers:RequestHandler=async(req, res)=>{
    try {
        const users = (await databaseInstance.exec("getUsers",{})).recordset as IUser[]
        return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json(error)  
    }
 }
 export const deleteUser = async (req:Request<{Id:string}> ,res:Response)=>{
try {
    const{EMAIL}=req.body
    const user = (await databaseInstance.exec("getUser",{EMAIL})).recordset[0] as IUser
    if(user && user.EMAIL){
        await databaseInstance.exec("deleteUser",{ID:req.params.Id});
        return res.status(200).json({message:"User deleted successfully"})
    }
    return res.status(400).json({message:"User not found"})
} catch (error) {
    return res.status(500).json({error})
}
 }
  export const approveUser= async (req:Request<{Id:string}>, res:Response)=>{
    try {
         const { EMAIL } = req.body;
         const user = (await databaseInstance.exec("getUser", { EMAIL }))
           .recordset[0] as IUser;
         if (user && user.EMAIL) {
           await databaseInstance.exec("approveStatus", { ID: req.params.Id });
           return res
             .status(200)
             .json({ message: "User approved successfully" });
         }
         return res.status(400).json({ message: "User not found" });
    } catch (error) {
        return res.status(500).json(error)
    }
  }