import React from "react";
import { useState, useEffect } from "react";

function OwnArticle({ ownTask, fetchOwnData }) {
  const [formData, setFormData] = useState(ownTask);
  const [titleData, setTitleData] = useState(ownTask.title);
  const [keywordsData, setKeywordsData] = useState(ownTask.keywords);
  const [warmerData, setWarmerData] = useState(ownTask.warmer);
  const [contentData, setContentData] = useState(ownTask.content);
  const [photoURLData, setPhotoURLData] = useState(ownTask.photoURL);
  const [originalURLData, setOriginalURLData] = useState(ownTask.originalURL);

  const handlePatch = (event) => {
    event.preventDefault();

    const newData = {
      title: titleData,
      keywords: keywordsData,
      warmer: warmerData,
      content: contentData,
      photoURL: photoURLData,
      originalURL: originalURLData,
    };
    setFormData(newData);
  };

  const handleDelete = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("JWT"),
      },
    };

    fetch(`/api/ownarticles/${ownTask._id}`, options)
      .then((response) => response.text())
      .then(() => {
        fetchOwnData();
      });
  };

  useEffect(() => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("JWT"),
      },
      body: JSON.stringify(formData),
    };

    fetch(`/api/ownarticles/${ownTask._id}`, requestOptions)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
      });
  }, [formData]);

  return (
    <div className="ownArticleDiv">
      <p>{ownTask._id}</p>
      <form>
        <textarea
          className="title"
          value={titleData}
          onChange={(e) => setTitleData(e.target.value)}
        />{" "}
        <br />
        <textarea
          className="keywords"
          value={keywordsData}
          onChange={(e) => setKeywordsData(e.target.value)}
        />
        <br />
        <textarea
          className="warmer"
          value={warmerData}
          onChange={(e) => setWarmerData(e.target.value)}
        />
        <br />
        <textarea
          className="content"
          value={contentData}
          onChange={(e) => setContentData(e.target.value)}
        />
        <br />
        <textarea
          className="photoURL"
          value={photoURLData}
          onChange={(e) => setPhotoURLData(e.target.value)}
        />
        <br />
        <textarea
          className="originalURL"
          value={originalURLData}
          onChange={(e) => setOriginalURLData(e.target.value)}
        />
        <input
          type="submit"
          value="Submit the changes"
          onClick={(e) => handlePatch(e)}
        ></input>
      </form>
      <button onClick={handleDelete}>Delete activity</button>
    </div>
  );
}

export default OwnArticle;
