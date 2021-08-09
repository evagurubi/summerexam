import React, { useState, useEffect } from "react";

const Login = () => {
  const code = new URL(window.location.href).searchParams.get("code");

  const token = { code: code };

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(token),
    };

    fetch("/api/login", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        localStorage.setItem("JWT", data);
        window.location.href = "/articleswithtasks";
      });
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Login;
