import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    maxLength: 200,
  },
  password: {
    type: String,
    required: true,
  },
});

export default mongoose.model("User", usersSchema);
