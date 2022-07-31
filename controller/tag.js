const Tag = require("../models/tag");
const slugify = require("slugify");

exports.createTag = (req, res) => {
  Tag.findOne({ name: req.body.name }).exec((err, tag) => {
    if (tag) {
      return res.status(404).json({ error: "Tag already exist" });
    } else {
      const name = req.body.name;
      const slug = slugify(name).toLowerCase();
      const tag = new Tag({ name, slug });
      tag.save();
      res.status(200).json({ message: "Tag Saved" });
    }
  });
};

exports.allTag = (req, res) => {
  Tag.find({}).exec((err, tag) => {
    if (tag.length) {
      return res.status(200).json(tag);
    } else {
      return res.status(404).json({ error: "No tags found" });
    }
  });
};

exports.readTag = (req, res) => {
  let slug = req.params.slug;
  Tag.findOne({ slug: slug }).exec((err, tag) => {
    if (tag) {
      return res.status(200).json(tag);
    } else {
      return res.status(404).json({ error: "No Tag Found" });
    }
  });
};

exports.deleteTag = (req, res) => {
  let slug = req.params.slug;
  Tag.findOneAndDelete({ slug: slug }).exec((err, msg) => {
    if (err) {
      return res.status(404).json({ error: "Tags not found" });
    } else {
      return res.status(200).json({ message: "Tag deleted" });
    }
  });
};
