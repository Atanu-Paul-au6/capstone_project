const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

const Product = require("../model/product");
const { errorHandler } = require("../helper/errorHandler");

//middleware function to search a product by id
exports.findProductById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .exec((err, product) => {
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
//@route    DELETE /api/product/:productId/:userId
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

//@desc     Product update route
//@route    PUT /api/product/:productId/:userId
//@access   protected
exports.updateSingleProduct = (req, res) => {
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

    let product = req.product;
    product = _.extend(product, fields);

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

/*
methods to select and return product based on the highest number sold i.e. Most Sold Product
for that the url parameter coming form the front end will be:
/product?sortBy=sold&orderby=desc&limt=4

methods to select and return product based on new arival
for that the url parameter coming form the front end will be:
/product?sortBy=createdAt&orderby=desc&limt=4

if no prameter are sent form the url then we send all the products
*/

//@desc     Get all product route
//@route    GET /api/product
//@access   public
exports.getAllProducts = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 10;

  Product.find()
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};
/**
 *  this method will work by selecting the category id of the current product in the request body
 * and fetch all the other products having the same category id
 */

//@desc     Get related product route
//@route    GET /api/product/related/:productId
//@access   public

exports.getRelatedProduct = (req, res) => {
  let limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 2;

  Product.find({ _id: { $ne: req.product }, category: req.product.category })
    .limit(limit)
    .populate("category", "_id name")
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({ error: "No related product found" });
      }
      res.json(products);
    });
};

/**
 * this method will fetch all the categories that currently have products attached to them
 */
//@desc     Get categories in use route
//@route     GET /api/products/categories
//@access    public
exports.getAllProductCategory = (req, res) => {
  Product.distinct("category", {}, (err, category) => {
    if (err) {
      return res.status(400).json({ error: "No categories found" });
    }
    res.json(category);
  });
};

/**
 * list products by search
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
exports.listBySearch = (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = parseInt(req.body.limit) ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        // gte -  greater than price [0-10]
        // lte - less than
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  Product.find(findArgs)
    .select("-photo")
    .populate("category")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json({
        size: data.length,
        data,
      });
    });
};

/**
 * a middleware function to fetch and send the current product image
 */
exports.getProductImage = (req, res, next) => {
  // if (req.product.photo.data) {
  //   let data = req.product.photo.data;
  //   let buffer = new Buffer(data, "base64");
  //   res.set("Content-Type", req.product.photo.contentType);
  //   res.send(buffer);
  // }
  if (req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  const query = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }

    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(200).json(products);
    }).select("-photo");
  }
};

exports.updateStock = (req, res, next) => {
  let prodcutOptions = req.body.order.products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { $inc: { quantity: -item.count, sold: +item.count } },
      },
    };
  });
  Product.bulkWrite(prodcutOptions, {}, (error, product) => {
    if (error) {
      return res.status(400).json({
        error: "Stock could not be updated",
      });
    }
    next();
  });
};
