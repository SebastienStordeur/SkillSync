import { Request } from "express";
import jwt from "jsonwebtoken";

export default function authenticateToken(req: Request) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    throw new Error("No token has been provided");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY!);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
