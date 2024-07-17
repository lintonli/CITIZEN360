import { Router } from "express";
import { addIncident, getIncidents } from "../controllers/incidentController";
const incidentRoutes= Router()

incidentRoutes.post("", addIncident)
incidentRoutes.get("", getIncidents)
export default incidentRoutes