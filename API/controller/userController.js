const User = require("../model/user");
const { Order } = require("../model/order");
const { errorHandler } = require("../helper/errorHandler");
//finding one user by id middleware function
exports.findUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

//@desc     Get user profile data route
//@route    GET /api/profile/:userId
//@access   protected
exports.getUserData = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

//@desc     Update user profile data route
//@route    PUT /api/profile/:userId
//@access   protected
exports.updateUserData = async (req, res) => {
  //console.log(req.body)
  await User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Unauthorized User",
        });
      }
      // user.hashed_password = undefined;
      // user.salt = undefined;
      res.status(200).json(user);
    }
  );
};

//Note to self: push the order createdAt date in the purchase history array
exports.addOrderToHistory = (req, res, next) => {
  let purchaseHistory = [];
  req.body.order.products.forEach((product) => {
    purchaseHistory.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      quantity: product.count,
      transaction_id: req.body.order.transaction_id,
      amount: req.body.order.amount,
    });
  });

  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $push: { history: purchaseHistory } },
    { new: true },
    (err) => {
      if (err) {
        return res.status(400).json({
          error: "User purchase history not updated",
        });
      }
      next();
    }
  );
};

exports.getPurchaseHistory = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .sort("-createdAt")
    .exec((err, orders) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(200).json(orders);
    });
};
