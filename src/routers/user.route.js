import { Router } from "express";
import { loginUser, signUp } from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";



const router= Router()
router.route("/signup",upload.single('profilePic')).post(signUp)
router.route("/login").post(loginUser)






export default router