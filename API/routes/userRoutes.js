const express = require("express");
const router = express.Router();

const { findUserById } = require("../controller/userController");

// const {
//   authCheck,
//   isAuthenticated,
//   isAdmin,
// } = require("../middleware/auth_middleware");

//test route
// router.get(
//   "/profile/:userId",
//   authCheck,
//   isAuthenticated,
//   isAdmin,
//   (req, res) => {
//     res.json({
//       user: req.profile,
//     });
//   }
// );

//to check weather the is a pramerter of user_id in the route then we need to execute the
//findUserById method
router.param("userId", findUserById);

module.exports = router;
