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
//connecting the mongodb atlas cluster to the api
const connectDB = require("./db_conection");
connectDB();

//initilizing  the app
const app = express();

//setting up the middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(morgan("dev"));
// app.use(cors());

//setting up the route
app.use("/api", authRoutes);
app.use("/api", userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Express server running on ${port}`);
});
