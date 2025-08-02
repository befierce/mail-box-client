import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL as string;

console.log("mongo url", MONGO_URL);

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URL);
    console.log(" Connected to MongoDB:", connection.connection.name);
  } catch (error) {
    console.error(" MongoDB connection error:", error);
  }
};

export default connectDB;
