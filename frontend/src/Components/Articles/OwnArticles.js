import React from "react";
import { useState, useEffect } from "react";
import OwnArticle from "./OwnArticle";
import Loader from "../Loader/Loader";
import "./Articles.css";

function OwnArticles() {
  const [ownData, setOwnData] = useState(null);

  const requestOptions = {
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem("JWT"),
    },
  };

  const fetchOwnData = () => {
    fetch("http://localhost:5000/api/articles/own", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setOwnData(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchOwnData();
  }, []);

  return (
    <div className="articles">
      <div className="articlescontent">
        <h2>Update or delete your articles, as you wish</h2>
        <div className="articleitems">
          {ownData ? (
            ownData.map((item, i) => (
              <OwnArticle key={i} ownTask={item} fetchOwnData={fetchOwnData} />
            ))
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnArticles;
