const Category = require("../models/category");
const slugify = require("slugify");

// Create Category
exports.createCategory = (req, res) => {
  Category.findOne({ name: req.body.name }).exec((err, category) => {
    if (category) {
      return res.status(400).json({ error: "Category already exist" });
    } else {
      const { name } = req.body;
      const slug = slugify(name).toLowerCase();
      const newCategory = new Category({ name, slug });
      newCategory.save((err, category) => {
        if (err) {
          res.status(400).json({ error: err });
        } else {
          res.json(category);
        }
      });
    }
  });
};

//All Category
exports.allCategory = (req, res) => {
  Category.find({}).exec((err, category) => {
    if (!category.length) {
      res.status(404).json({ error: "Category Not Found" });
    } else {
      res.status(200).json({ category });
    }
  });
};

//Read Single Category
exports.readCategory = (req, res) => {
  let slug = req.params.slug;
  Category.findOne({ slug: slug }).exec((err, category) => {
    if (category) {
      return res.status(200).json(category);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  });
};

//Delete Category
exports.deleteCategory = (req, res) => {
  let id = req.params.id;
  Category.findByIdAndDelete(id).exec((err, category) => {
    if (err) {
      res.status(404).json({ error: "Category Not Found" });
    } else {
      res.status(200).json({ message: "Category Deleted" });
    }
  });
};
