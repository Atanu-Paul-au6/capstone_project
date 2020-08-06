//importing the models
const User = require("../model/user");
const { errorHandler } = require("../helper/dbErrorHandler");

exports.sayHi = (req, res) => {
  res.status(200).json({ message: "Welcome To Stop and Shop API" });
};

exports.register = async (req, res) => {
  console.log(req.body);
  const user = new User(req.body);
  console.log(user);

  await user.save((err, user) => {
    if (err) {
      return res.status(400).json({ error: errorHandler(err) });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.status(201).json({ user });
  });
};

