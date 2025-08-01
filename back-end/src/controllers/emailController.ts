import { Request, Response } from "express";
import { Email } from "../models/emailModel";
import jwt, { JwtPayload } from "jsonwebtoken";
import { error } from "console";

const secret = process.env.jwt_secret;

export const getNewWmail = async (req: Request, res: Response) => {
  console.log("request arrived");
  const token = req.headers.authorization?.split(" ")[1];
  console.log("token", token);
  const decoded = jwt.verify(token as string, secret as string);
  const { email } = decoded as JwtPayload;

  console.log(decoded);
  try {
    const result = await Email.find({
      receiverId: email,
      isFetchedByReceiver: false,
    });
    try {
      const result = await Email.updateMany(
        { receiverId: email, isFetchedByReceiver: false },
        { $set: { isFetchedByReceiver: true } }
      );
    } catch (err) {
      console.log(
        "error updating the user data with isfetchde by the reciever"
      );
    }
    res.status(200).json(result);
  } catch (err) {
    console.log("error fethcing new mail", err);
    res.status(400).json({ message: "error fetching new emails" });
  }
};

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

  try {
    const savedData = await email.save();
    console.log("data saved", savedData);
    res.status(200).json("email sent success");
  } catch (error) {
    console.log(error);
    res.status(400).json("email sending failed");
  }
};

export const getAllSentMails = async (req: Request, res: Response) => {
  console.log("get mail request arrived");
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token as string, secret as string);
    const { email } = decoded as JwtPayload;
    const data = await Email.find({ senderId: email, senderDeleted: false });
    console.log("emails sent by this email id", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const isReadByReciever = async (req: Request, res: Response) => {
  console.log("request arrived");
  const emailOfReciever = req.params.email;
  const idOfMailReadInInbox = req.body.id;

  console.log("hello", emailOfReciever, idOfMailReadInInbox);

  try {
    const response = await Email.updateOne(
      { _id: idOfMailReadInInbox, receiverId: emailOfReciever },
      { $set: { isReadByReciever: true } }
    );
    console.log(response);
    res.status(200).json({ message: "meal read update success" });
  } catch (err) {
    res.status(400).json({ message: "error updating selected email" });
  }
};

export const isReadBySender = async (req: Request, res: Response) => {
  console.log("request arrived");
  const emailOfSender = req.params.email;
  const idOfMailReadInSentbox = req.body.id;

  console.log("hello", emailOfSender, idOfMailReadInSentbox);

  try {
    const response = await Email.updateOne(
      { _id: idOfMailReadInSentbox, senderId: emailOfSender },
      { $set: { isReadBySender: true } }
    );
    console.log(response);
    res.status(200).json({ message: "meal read update success" });
  } catch (err) {
    res.status(400).json({ message: "error updating selected email" });
  }
};

export const getAllRecievedMails = async (req: Request, res: Response) => {
  console.log("get mail request arrived");
  const token = req.headers.authorization?.split(" ")[1];
  try {
    const decoded = jwt.verify(token as string, secret as string);
    const { email } = decoded as JwtPayload;
    const data = await Email.find({
      receiverId: email,
      recieverDeleted: false,
    });
    await Email.updateMany(
      {
        receiverId: email,
        recieverDeleted: false,
        isFetchedByReceiver: false,
      },
      { $set: { isFetchedByReceiver: true } }
    );
    console.log("emails recived by this email id", data);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
};

export const deleteMailsOfSender = async (req: Request, res: Response) => {
  console.log("soft delete req arrived");
  // console.log(req.params.email);
  const emailOfConcernSender = req.params.email;
  const idOfMailToBeSoftDeleted = req.body.id;
  console.log(idOfMailToBeSoftDeleted);
  try {
    const result = await Email.updateOne(
      { _id: idOfMailToBeSoftDeleted, senderId: emailOfConcernSender },
      { $set: { senderDeleted: true } }
    );
    console.log("response after operation delete", result);
    res.status(200).json({ message: "email deletion success" });
  } catch (err) {
    console.log(err);
  }
};

export const deleteMailsOfReciever = async (req: Request, res: Response) => {
  console.log("request arrived to delete recieved messages");
  const emailOfConcernReciever = req.params.email;
  const idOfEmailToBeSoftDeleted = req.body.id;
  try {
    const result = await Email.updateOne(
      {
        _id: idOfEmailToBeSoftDeleted,
        receiverId: emailOfConcernReciever,
      },
      { $set: { recieverDeleted: true } }
    );
    console.log("result after ender id deletion", result);
    res.status(200).json({ message: "email deletion success" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "error deleting messsage" });
  }
};
