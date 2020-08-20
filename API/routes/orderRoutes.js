const express = require("express");
const router = express.Router();

const {
  isLoggedIn,
  isAuthenticated,
} = require("../middleware/auth_middleware");

const { findUserById } = require("../controller/userController");
const { createOrder } = require("../controller/orederController");

router.post("/order/create/:userId", isLoggedIn, isAuthenticated, createOrder);

router.param("userId", findUserById);

module.exports = router;
