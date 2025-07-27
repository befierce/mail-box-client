import { Request, Response } from "express";
import { Email } from "../models/emailModel";
import jwt, { JwtPayload } from "jsonwebtoken";

const secret = process.env.jwt_secret;

export const sendMail = async (req: Request, res: Response) => {
  const { subject, body, recieverEmail } = req.body;
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token arrived", token);
  const payload = jwt.verify(token as string, secret as string);
  console.log("payload here", payload);

  const email = new Email({
    senderId: (payload as JwtPayload).email,
    receiverId: recieverEmail,
    subject: subject,
    body: body,
  });

  const savedData = await email.save();
  console.log("data saved", savedData);
};

export const getAllMails = async (req: Request, res: Response) => {
  console.log("get mail request arrived");
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token as string, secret as string);
    const {email }= decoded as JwtPayload;
    const data = await Email.find({senderId:email});
    console.log("emails sent by this email id", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};
