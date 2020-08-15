const express = require("express");
const router = express.Router();

//importing the constructor method
const {
  sayHi,
  register,
  login,
  logout,
} = require("../controller/authentication");
const { userSignUpValidator } = require("../helper/validator");
const { isLoggedIn } = require("../middleware/auth_middleware");

//get routes
router.get("/", sayHi);
router.get("/logout", logout);

//post routes
router.post("/register", userSignUpValidator, register);
router.post("/login", login);

//protected route middleware check
// router.get("/hi", (req, res) => {
//   res.status(200).json({ message: "HI" });
// });

module.exports = router;
