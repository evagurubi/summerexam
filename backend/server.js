const express = require("express");
const cors = require("cors");
const app = express();
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

//Import routes
const Route = require("./routes/Route");

//Middlewares
app.use(cors());
app.use(express.json());

//Route Middleware
app.use("/api", Route);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//err, req, res, next hibakezelő
module.exports = app;
