//importing the packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const cors = require("cors");
require("dotenv").config();

//importing the routes
const authRoutes = require("./routes/authentication");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoute");
const paymentRoute = require("./routes/braintreegateway");
const orderRoutes = require("./routes/orderRoutes");

//connecting the mongodb atlas cluster to the api
const connectDB = require("./db_conection");
connectDB();

//initilizing  the app
const app = express();

//setting up the middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(morgan("dev"));

//setting up the route
app.use(
  authRoutes,
  userRoutes,
  categoryRoutes,
  productRoutes,
  paymentRoute,
  orderRoutes
);
// app.use("/api", userRoutes);
// app.use("/api", categoryRoutes);
// app.use("/api", productRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Express server running on ${port}`);
});
