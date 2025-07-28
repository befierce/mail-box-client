import { Request, Response } from "express";
import { Email } from "../models/emailModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { error } from "console";

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

  try{const savedData = await email.save();
  console.log("data saved", savedData);
  res.status(200).json("email sent success");
}catch(error){
  console.log(error);
  res.status(400).json("email sending failed")
  }
};

export const getAllSentMails = async (req: Request, res: Response) => {
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



export const getAllRecievedMails = async (req: Request, res: Response) => {
  console.log("get mail request arrived");
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token as string, secret as string);
    const {email }= decoded as JwtPayload;
    const data = await Email.find({receiverId:email});
    console.log("emails recived by this email id", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};
