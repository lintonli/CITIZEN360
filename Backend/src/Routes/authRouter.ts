import { Router } from "express";
import { approveUser, deleteUser, loginUser, registerUser } from "../controllers/userController";
const authRoutes= Router()

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)
authRoutes.delete("/:id", deleteUser)
authRoutes.put("/approve/:id", approveUser)
 export default authRoutes;