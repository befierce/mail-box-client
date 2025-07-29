import express, { Request, Response, Router } from "express";
import {sendMail,getAllSentMails, getAllRecievedMails,deleteMailsOfSender }from "../controllers/emailController";
import { createUser,userLogin } from "../controllers/userController";
const router: Router = express.Router();

router.post("/signup", createUser);
router.post("/login",userLogin);
router.post("/send", sendMail);
router.get("/get/sentbox/emails", getAllSentMails);
router.get("/get/inbox/emails",getAllRecievedMails);
router.delete("/user/delete/mail/:email",deleteMailsOfSender);

export default router;
