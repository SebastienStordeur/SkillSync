import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./users.model";

type UserSignup = {
  email: string;
  password: string;
};

/**
 *
 * @param user
 * @returns
 */
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

/**
 *
 * @param user
 * @returns
 */
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

/**
 * Get user by ID.
 * @param {string} id - User ID.
 * @returns {Promise} Resolves to the user if found, otherwise an error message.
 */

export async function httpGetUser(id: string) {
  try {
    const user = await User.findOne({ _id: id });

    if (!user) {
      return { success: false, message: "Cannot reach this user" };
    }

    return user;
  } catch (error) {
    return { success: false, message: "Error occured while fetching the user" };
  }
}
