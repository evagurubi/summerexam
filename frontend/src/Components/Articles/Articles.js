import React, { useState, useEffect } from "react";
import Article from "./Article";
import Loader from "../Loader/Loader";
import "./Articles.css";

const Articles = () => {
  const [data, setData] = useState([]);
  const [pageCounter, setPageCounter] = useState(0);

  const fetchData = () => {
    fetch(`http://localhost:5000/api/articles/?page=${pageCounter}`)
      .then((response) => response.json())
      .then((newdata) => {
        setData([...data, ...newdata]);
        // console.log(data);
      });
  };

//A further page is requested from the backend when scroll reaches bottom
  useEffect(() => {
    window.addEventListener("scroll", infiniteScroll);
    return function cleanup() {
      window.removeEventListener("scroll", infiniteScroll);
    };
  }, [pageCounter]);

  useEffect(() => {
    fetchData();

  }, [pageCounter]);

//If the element's CSS height is exceeded by the added height of the "useful" windowcontent and the number of pixels the element's content is scrolled vertically the page number is incremented by one 
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
      <div className="articlescontent">
        <div className="h2div">
          <h2>Authentic materials for your students</h2>
        </div>
        <div className="articleitems">
          {data.length > 0 ? (
            data.map((el, i) => <Article key={i} el={el} />)
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default Articles;
