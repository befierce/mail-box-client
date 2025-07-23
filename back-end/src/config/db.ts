import mongoose from "mongoose";

const connectDB = async () => {
  try{
    const conection = await mongoose.connect("mongodb://localhost:27017/mail-box-client");
    console.log("connected to mongoDB");
  }catch(error){
    console.error("mongodb connection error",error)
  }
};


export default connectDB;
