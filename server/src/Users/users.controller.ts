import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./users.model";

type UserSignup = {
  email: string;
  password: string;
};

export async function signup(user: UserSignup) {
  try {
    const { email, password } = user;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: any = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    return error;
  }
}

export async function getUsers() {
  return await User.find();
}

export async function httpLogin(user: { email: string; password: string }) {
  try {
    const { email, password } = user;
    const foundUser = await User.findOne({ email }).select("+password");

    if (!foundUser) {
      return { success: false, message: "User not found", token: null };
    }

    const matchedPassword = await bcrypt.compare(password, foundUser.password);
    if (!matchedPassword) {
      return { success: false, message: "Wrong email/password combination", token: null };
    }

    const payload = { id: foundUser._id };
    const JWT_KEY = process.env.JWT_KEY!;
    const token = jwt.sign(payload, JWT_KEY, { expiresIn: "90d" });

    return { success: true, message: "Login successful", token };
  } catch (error) {
    console.log(error);
    return { success: false, message: "An error occurred during login", token: null };
  }
}

export async function httpGetUser(id: string) {
  try {
    //need to check if token
    const user = await User.findOne({ _id: id });
    return user;
  } catch (error) {}
}
