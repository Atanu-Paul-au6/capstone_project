const express = require("express");
const router = express.Router();

//importing the constructor method
const {
  create,
  findProductById,
  getSingleProduct,
  getAllProducts,
  getRelatedProduct,
  getAllProductCategory,
  deleteSingleProduct,
  updateSingleProduct,
  listBySearch,
  getProductImage,
  listSearch,
} = require("../controller/productController");
const { findUserById } = require("../controller/userController");
const {
  isLoggedIn,
  isAuthenticated,
  isAdmin,
} = require("../middleware/auth_middleware");

//get routes
router.get("/product", getAllProducts);
router.get("/products/search", listSearch);
router.get("/product/:productId", getSingleProduct);
router.get("/product/related/:productId", getRelatedProduct);
router.get("/products/categories", getAllProductCategory);
router.get("/product/photo/:productId", getProductImage);

//post routes
router.post(
  "/product/create/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  create
);
router.post("/products/search", listBySearch);

router.delete(
  "/product/:productId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteSingleProduct
);

router.put(
  "/product/:productId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  updateSingleProduct
);

//findUserById method
router.param("userId", findUserById);

//findPeoductById method
router.param("productId", findProductById);

module.exports = router;
