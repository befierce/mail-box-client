import { Schema, Types,model } from "mongoose";

interface iEmail {
  senderId: string;
  receiverId: string;
  subject: string;
  body: string;
  sentAt?: Date;
  updatedAt?: Date;
}

const emailSchema = new Schema<iEmail>(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: { createdAt: "sentAt" } }
);


export const Email = model<iEmail>("Email",emailSchema)