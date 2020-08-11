const User = require("../model/user");

//finding one user by id middleware function
exports.findUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    req.profile = user;
    next();
  });
};

//@desc     Get user profile data route
//@route    GET /api/profile/:userId
//@access   protected
exports.getUserData = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

//@desc     Update user profile data route
//@route    PUT /api/profile/:userId
//@access   protected
exports.updateUserData = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Unauthorized User",
        });
      }
      user.hashed_password = undefined;
      user.salt = undefined;
      res.status(200).json(user);
    }
  );
};
