const express = require("express");
const cors = require("cors");
const app = express();

//Import routes
const Route = require("./routes/Route");

//Middlewares
app.use(express.json());

//Route Middleware
app.use("/api", Route);
app.use(cors());

module.exports = app;
