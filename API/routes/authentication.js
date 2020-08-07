const express = require("express");
const router = express.Router();

//importing the constructor method
const { sayHi, register, login, logout } = require("../controller/authentication");
const { userSignUpValidator } = require("../helper/validator");
const { authCheck } = require("../middleware/auth_middleware");

router.get("/", sayHi);
router.post("/register", userSignUpValidator, register);
router.post("/login", login);
router.get("/logout", logout);

//protected route middleware check
router.get("/hi", authCheck, (req, res) => {
  res.status(200).json({ message: "HI" });
});

module.exports = router;
