import React from "react";

const Article = ({ el }) => {
  return (
    <div className="article">
      <h4>{el.title}</h4>
      <h2>{el.content}</h2>
    </div>
  );
};

export default Article;
