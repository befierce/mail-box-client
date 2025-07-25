import express, { Request, Response, Router } from "express";
import { createUser,userLogin } from "../controllers/userController";
const router: Router = express.Router();

router.post("/signup", createUser);
router.post("/login",userLogin);
export default router;
