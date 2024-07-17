import { Router } from "express";
import { addView, getViews } from "../controllers/viewController";
const viewRoutes = Router()
viewRoutes.post("", addView)
viewRoutes.get("", getViews)
export default viewRoutes