const mongoose = require("mongoose");
const usersSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    token: { type: String }
  },
  { timestamps: true }
);
const usersData = mongoose.model("Users", usersSchema);

module.exports = usersData;
