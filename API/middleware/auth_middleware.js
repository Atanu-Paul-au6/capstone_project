const expressJwt = require("express-jwt"); //to authorize the generated token

exports.isLoggedIn = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth._id;
  console.log(user);
  if (!user) {
    return res.status(403).json({ error: "Unauthorized user" });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({ error: "Access Denied Not an ADMIN" });
  }
  next();
};
