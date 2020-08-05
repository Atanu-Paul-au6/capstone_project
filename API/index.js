//importing the packages
const express = require("express");
require("dotenv").config();

//importing the routes
const userRoutes = require("./routes/user");
//connecting the mongodb atlas cluster to the api
const connectDB = require("./db_conection");
connectDB();

//initilizing  the app
const app = express();

//setting up the route
app.use('/api',userRoutes);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Express server running on ${port}`);
});
