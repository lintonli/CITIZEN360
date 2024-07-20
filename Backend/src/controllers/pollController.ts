import { Request, Response, RequestHandler } from "express";
import {v4 as uid} from 'uuid'
import { DbHelper } from "../Helpers/databaseHelpers";
import { Poll, pollOptions } from "../models/polls";

const databaseInstance= new DbHelper()
export const addPoll= async(req:Request, res:Response)=>{
    try {
        const Id = uid()
         const{TITLE,USERID,OPTIONS}=req.body;
        //  console.log("Parameters passed to AddPoll:", {
        //    ID: Id,
        //    TITLE,
        //    USERID,
        //  });
          await databaseInstance.exec("AddPoll",{
            ID:Id,
            TITLE,
            USERID,
          })
          

          for(let option of OPTIONS){
            const optionId = uid()
            await databaseInstance.exec("addOption",{
                ID:optionId,
                PNAME:option.PNAME,
                VOTES:0,
                POLLID:Id
            })
          }
          return res.status(201).json({message:'Poll added successfully'})
    } catch (error) {
        return res.status(500).json(error)
    }
}
export const getPollsOptions:RequestHandler=async(req, res)=>{
    try {
       const polls = await(
         await databaseInstance.exec("GetPolls", {})
       ).recordset as Poll[];
    for(let  poll of polls){
     const option=(await databaseInstance.exec("getOptions",{POLLID:`${poll.ID}`})).recordset as pollOptions[]
        poll.OPTIONS=option
    }
       return res.status(200).json(polls)
    } catch (error) {
        return res.status(500).json(error)
    }
}


