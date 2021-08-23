import React from "react";
import "./Articles.css";

const Article = ({ el }) => {
  // Visitors see only title and content of article (Visitors not logged in only see this)
  return (
    <div className="article">
      <h4>{el.title}</h4>
      <p>{el.content}</p>
    </div>
  );
};

export default Article;
