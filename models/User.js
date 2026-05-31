const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
  },
  passowrd: {
    type: String,
    trim: true,
    require: true,
    select: false,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
