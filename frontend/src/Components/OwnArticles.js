import React from "react";
import { useState, useEffect } from "react";
import OwnArticle from "./OwnArticle";
import "./OwnArticles.css";

function OwnArticles() {
  const [ownData, setOwnData] = useState(null);

  const requestOptions = {
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem("JWT"),
    },
  };

  const fetchOwnData = () => {
    fetch("/api/ownarticles", requestOptions)
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
    <div>
      <div className="ownArticleList">
        {ownData &&
          ownData.map((item, i) => (
            <OwnArticle key={i} ownTask={item} fetchOwnData={fetchOwnData} />
          ))}
      </div>
    </div>
  );
}

export default OwnArticles;
