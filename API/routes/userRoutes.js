const express = require("express");
const router = express.Router();

const {
  findUserById,
  getUserData,
  updateUserData,
  getPurchaseHistory
} = require("../controller/userController");

const {
  isLoggedIn,
  isAuthenticated,
} = require("../middleware/auth_middleware");

router.get("/profile/:userId", isLoggedIn, isAuthenticated, getUserData);

router.get(
  "/profile/purchase/history/:userId",
  isLoggedIn,
  isAuthenticated,
  getPurchaseHistory
);

router.put("/profile/:userId", isLoggedIn, isAuthenticated, updateUserData);

//to check weather the is a pramerter of user_id in the route then we need to execute the
//findUserById method
router.param("userId", findUserById);

module.exports = router;
