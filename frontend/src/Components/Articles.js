import React, { useState, useEffect } from "react";
import "../../src/App.css";
import Article from "./Article";

const Articles = () => {
  const [data, setData] = useState(null);

  const fetchData = () => {
    fetch("/api/articles")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="articles">
      {data && data.map((el, i) => <Article key={i} el={el} />)}
    </div>
  );
};

export default Articles;
