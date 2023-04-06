import mongoose, { now } from "mongoose";

const jobsSchema = new mongoose.Schema({
  title: {
    type: String,
    maxLength: 500,
    minLength: 5,
    required: true,
  },
  description: {
    type: String,
    required: true,
    minLength: 100,
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

  still_accept: {
    type: Boolean,
    default: true,
    required: true,
  },
  applicant_number: {
    type: Array,
    default: [],
  },
  extra: {
    remote: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: "Full time",
    },
    vacations: {
      type: Number,
      default: 0,
    },
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
