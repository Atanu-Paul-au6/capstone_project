const expressJwt = require("express-jwt"); //to authorize the generated token

exports.authCheck = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
}
);
