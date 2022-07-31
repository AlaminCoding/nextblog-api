const User = require("../models/user");

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  return res.json(req.profile);
};

exports.readAll = (req, res) => {
  User.find({}).exec((err, user) => {
    if (!user) {
      return res.status(404).json({ error: "No User Found" });
    } else {
      return res.status(200).json(user);
    }
  });
};

exports.remove = (req, res) => {
  User.findOneAndDelete({ username: req.params.username }).exec((err, user) => {
    if (!user) {
      return res.status(404).json({ error: "No User Found" });
    } else {
      if (user.role === 0) {
        return res.status(200).json({ message: "User Deleted" });
      } else {
        return res.status(404).json({ error: "You can not delete yourself" });
      }
    }
  });
};

exports.update = (req, res) => {
  User.findOneAndUpdate({ username: req.params.username }).exec((err, user) => {
    if (!user) {
      return res.status(404).json({ error: "No user found" });
    } else {
      return "UPDATE WORK LATER";
    }
  });
};
