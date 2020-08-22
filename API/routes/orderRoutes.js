const express = require("express");
const router = express.Router();

const {
  isLoggedIn,
  isAuthenticated,
  isAdmin,
} = require("../middleware/auth_middleware");

const {
  findUserById,
  addOrderToHistory,
} = require("../controller/userController");

const {
  createOrder,
  getAllOrders,
  getStausValues,
  findOrderById,
  changeOrderStatus,
} = require("../controller/orederController");

const { updateStock } = require("../controller/productController");

router.post(
  "/order/create/:userId",
  isLoggedIn,
  isAuthenticated,
  addOrderToHistory,
  updateStock,
  createOrder
);

router.put(
  "/order/:orderId/status/:userId",
  isLoggedIn,
  isAuthenticated,
  changeOrderStatus
);

router.get(
  "/order/show/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  getAllOrders
);

router.get(
  "/order/status/values/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  getStausValues
);

router.param("userId", findUserById);
router.param("orderId", findOrderById);

module.exports = router;
