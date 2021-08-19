const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");
const errorHandler = require("./middlewares/errorHandler");

//Import routes
const userRoute = require("./routes/userRoutes");
const holidayRoute = require("./routes/holidayRoutes");
const articleRoute = require("./routes/articleRoutes");

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, access-control-allow-origin"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

//Can post from frontend
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

//Middlewares
app.use(cors(corsOptions));
app.use(express.json());

//Test
app.get("/api", (req, res) => {
  res.status(200).json({ message: "We are on home" });
});

//Route Middleware
app.use("/api/account", userRoute);
app.use("/api/holidays", holidayRoute);
app.use("/api/articles", articleRoute);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//err, req, res, next hibakezelő
app.use(errorHandler);

module.exports = app;
