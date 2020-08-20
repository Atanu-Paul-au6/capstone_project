const { Order, CartItem } = require("../model/order");
const { errorHandler } = require("../helper/errorHandler");

exports.createOrder = (req, res) => {
  // console.log("ORDER IS:", req.body);
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((error, data) => {
    if (error) {
      return res.status(400).json({
        error: errorHandler(error),
      });
    }
    res.status(200).json(data);
  });
};
