import { Schema, Types,model } from "mongoose";

interface iEmail {
  senderId: string;
  receiverId: string;
  subject: string;
  body: string;
  sentAt?: Date;
  updatedAt?: Date;
  senderDeleted:boolean;
  recieverDeleted:boolean;
  isReadBySender:boolean;
  isReadByReciever:boolean;
}

const emailSchema = new Schema<iEmail>(
  {
    senderId: { type: String, required: true },
    receiverId: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    senderDeleted: {type: Boolean, default: false},
    recieverDeleted: {type: Boolean, default:false},
    isReadBySender:{type:Boolean, default:false},
    isReadByReciever:{type:Boolean, default:false}
  },
  { timestamps: { createdAt: "sentAt" } }
);


export const Email = model<iEmail>("Email",emailSchema)