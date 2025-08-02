import mongoose from "mongoose";
const MONGO_URL = process.env.MONGO_URL as string;

console.log("mongo url", MONGO_URL);
const connectDB = async () => {
  try {
    const conection = await mongoose.connect(
      MONGO_URL
    );
    console.log("connected to mongoDB");
  } catch (error) {
    console.error("mongodb connection error", error);
  }
};

export default connectDB;
