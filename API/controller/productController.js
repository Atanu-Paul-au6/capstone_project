const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const Product = require("../model/product");
const { errorHandler } = require("../helper/errorHandler");

//middleware function to search a product by id
exports.findProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({ error: "No Product found" });
    }
    req.product = product;
    next();
  });
};

//@desc     Get Single product details route
//@route    GET /api/product/:productId
//@access   public
exports.getSingleProduct = (req, res) => {
  req.product.photo = undefined;
  return res.status(200).json(req.product);
};

//@desc     Product create route
//@route    POST /api/product/create/:userId
//@access   protected
exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image Not uploaded" });
    }

    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({ error: "All form fields must be present" });
    }

    let product = new Product(fields);

    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res
          .status(400)
          .json({ error: "Image size cannot be more that 1Mb" });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, result) => {
      if (err) {
        return res.status(400).json({ error: errorHandler(err) });
      }
      res.status(201).json({ result });
    });
  });
};

//@desc     Product delete route
//@route    POST /api/product/:productId/:userId
//@access   protected
exports.deleteSingleProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    res.json({
      message: "Product Deleted",
    });
  });
};
