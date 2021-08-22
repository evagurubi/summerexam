import React, { useEffect } from "react";
import Loader from "../Loader/Loader";

const Login = () => {
  //Code parameter is gained from URL and sent to backend in post request for google authentication. Logged in users are sent back to articles with tasks page
  const code = new URL(window.location.href).searchParams.get("code");

  const token = { code: code };

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(token),
    };

    fetch("http://localhost:5000/api/account/login", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        localStorage.setItem("JWT", data);
        window.location.href = "/articleswithtasks";
      });
  }, []);

  return (
    <div>
      <Loader />
    </div>
  );
};

export default Login;
