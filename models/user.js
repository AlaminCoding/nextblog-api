const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
      unique: true,
      max: 32,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      max: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
    hashed_password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    role: {
      type: Number,
      default: 0,
    },
    profile: {
      type: String,
      required: true,
    },
    photo: {
      type: Buffer,
      contentType: String,
    },
    reset_paswword_link: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

userSchema.virtual("password").set(function (password) {
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
});

userSchema.methods = {
  authenticate: function (plainPassword) {
    return this.encryptPassword(plainPassword) === this.hashed_password;
  },
  encryptPassword: function (password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

module.exports = mongoose.model("User", userSchema);
