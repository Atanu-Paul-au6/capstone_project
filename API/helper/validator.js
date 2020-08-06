exports.userSignUpValidator = (req, res, next) => {
  req.check("name", "Please Enter Name").notEmpty();
  req.check("email", "Please Enter Email ").notEmpty();
  req.check("password", "Please EnterPassword").notEmpty();

  req
    .check("email")
    .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .withMessage("Please enter a vaild Email Address");

  req
    .check("password")
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).(?=.*[*.!@$%^&]).{5,}$/gm)
    .withMessage(
      "Password length must be at least 6 character long must have a special character from *.!@$%^& must have at least one small letter from a-z and one capital letter from A-Z"
    );
  const errors = req.validationErrors();
  if (errors) {
    const err = errors.map((error) => error.msg)[0];
    return res.status(400).json({ error: err });
  }
  next();
};
