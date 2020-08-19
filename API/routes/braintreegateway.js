const express = require("express");
const router = express.Router();

const {
  isLoggedIn,
  isAuthenticated,
} = require("../middleware/auth_middleware");

const { findUserById } = require("../controller/userController");

const { generateToken } = require("../controller/braintreeController");

router.get(
  "/payment/getToken/:userId",
  isLoggedIn,
  isAuthenticated,
  generateToken
);

router.param("userId", findUserById);

module.exports = router;
