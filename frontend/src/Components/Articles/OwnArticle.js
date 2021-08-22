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
    // console.log(newData);
  };
  //Article can be deleted, identification by _id request parameter
  const handleDelete = () => {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("JWT"),
      },
    };

    fetch(`http://localhost:5000/api/articles/own/${ownTask._id}`, options)
      .then((response) => response.text())
      .then(() => {
        fetchOwnData();
      });
  };

  //Article can be modified, identification by _id request parameter
  useEffect(() => {
    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("JWT"),
      },
      body: JSON.stringify(formData),
    };

    fetch(
      `http://localhost:5000/api/articles/own/${ownTask._id}`,
      requestOptions
    )
      .then((response) => response.text())
      .then((data) => {
        // console.log(data);
      });
  }, [formData]);

  //Form is used to display user's own articles so that they can be modified
  return (
    <div className="article">
      <form className="form">
        <label htmlFor="title">Title</label>
        <textarea
          id="title"
          className="textarea"
          value={titleData}
          onChange={(e) => setTitleData(e.target.value)}
        />{" "}
        <br />
        <label htmlFor="keywords">Keywords</label>
        <textarea
          id="keywords"
          className="textarea"
          value={keywordsData}
          onChange={(e) => setKeywordsData(e.target.value)}
        />
        <br />
        <label htmlFor="warmer">Warmer</label>
        <textarea
          id="warmer"
          className="textarea"
          value={warmerData}
          onChange={(e) => setWarmerData(e.target.value)}
        />
        <br />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          className="content"
          value={contentData}
          onChange={(e) => setContentData(e.target.value)}
        />
        <br />
        <label htmlFor="photoURL">Photo URL</label>
        <textarea
          id="photoURL"
          className="textarea"
          value={photoURLData}
          onChange={(e) => setPhotoURLData(e.target.value)}
        />
        <br />
        <label htmlFor="articleURL">Article URL</label>
        <textarea
          id="articleURL"
          className="textarea"
          value={originalURLData}
          onChange={(e) => setOriginalURLData(e.target.value)}
        />
        <input
          id="submitchange"
          type="submit"
          value="Submit the changes"
          onClick={(e) => handlePatch(e)}
        />
      </form>
      <button id="deletebutton" onClick={handleDelete}>
        Delete activity
      </button>
    </div>
  );
}

export default OwnArticle;
