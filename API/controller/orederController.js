const { Order, CartItem } = require("../model/order");
const { errorHandler } = require("../helper/errorHandler");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
exports.findOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, o) => {
      if (err || !o) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      req.order = o;
      next();
    });
};
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
  const emailBody = {
    to: order.user.email,
    from: "stopandshopnoreply@gmail.com",
    subject: `Your Order is Placed`,
    html: `
    <strong>Hey ${req.profile.name}, Thank you for shopping with us.</strong>
    <p>Total products: ${order.products.length}</p>
    <p>Transaction ID: ${order.transaction_id}</p>
    <p>Order status: ${order.status}</p>
    <p>Product details:</p>
    <hr />
    ${order.products
      .map((p) => {
        return `<div>
                <p>Product Name: ${p.name}</p>
                <p>Product Price:₹ ${p.price}</p>
                <p>Product Quantity: ${p.count}</p>
        </div>`;
      })
      .join("--------------------")}
    <p>Total order cost:₹ ${order.amount}<p>
    <p>Thank your for shopping with us.</p>
`,
  };
  sgMail
    .send(emailBody)
    .then((sent) => console.log("SENT >>>> ", sent))
    .catch((err) => console.log("ERROR >>>> ", err));
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name address")
    .sort("-createdAt")
    .exec((error, order) => {
      if (error) {
        return res.status(400).json({
          error: errorHandler(error),
        });
      }
      res.status(200).json(order);
    });
};

exports.getStausValues = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.changeOrderStatus = (req, res) => {
  //console.log("this is hit");
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order1) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.status(200).json(order1);
    }
  );
};
