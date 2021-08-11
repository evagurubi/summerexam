const User = require("../services/user.service");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const jwt_decode = require("jwt-decode");

exports.insert = async (req, res) => {
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

  // console.log("axiosresponse", response.data);
  const token = response.data.id_token;
  // console.log(token);

  const decoded = jwt_decode(token);
  //console.log(decoded);
  let adminRights;
  if (decoded.sub === "117490664349062974708") adminRights = true;
  else adminRights = false;

  await User.createUser(decoded, adminRights);

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
