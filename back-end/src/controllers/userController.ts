import { Request, Response } from "express";
import { User } from "../models/userModel";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const secret = process.env.jwt_secret;

console.log("secretkey", secret);
export const createUser = async (req: Request, res: Response) => {
  try {
    // console.log("request as it is", req.body);

    const { enteredEmail, enteredPassword } = req.body;
    const encryptedPassword = await bcrypt.hash(enteredPassword, 10);

    const user = new User({
      email: enteredEmail,
      password: encryptedPassword,
    });

    const savedUser = await user.save();

    // const payload = { id: savedUser._id, email: savedUser.email };
    // const token = jwt.sign(payload,secret as string,{expiresIn:"1h"})
    // console.log("saved User token", savedUser,token);

    res.status(201).json({ message: " user saved sucess", savedUser });
  } catch (err) {
    console.error("User creation failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const userLogin = async (req: Request, res: Response) => {
  console.log("login request arrived", req.body);
  try {
    const { email, password } = req.body;

    
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    const isMatch = await bcrypt.compare(password, user.password.toString());

    if (!isMatch) {
      return res.status(401).json({ error: "password do not match" });
    }

    const payload = { id: user._id, email: user.email };

    const token = jwt.sign(payload, secret as string, { expiresIn: "1h" });

    res.status(200).json({ message: "login success", token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
