import React, { useState } from "react";
import "../../src/App.css";

const ArticleWithTask = ({ el }) => {
  return (
    <div className="article">
      <h4>{el.title}</h4>
      <p>{el.content}</p>
      <h6>{el.warmer}</h6>
    </div>
  );
};

export default ArticleWithTask;
