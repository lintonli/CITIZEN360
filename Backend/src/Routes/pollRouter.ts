import { Router } from "express";
import { addPoll, getPollsOptions, votePoll } from "../controllers/pollController";
const pollRoutes= Router()
pollRoutes.post("", addPoll)
pollRoutes.get("", getPollsOptions)
pollRoutes.post("/vote", votePoll)
export default pollRoutes;