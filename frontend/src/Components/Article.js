import React from "react";
import "./Articles.css";

const Article = ({ el }) => {
  return (
    <div className="article">
      <h4>{el.title}</h4>
      <p>{el.content}</p>
    </div>
  );
};

export default Article;
