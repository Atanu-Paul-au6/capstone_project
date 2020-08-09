const express = require("express");
const router = express.Router();

//importing the constructor method
const {
  create,
  findProductById,
  getSingleProduct,
  deleteSingleProduct,
} = require("../controller/productController");
const { findUserById } = require("../controller/userController");
const {
  isLoggedIn,
  isAuthenticated,
  isAdmin,
} = require("../middleware/auth_middleware");

//get routes
router.get("/product/:productId", getSingleProduct);
//post routes
router.post(
  "/product/create/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  create
);

router.delete(
  "/product/:productId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteSingleProduct
);

//findUserById method
router.param("userId", findUserById);

//findPeoductById method
router.param("productId", findProductById);

//protected route middleware check
// router.get("/hi", authCheck, (req, res) => {
//   res.status(200).json({ message: "HI" });
// });

module.exports = router;
