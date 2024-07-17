import { Response, Request, RequestHandler } from "express";
import{v4 as uid} from 'uuid'
import { DbHelper } from "../Helpers/databaseHelpers";
import { Incidents } from "../models/incident";
const databaseInstance = new DbHelper()

export const addIncident= async(req:Request, res:Response)=>{
    try {
        const Id = uid()
        const{ILOCATION,MEDIA,BODY,TDATE,USERID}=req.body
        await databaseInstance.exec('addIncident',{ID:Id,ILOCATION,MEDIA,BODY,TDATE,USERID})
        return res.status(201).json({message:"Incident added successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getIncidents:RequestHandler= async(req, res)=>{
    try {
        const incidents = (await databaseInstance.exec('getIncidents',{})).recordset as Incidents[]
        return res.status(200).json(incidents)
    } catch (error) {
        return res.status(500).json(error)
    }
}