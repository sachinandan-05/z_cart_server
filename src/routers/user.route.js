import { Router } from "express";
import { loginUser, logoutUser, signUp, userDetails } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";
import authToken from "../middlewares/authToken.middleware.js";
import { getUsers, updateUsersDetails } from "../controllers/adminPannel.controller.js";



const router= Router()
router.route("/signup").post(upload.single("profilePic"),signUp)
router.route("/login").post(loginUser)

router.get("/userdetail",authToken,userDetails)
router.route("/logout").get(logoutUser)


// ------admin pannel-router----------

router.route("/allusers").get(getUsers)
router.route("/updateusers").post(authToken,updateUsersDetails)






export default router