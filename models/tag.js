const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    unique: true,
    lowercase: true,
  },
  slug: {
    type: String,
  },
});

module.exports = mongoose.model("Tag", tagSchema);
