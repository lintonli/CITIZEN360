import { Response,Request,RequestHandler } from "express";
import { DbHelper } from "../Helpers/databaseHelpers";
import {v4 as uid} from 'uuid'
import { IView } from "../models/views";
const databaseInstance= new DbHelper()
export const addView= async(req:Request, res:Response)=>{
    try {
        const id = uid()
    const{BODY,USERID}=req.body;
    await databaseInstance.exec('addView',{ID:id,BODY,USERID})
    return res.status(201).json({message:"View added successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getViews:RequestHandler=async(req, res)=>{
    try {
        const view =(await databaseInstance.exec("getViews",{})).recordset as IView[]
         return res.status(200).json(view)
    } catch (error) {
        return res.status(500).json(error)
    }
}