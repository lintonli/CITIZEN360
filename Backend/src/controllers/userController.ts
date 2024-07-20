import { Response, Request, RequestHandler } from "express";
import Bcrypt from 'bcrypt'
import {v4 as uid} from 'uuid'
import dotenv from 'dotenv'
import path from "path";
import { RegisterSchema } from "../Helpers/authvalidation";
import { DbHelper } from "../Helpers/databaseHelpers";
import  Jwt  from "jsonwebtoken";
import { IUser, Payload } from "../models/user";

const databaseInstance = new DbHelper()


export const registerUser = async(req:Request, res:Response)=>{
    try {
      
        const id = uid()
        const{UNAME,UPASSWORD,EMAIL,Rolename, USTATUS}=req.body
          
            const { error } = RegisterSchema.validate(req.body);
         if(error){
            return res.status(400).json(error.details[0].message)
         }
         const hashedPassword= await Bcrypt.hash(UPASSWORD, 10)
         await databaseInstance.exec("addUser", {
           ID: id,
           NAME: UNAME,
           EMAIL: EMAIL,
           PASSWORD: hashedPassword,
           ROLE: Rolename,
           STATUS: USTATUS,
         });
         return res.status(200).json({message:"User added successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { EMAIL, UPASSWORD } = req.body;
    const user = await (
      await databaseInstance.exec("getUser", { EMAIL })
    ).recordset as IUser[]
     console.log(user);
    if (user.length !== 0) {
      const isValid = await Bcrypt.compare(UPASSWORD, user[0].UPASSWORD);
      if (isValid) {
        const payload: Payload = {
          SUB: user[0].ID,
          UNAME: user[0].UNAME,
          Rolename: user[0].Rolename,
        };
        // console.log(user);
        const token = Jwt.sign(payload, process.env.SECRET as string, {
          expiresIn: "2h",
        });

        return res.status(200).json({ message: "Login successfull", token });
      }
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
  } catch (error) {
    return res.status(500).json(error);
  }
};

 export const getUsers:RequestHandler=async(req, res)=>{
    try {
        const users = (await databaseInstance.exec("getUsers",{})).recordset as IUser[]
        return res.status(200).json(users)
    } catch (error) {
      return res.status(500).json(error)  
    }
 };
 export const deleteUser = async (req:Request<{Id:string}> ,res:Response)=>{
try {
    console.log(req.params.Id);
    
    const user = (await databaseInstance.exec("getUserId",{ID:req.params.Id})).recordset[0] as IUser
    console.log(user)
    if(user && user.ID){
        await databaseInstance.exec("deleteUser",{ID:req.params.Id});
        return res.status(200).json({message:"User deleted successfully"})
    }
    return res.status(400).json({message:"User not found"})
} catch (error) {
    return res.status(500).json({error})
}
 };
  export const approveUser= async (req:Request<{Id:string}>, res:Response)=>{
    try {
       
         const user = (await databaseInstance.exec("getUserId", {ID:req.params.Id }))
           .recordset[0] as IUser;
          //  console.log(user)
         if (user && user.ID) {
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
  export const forgotPassword = async(req:Request<{email:string}>, res:Response)=>{
    try {
      const user = (await databaseInstance.exec('getUser',{EMAIL:req.params.email})).recordset[0] as IUser
      if(user && user.EMAIL){
        const {UPASSWORD}=req.body

        const hashedPassword=await Bcrypt.hash(UPASSWORD, 10)
        await databaseInstance.exec("forgotPassword",{
          EMAIL:req.params.email,
          UPASSWORD:hashedPassword
        })
        return res.status(200).json({message:"Password changed successfully"})
      }
      return res.status(404).json({message:"User not found"})
    } catch (error) {
      return res.status(500).json(error)
    }
  }