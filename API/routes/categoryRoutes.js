const express = require("express");
const router = express.Router();

//importing the constructor method
const { create } = require("../controller/categoryController");
const { findUserById } = require("../controller/userController");
const {
  isLoggedIn,
  isAuthenticated,
  isAdmin,
} = require("../middleware/auth_middleware");

//get routes

//post routes
router.post(
  "/category/create/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  create
);

//findUserById method
router.param("userId", findUserById);


//protected route middleware check
// router.get("/hi", authCheck, (req, res) => {
//   res.status(200).json({ message: "HI" });
// });

module.exports = router;
