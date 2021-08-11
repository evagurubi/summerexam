import React from "react";
import { useState, useEffect } from "react";

function OwnAccount({ setUser }) {
  const [myData, setMyData] = useState(null);

  const requestOptions = {
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem("JWT"),
    },
  };

  const fetchMyData = () => {
    fetch("/api/account", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMyData(data);
        console.log(data);
      });
  };

  const deleteAccount = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("JWT"),
      },
    };

    fetch(`/api/account`, options)
      .then((response) => response.text())
      .then(() => {
        localStorage.removeItem("JWT");
        setUser(null);
        window.location.href = "/";
      });
  };

  useEffect(() => {
    fetchMyData();
  }, []);

  return (
    <div>
      {myData && (
        <div>
          <p>Name: {myData.name}</p>
          <p>email: {myData.email} </p>
          <button onClick={deleteAccount}>Delete your account</button>
        </div>
      )}
    </div>
  );
}

export default OwnAccount;
