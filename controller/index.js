exports.root = (req, res) => {
  res.json({ time: Date().toString() });
};
