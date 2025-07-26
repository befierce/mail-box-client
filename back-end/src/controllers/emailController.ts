import { Request, Response } from "express";
import { Email } from "../models/emailModel";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.jwt_secret;

const sendMail = async (req: Request, res: Response) => {
  const { subject, body, recieverEmail } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
    console.log("token arrived", token);
  const payload = jwt.verify(token as string, secret as string);
  console.log("payload here", payload)

  const email = new Email({
    senderId:( payload as JwtPayload).email,
    receiverId:recieverEmail,
    subject:subject,
    body: body
  });

  const savedData = await email.save();
  console.log("data saved",savedData);
};

export default sendMail;
