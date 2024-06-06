const mongoose = require("mongoose");
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [4, "Please enter more than 4 characters!"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: Number,
  place: String,
  address: String,
  gender: {
    type: String,
    enum: {
      values: ["male", "female", "others"],
      message: "{VALUE} is not supported",
    },
  },
  imageUrl: String,
},{
  timestamps: true
});
const StudentModel = mongoose.model("Students", StudentSchema);
module.exports = StudentModel;
