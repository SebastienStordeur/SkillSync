import mongoose, { now } from "mongoose";

const usersSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minLength: 2,
    maxLength: 40,
    default: null,
  },
  lastname: {
    type: String,
    minLength: 2,
    maxLength: 40,
    default: null,
  },
  company: {
    type: String,
    minLength: 2,
    default: null,
  },
  is_company: {
    type: Boolean,
    required: true,
    default: false,
  },
  email: {
    type: String,
    unique: true,
    maxLength: 200,
    required: true,
  },
  password: {
    type: String,
    minLength: 8,
    required: true,
  },
  applications: {
    type: Array,
    default: [],
  },
  created_at: {
    type: Date,
    default: now,
    required: true,
  },
  updated_at: {
    type: Date,
    default: now,
    required: true,
  },
});

export default mongoose.model("User", usersSchema);
