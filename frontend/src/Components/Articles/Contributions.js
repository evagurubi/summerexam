import React, { useState, useEffect } from "react";
import "./Contribution.css";

const Contributions = () => {
  const [formData, setFormData] = useState(null);
  const [titleData, setTitleData] = useState("");
  const [keywordsData, setKeywordsData] = useState("");
  const [warmerData, setWarmerData] = useState("");
  const [contentData, setContentData] = useState("");
  const [photoURLData, setPhotoURLData] = useState("");
  const [originalURLData, setOriginalURLData] = useState("");

  //Protected route only for logged-in users to post articles/activities
  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("JWT"),
      },
      body: JSON.stringify(formData),
    };
    //Post request sent, after that textareas reset to placeholders
    if (formData) {
      fetch("http://localhost:5000/api/articles", requestOptions)
        .then((response) => response.text())
        .then((data) => {
           setTitleData("");
          setKeywordsData("");
          setWarmerData("");
          setContentData("");
          setOriginalURLData("");
          setPhotoURLData("");
        });
    }
  }, [formData]);

  const handleClick = (event) => {
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

  return (
    <div className="contributionbox">
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <textarea
          className="textarea contribution"
          type="text"
          id="title"
          name="title"
          placeholder="TITLE"
          onChange={(e) => setTitleData(e.target.value)}
          value={titleData}
        />
        <textarea
          className="textarea contribution"
          type="text"
          id="keywords"
          name="keywords"
          placeholder="KEYWORDS"
          onChange={(e) => setKeywordsData(e.target.value)}
          value={keywordsData}
        />
        <textarea
          className="textarea contribution"
          type="text"
          id="warmer"
          name="warmer"
          placeholder="WARMER"
          onChange={(e) => setWarmerData(e.target.value)}
          value={warmerData}
        />
        <textarea
          className="content contribution"
          type="text"
          name="content"
          placeholder="CONTENT"
          onChange={(e) => setContentData(e.target.value)}
          value={contentData}
        />
        <textarea
          className="textarea contribution"
          type="text"
          id="photoURL"
          name="photoURL"
          placeholder="LINK TO ORIGINAL ARTICLE"
          onChange={(e) => setPhotoURLData(e.target.value)}
          value={photoURLData}
        />
        <textarea
          className="textarea contribution"
          type="text"
          id="originalURL"
          name="originalURL"
          placeholder="LINK TO A RELEVANT IMAGE"
          onChange={(e) => setOriginalURLData(e.target.value)}
          value={originalURLData}
        />
        <input
          id="submitarticle"
          type="submit"
          value="SUBMIT"
          onClick={(e) => handleClick(e)}
        />
      </form>
    </div>
  );
};

export default Contributions;
