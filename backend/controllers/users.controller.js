const User = require("../services/user.service");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const jwt_decode = require("jwt-decode");

//Login
exports.insert = async (req, res) => {
  //sends code posted from frontend to google for authorization
  const code = req.body.code;
  //console.log(code);
  const options = {
    url: "https://oauth2.googleapis.com/token",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      code: code,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/login",
      grant_type: "authorization_code",
    },
  };

  const response = await axios(options);

  const token = response.data.id_token;
  // console.log(token);

  const decoded = jwt_decode(token);
  //console.log(decoded);
  //Hardcoded adminRights for me
  let adminRights;
  if (decoded.sub === "117490664349062974708") adminRights = true;
  else adminRights = false;

  //Userinfo given to service to deal with DB
  await User.createUser(decoded, adminRights);

  //Signed token is sent to frontend in header
  const myToken = jwt.sign(
    {
      id: decoded.sub,
      name: decoded.name,
      email: decoded.email,
      isAdmin: adminRights,
    },
    process.env.TOKEN_SECRET
  );
  //console.log(myToken);
  res.header("auth-token", token).send(myToken);
};

//Gets user authorization from header to remove it from DB
exports.removeUser = (req, res) => {
  const decoded = jwt_decode(req.header("auth-token"));
  //console.log(decoded);
  User.removeUser(decoded.id).then(() => {
    res.status(204).send({});
  });
};

//Sends back account info to user
exports.listUser = (req, res) => {
  //console.log(req.header("auth-token"));
  const decoded = jwt_decode(req.header("auth-token"));

  User.listUser(decoded.id).then((result) => {
    //console.log("result:", result);
    res.status(200).send(result);
  });
};
