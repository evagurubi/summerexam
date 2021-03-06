import React from "react";
import { useState, useEffect } from "react";
import OwnArticle from "./OwnArticle";
import Loader from "../Loader/Loader";
import "./Articles.css";

function OwnArticles() {
  const [ownData, setOwnData] = useState(null);

  //Puts auth-token in headers for protected route. Will return user's own articles only
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
             });
  };

  useEffect(() => {
    fetchOwnData();
  }, []);

  return (
    <div className="articles">
      <div className="articlescontent">
        <div className="h2div">
          <h2>You can update or delete your own articles here.</h2>
        </div>
        <div className="articleitems">
          {ownData ? (
            ownData.length === 0 ? (
              <h5>You haven't posted anything yet.</h5>
            ) : (
              ownData.map((item) => (
                <OwnArticle
                  key={item._id}
                  ownTask={item}
                  fetchOwnData={fetchOwnData}
                />
              ))
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnArticles;
