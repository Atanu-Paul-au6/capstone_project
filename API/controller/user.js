exports.sayHi = (req, res) => {
  res.status(200).json({ message: "Testing controller 1" });
};
