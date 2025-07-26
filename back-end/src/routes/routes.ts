import express, { Request, Response, Router } from "express";
import sendMail from "../controllers/emailController";
import { createUser,userLogin } from "../controllers/userController";
const router: Router = express.Router();

router.post("/signup", createUser);
router.post("/login",userLogin);
router.post("/send", sendMail);
// router.get("/getmail",getMail);
// router.delete("/deletemail",deleteMail);

export default router;
