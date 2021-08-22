const jwt = require("jsonwebtoken");

//Checks if user has proper authorization for request by verifying auth-token in header
module.exports = function (req, res, next) {
  console.log("here");
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Access denied");

  try {
    //console.log(req);
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).text("Invalid token.");
  }
};
