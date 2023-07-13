require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/connection");
const port = process.env.PORT || 8003;
const users = require("./models/userSchema");
const cors = require("cors");
const router = require("./routes/router");

app.use(cors());
app.use(express.json());

app.use(router);

//For starting the server
app.listen(port, () => {
  console.log(`server is start port number ${port}`);
});
