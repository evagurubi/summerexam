import React, { useState, useEffect } from "react";
import ArticleWithTask from "./ArticleWithTask";
import Loader from "../Loader/Loader";

const ArticlesWithTasks = () => {
  const [articleData, setArticleData] = useState(null);
  const [keywordSearch, setKeywordSearch] = useState(true);
  const [inputText, setInputText] = useState("");
  const [query, setQuery] = useState(`keyword=${inputText}`);

  const handleSearchBy = () => {
    setInputText("");
    setKeywordSearch(!keywordSearch);
    fetchData();
  };

  const handleSearch = (e) => {
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
    fetch(`/api/articles/withtasks?${query}`, requestOptions)
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
  }, [inputText, query]);

  return (
    <div className="articles">
      <button id="searchbybutton" onClick={handleSearchBy}>
        SEARCH BY
      </button>

      <input
        id="searchbyinput"
        placeholder={keywordSearch ? "KEYWORD" : "CONTENT"}
        onChange={handleSearch}
        value={inputText}
      />
      {articleData ? (
        articleData.map((el, i) => <ArticleWithTask key={i} article={el} />)
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default ArticlesWithTasks;
