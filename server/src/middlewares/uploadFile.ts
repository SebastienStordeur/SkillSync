import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import multer, { FileFilterCallback } from "multer";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});

const fileFilter = (req: Express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"));
  }
};

const upload = multer({
  storage,
  fileFilter,
}).single("file");

interface File {
  id: string;
  filename: string;
  mimetype: string;
  path: string;
}
