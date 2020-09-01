const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    image_url: String,
    apply_url: String,
    ago: String,
    applicants: String,
    text: {
      type: String,
    },
    info: {
      type: String,
    },
    appliedAt: {
      type: Date,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model("Job", jobSchema);

module.exports = Job
