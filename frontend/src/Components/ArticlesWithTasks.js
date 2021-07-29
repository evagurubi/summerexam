import React, { useState, useEffect } from "react";
import "../../src/App.css";
import ArticleWithTask from "./ArticleWithTask";

const ArticlesWithTasks = () => {
  const [articleData, setArticleData] = useState(null);
  const [keywordSearch, setKeywordSearch] = useState(true);
  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState("");

  const handleSearchBy = () => {
    setInputText("");
    setKeywordSearch(!keywordSearch);
    fetchData();
  };

  const searchHandler = (e) => {
    setInputText(e.target.value);
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
    fetch(`/api/articleswithtasks?${query}`, requestOptions)
      .then((res) => {
        if (res.status !== 200) return "It is still loading";

        return res.json();
      })
      .then((json) => {
        setArticleData(json);
        console.log(json);
      });
  };

  useEffect(() => {
    fetchData();
  }, [inputText]);

  return (
    <div className="articles">
      <button onClick={handleSearchBy}>Search by</button>

      <input
        placeholder={keywordSearch ? "KEYWORD" : "CONTENT"}
        onInput={searchHandler}
        value={inputText}
      ></input>
      {articleData &&
        articleData.map((el, i) => <ArticleWithTask key={i} article={el} />)}
    </div>
  );
};
export default ArticlesWithTasks;
