import React, { useState, useEffect } from "react";
import "../../src/App.css";
import Article from "./Article";

const Articles = () => {
  const [data, setData] = useState(null);
  const [pageCounter, setPageCounter] = useState(0);

  const fetchData = () => {
    fetch(`/api/articles/?page=${pageCounter}`)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        console.log(data);
      });
  };

  useEffect(() => {
    fetchData();
    console.log(pageCounter);
  }, [pageCounter]);

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return function cleanup() {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [pageCounter]);

  const infiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      let newPage = pageCounter;
      newPage++;

      setPageCounter(newPage);
    }
  };

  return (
    <div className="articles">
      {data ? (
        data.map((el, i) => <Article key={i} el={el} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Articles;
