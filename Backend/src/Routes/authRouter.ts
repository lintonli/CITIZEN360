import { Router } from "express";
import { approveUser, deleteUser, forgotPassword, getUsers, loginUser, registerUser } from "../controllers/userController";
const authRoutes= Router()

authRoutes.post("/register", registerUser)
authRoutes.post("/login", loginUser)
authRoutes.delete("/:Id", deleteUser)
authRoutes.put("/approve/:Id", approveUser)
authRoutes.patch("/:email", forgotPassword)
authRoutes.get("", getUsers)
 export default authRoutes;