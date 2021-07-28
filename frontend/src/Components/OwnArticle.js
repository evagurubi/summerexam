import React from "react";
import { useState, useEffect } from "react";

function OwnArticle({ ownTask }) {
  const [titleData, setTitleData] = useState(ownTask.title);
  const [keywordsData, setKeywordsData] = useState(ownTask.keywords);
  const [warmerData, setWarmerData] = useState(ownTask.warmer);
  const [contentData, setContentData] = useState(ownTask.content);
  const [photoURLData, setPhotoURLData] = useState(ownTask.photoURL);
  const [originalURLData, setOriginalURLData] = useState(ownTask.originalURL);

  return (
    <div>
      <form>
        <textarea
          value={titleData}
          onChange={(e) => setTitleData(e.target.value)}
        />{" "}
        <br />
        <textarea
          value={keywordsData}
          onChange={(e) => setKeywordsData(e.target.value)}
        />
        <br />
        <textarea
          value={warmerData}
          onChange={(e) => setWarmerData(e.target.value)}
        />
        <br />
        <textarea
          value={contentData}
          onChange={(e) => setContentData(e.target.value)}
        />
        <br />
        <textarea
          value={photoURLData}
          onChange={(e) => setPhotoURLData(e.target.value)}
        />
        <br />
        <textarea
          value={originalURLData}
          onChange={(e) => setOriginalURLData(e.target.value)}
        />
      </form>
    </div>
  );
}

export default OwnArticle;
