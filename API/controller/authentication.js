//importing the models
const User = require("../model/user");
const jwt = require("jsonwebtoken"); //to generate token on login
const { errorHandler } = require("../helper/errorHandler");

//@desc     Default welcome route
//@route    GET /api
//@access   public
exports.sayHi = (req, res) => {
  res.status(200).json({ message: "Welcome To Stop and Shop API" });
};

//@desc     register route
//@route    POST /api/register
//@access   public
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

//@desc     login route
//@route    POST /api/login
//@access   public
exports.login = (req, res) => {
  //finding the user based on email
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    //if eorror happens or user not found
    if (err || !user) {
      return res.status(400).json({
        error: "User not found, Please check email/password or Register",
      });
    }
    //if user found match email and encrypted password
    //for that we have a authenticate method in the user model

    if (!user.authenticate(password)) {
      return res
        .status(401)
        .json({ error: "Unauthorized User Email or Password Mismatch" });
    }

    //if user is authenticated then we generate a jwt token with id and seceret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //setting the token as 'jwttoken' in cookie with expier date of 1 week = 604800 sec
    res.cookie("jwttoken", token, { expire: new Date() + 604800 });
    //returning the response with loged in user data and token to the frontend
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
};

//@desc     logout route
//@route    GET /api/logout
//@access   protected

exports.logout = (req, res) => {
  res.clearCookie("jwttoken");
  res.json({ message: "Logged Out" });
};

