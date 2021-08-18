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

//Middlewares
app.use(cors());
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
