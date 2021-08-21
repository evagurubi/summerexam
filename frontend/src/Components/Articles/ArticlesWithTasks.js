import React, { useState, useEffect } from "react";
import ArticleWithTask from "./ArticleWithTask";
import Loader from "../Loader/Loader";

const ArticlesWithTasks = () => {
  const [articleData, setArticleData] = useState(null);
  const [keywordSearch, setKeywordSearch] = useState(true);
  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState("");

  const handleSearchBy = () => {
    setInputText("");
    setQuery("");
    setKeywordSearch(!keywordSearch);
  };

  const handleSearch = () => {
    if (keywordSearch) {
      setQuery(`keyword=${inputText}`);
    } else {
      setQuery(`content=${inputText}`);
    }
  };

  const requestOptions = {
    method: "GET",
    headers: {
      "auth-token": localStorage.getItem("JWT"),
    },
  };
  const fetchData = () => {
    fetch(
      `http://localhost:5000/api/articles/withtasks?${query}`,
      requestOptions
    )
      .then((res) => {
        if (res.status !== 200) return "It is still loading";

        return res.json();
      })
      .then((json) => {
        setArticleData(json);

        //console.log(json);
      });
  };

  useEffect(() => {
    fetchData();
  }, [query, keywordSearch]);

  return (
    <div className="articles">
      <div id="inputdiv">
        <button id="searchbybutton" onClick={handleSearchBy}>
          SET YOUR SEARCH
        </button>

        <input
          id="searchbyinput"
          placeholder={keywordSearch ? "KEYWORD" : "CONTENT"}
          onInput={(e) => setInputText(e.target.value)}
          value={inputText}
        />
        <button id="searchbutton" onClick={handleSearch}>
          SEARCH
        </button>
      </div>
      {articleData ? (
        articleData.length === 0 ? (
          <h3 className="h3font">
            There is no article with the given conditions.
          </h3>
        ) : (
          articleData.map((el, i) => <ArticleWithTask key={i} article={el} />)
        )
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default ArticlesWithTasks;
