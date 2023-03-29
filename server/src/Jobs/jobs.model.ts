import mongoose, { now } from "mongoose";

const jobsSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 500,
    minLength: 15,
    required: true,
  },
  description: {
    type: String,
  },
  company: {
    type: String,
    minLength: 2,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    default: null,
  },
  remote: {
    type: Boolean,
    default: false,
  },
  still_accept: {
    type: Boolean,
    default: true,
    required: true,
  },
  applicant_number: {
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
  userId: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Job", jobsSchema);
