const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyname: { type: String, required: true },
    jobrole: { type: String, required: true },
    ctc: { type: String },
    impDate: { type: Date },
    type: { type: String, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["applied", "interview", "reject", "offer"],
      default: "applied",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Job", jobSchema);
