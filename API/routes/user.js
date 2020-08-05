const express = require("express");
const router = express.Router();

//importing the constructor method
const { sayHi } = require("../controller/user");

router.get("/", sayHi);

module.exports = router;
