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
      <input value={titleData} onChange={(e) => setTitleData(e.target.value)} />
      <input
        value={contentData}
        onChange={(e) => setContentData(e.target.value)}
      />
    </div>
  );
}

export default OwnArticle;
