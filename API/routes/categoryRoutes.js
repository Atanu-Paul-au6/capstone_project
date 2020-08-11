const express = require("express");
const router = express.Router();

//importing the constructor method
const {
  create,
  findCategoryById,
  getSingleCategory,
  getAllCategory,
  updateSingleCategory,
  deleteSingleCategory,
} = require("../controller/categoryController");
const { findUserById } = require("../controller/userController");
const {
  isLoggedIn,
  isAuthenticated,
  isAdmin,
} = require("../middleware/auth_middleware");

//get routes
router.get("/category", getAllCategory);
router.get("/category/:categoryId", getSingleCategory);

//post routes
router.post(
  "/category/create/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  create
);

router.put(
  "/category/:categoryId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  updateSingleCategory
);

router.delete(
  "/category/:categoryId/:userId",
  isLoggedIn,
  isAuthenticated,
  isAdmin,
  deleteSingleCategory
);

//findUserById method
router.param("userId", findUserById);

//findCategoryById method
router.param("categoryId", findCategoryById);

//protected route middleware check
// router.get("/hi", authCheck, (req, res) => {
//   res.status(200).json({ message: "HI" });
// });

module.exports = router;
