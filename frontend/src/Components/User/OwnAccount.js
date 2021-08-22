import React from "react";
import { useState, useEffect } from "react";
import Sydney from "../../Images/Sydney_australia.jpg";
import "./Account.css";

function OwnAccount({ setUser }) {
  const [myData, setMyData] = useState(null);
  //Logged-in user's account data fetched from backend
  const requestOptions = {
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem("JWT"),
    },
  };

  const fetchMyData = () => {
    fetch("http://localhost:5000/api/account", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setMyData(data);
        console.log(data);
      });
  };
  //User can delete own account by clicking on delete button
  const deleteAccount = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("JWT"),
      },
    };

    fetch(`http://localhost:5000/api/account`, options)
      .then((response) => response.text())
      .then((res) => {
        console.log(res);
        localStorage.removeItem("JWT");
        setUser(null);
        window.location.href = "/";
      });
  };

  useEffect(() => {
    fetchMyData();
  }, []);
  //Account data with Sydney scene in background
  return (
    <div className="accountcontainer">
      <img src={Sydney} id="sydneyimage" />
      <div className="account">
        {myData && (
          <div className="accountcontent">
            <p>Name: {myData.name}</p>
            <p>email: {myData.email} </p>
            <button id="accountbutton" onClick={deleteAccount}>
              Delete your account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnAccount;
