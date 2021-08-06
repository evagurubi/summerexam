const User = require("../services/user.service");
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const jwt_decode = require("jwt-decode");

exports.insert = (req, res) => {
  const code = req.body.code;
  /* const url = "https://oauth2.googleapis.com/token";

  const values = {
    code: code,
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    redirect_uri: "http://localhost:3000/login",
    grant_type: "authorization_code",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      const token = data.id_token;

      const decoded = jwt_decode(token);

      //console.log(decoded.sub);
      User.createUser(decoded);

      const myToken = jwt.sign(
        { id: decoded.sub, name: decoded.name, email: decoded.email },
        process.env.TOKEN_SECRET
      );
      //console.log(myToken);
      res.header("auth-token", token).send(myToken);
    });*/

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

  axios(options)
    .then((response) => {
      console.log(response.data);
      const token = response.data.id_token;
      // console.log(token);

      const decoded = jwt_decode(token);

      //console.log(decoded.sub);
      User.createUser(decoded);

      const myToken = jwt.sign(
        { id: decoded.sub, name: decoded.name, email: decoded.email },
        process.env.TOKEN_SECRET
      );
      //console.log(myToken);
      res.header("auth-token", token).send(myToken);
    })
    .catch((error) => console.log("error"));
};
