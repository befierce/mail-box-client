import express, { Request, Response, Router } from "express";
import { createUser } from "../controllers/userController";
const router: Router = express.Router();

router.post("/usersignupdata", createUser);

export default router;
