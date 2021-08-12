import React, { useState } from "react";

const ArticleWithTask = ({ article }) => {
  const [warmerNeeded, setWarmerNeeded] = useState(false);
  const [articleNeeded, setArticleNeeded] = useState(false);

  const handleActivity = () => {
    setWarmerNeeded(!warmerNeeded);
    if (articleNeeded) setArticleNeeded(false);
  };

  return (
    <div className="article">
      <h3>{article.title}</h3>
      <button onClick={handleActivity}>
        {warmerNeeded ? "HIDE ACTIVITIES" : "SHOW ACTIVITIES"}
      </button>
      {warmerNeeded && (
        <div>
          <h5>{article.warmer}</h5>
          <button onClick={() => setArticleNeeded(!articleNeeded)}>
            {articleNeeded
              ? "DO NOT SHOW THE ARTICLE"
              : "READ MORE ABOUT THE TOPIC AND FIND USEFUL LINKS"}
          </button>
        </div>
      )}
      {warmerNeeded && articleNeeded && (
        <div>
          <p>{article.content}</p>
          <a href={article.originalURL} target="_blank">
            LINK TO THE ORIGINAL ARTICLE
          </a>
          <br />
          <a href={article.photoURL} target="_blank">
            LINK TO A PICTURE FOR EXTRA IDEAS
          </a>
        </div>
      )}
    </div>
  );
};

export default ArticleWithTask;
