const express = require("express");
const router = express.Router();

//importing the constructor method
const { sayHi, register } = require("../controller/user");
const {userSignUpValidator} = require("../helper/validator");

router.get("/", sayHi);
router.post("/register", userSignUpValidator, register);

module.exports = router;
