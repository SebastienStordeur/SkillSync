import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "./users.model";

type UserSignup = {
  lastname: string;
  firstname: string;
  company: string;
  email: string;
  password: string;
};

/**
 * Registers a new user and saves it to the database.
 *
 * @param user - UserSignup object containing the user's information.
 * @returns - The newly registered user or an error object.
 * @throws - An error if the provided user data is invalid.
 */

export async function signup(user: UserSignup) {
  try {
    const { lastname, firstname, company, email, password } = user;

    if (company) {
      if (!email || !password) {
        throw new Error("Email and password are required.");
      }
    } else {
      if (!email || !password || !firstname || !lastname) {
        throw new Error("Email, password, firstname, and lastname are required.");
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser: any = new User({
      lastname: lastname.trim().length >= 2 ? lastname : null,
      firstname: firstname.trim().length >= 2 ? firstname : null,
      company,
      is_company: company ? true : false,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("Error during signup: ", error);
    throw error;
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
