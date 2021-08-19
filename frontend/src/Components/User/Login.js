import React, { useEffect } from "react";

const Login = () => {
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
        console.log(data);
      });
  }, []);

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Login;
