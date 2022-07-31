const User = require("../models/user");
const shortId = require("shortid");
const JWT = require("jsonwebtoken");
const { expressjwt: expressJWT } = require("express-jwt");

exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((err, user) => {
    if (user) {
      res.status(400).json({ error: "Email is Taken" });
    } else {
      const { name, email, password } = req.body;
      const username = shortId.generate();
      const profile = `${process.env.CLIENT_URL}/profile/${username}`;
      let newUser = new User({
        name,
        email,
        password,
        profile,
        username,
      });

      newUser.save((err, user) => {
        if (err) {
          return res.status(400).json({ error: err });
        } else {
          res.json({ message: "Signup Success! Please Signin" });
        }
      });
    }
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }).exec((err, user) => {
    // Check if user exist
    if (err || !user) {
      return res.status(400).json({ error: "User not exist. Please signup" });
    }
    // Autheticate Password
    if (!user.authenticate(password)) {
      return res.status(400).json({ error: "Wrong Password" });
    }
    //Token Generate
    const token = JWT.sign({ _id: user._id }, process.env.JWT_TOKEN, {
      expiresIn: "2d",
    });
    res.cookie("token", token, { expiresIn: "2d" });
    const { _id, username, name, email, role } = user;
    return res.json({
      token,
      user: { _id, username, name, email, role },
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Signout Done Successfully" });
};

// Protected Route
exports.requireSignin = expressJWT({
  secret: process.env.JWT_TOKEN,
  algorithms: ["HS256"],
});

exports.authMiddleware = (req, res, next) => {
  const userId = req.auth._id;
  User.findById({ _id: userId }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "User not found" });
    }
    req.profile = user;
    next();
  });
};

exports.adminMiddleWare = (req, res, next) => {
  const userId = req.auth._id;
  User.findById({ _id: userId }).exec((err, user) => {
    if (err || !user) {
      return res.json({ error: "User not found" });
    }
    if (user.role !== 1) {
      return res.json({ error: "Admin! Access Denied" });
    } else {
      req.profile = user;
      next();
    }
  });
};
