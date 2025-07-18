import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.post("/postuserdata", (req: Request, res: Response) => {
  res.send("<h1>hello world</h1>");
});

export default router;
