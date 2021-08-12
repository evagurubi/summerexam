import React, { useState, useEffect } from "react";
import Article from "./Article";

const Articles = () => {
  const [data, setData] = useState([]);
  const [pageCounter, setPageCounter] = useState(0);

  const fetchData = () => {
    fetch(`/api/articles/?page=${pageCounter}`)
      .then((response) => response.json())
      .then((newdata) => {
        setData([...data, ...newdata]);
        console.log(data);
      });
  };

  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return function cleanup() {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [pageCounter]);

  useEffect(() => {
    fetchData();
    console.log(
      document.documentElement.clientHeight,
      document.documentElement.scrollTop,
      document.documentElement.offsetHeight
    );
  }, [pageCounter]);

  const infiniteScroll = () => {
    if (
      document.documentElement.clientHeight +
        document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      let newPage = pageCounter;

      newPage++;

      setPageCounter(newPage);
    }
  };

  return (
    <div className="articles">
      {data.length > 0 ? (
        data.map((el, i) => <Article key={i} el={el} />)
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Articles;
