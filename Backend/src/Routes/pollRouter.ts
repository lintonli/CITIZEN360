import { Router } from "express";
import { addPoll, getPollsOptions } from "../controllers/pollController";
const pollRoutes= Router()
pollRoutes.post("", addPoll)
pollRoutes.get("", getPollsOptions)
export default pollRoutes;