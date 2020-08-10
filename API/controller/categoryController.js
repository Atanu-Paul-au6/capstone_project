const Category = require("../model/category");
const { errorHandler } = require("../helper/errorHandler");

//find catergory by id middleware
exports.findCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({ error: "No Category found" });
    }
    req.category = category;
    next();
  });
};

//@desc     Get single category data route
//@route    GET /api/category/:categoryId
//@access   public
exports.getSingleCategory = (req, res) => {
  return res.status(200).json(req.category);
};

//@desc     Get all category data route
//@route    GET /api/category
//@access   public
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.status(200).json(data);
  });
};

//@desc     Category create route
//@route    POST /api/category/create/:userId
//@access   protected
exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.status(201).json({ data });
  });
};

//@desc     Category update route
//@route    PUT /api/category/:categoryId/:userId
//@access   protected
exports.updateSingleCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.status(200).json(data);
  });
};

//@desc     Category delete route
//@route    DELETE /api/category/:categoryId/:userId
//@access   protected
exports.deleteSingleCategory = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.status(200).json({ message: "Category Deleted" });
  });
};
