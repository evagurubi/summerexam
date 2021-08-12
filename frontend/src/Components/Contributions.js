import React, { useState, useEffect } from "react";

const Contributions = () => {
  const [formData, setFormData] = useState(null);
  const [titleData, setTitleData] = useState("");
  const [keywordsData, setKeywordsData] = useState("");
  const [warmerData, setWarmerData] = useState("");
  const [contentData, setContentData] = useState("");
  const [photoURLData, setPhotoURLData] = useState("");
  const [originalURLData, setOriginalURLData] = useState("");

  useEffect(() => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("JWT"),
      },
      body: JSON.stringify(formData),
    };

    if (formData) {
      fetch("/api/articles", requestOptions)
        .then((response) => response.text())
        .then((data) => {
          console.log(data);
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
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="TITLE"
          onChange={(e) => setTitleData(e.target.value)}
          value={titleData}
        />
        <input
          type="text"
          id="keywords"
          name="keywords"
          placeholder="KEYWORDS"
          onChange={(e) => setKeywordsData(e.target.value)}
          value={keywordsData}
        />
        <input
          type="text"
          id="warmer"
          name="warmer"
          placeholder="WARMER"
          onChange={(e) => setWarmerData(e.target.value)}
          value={warmerData}
        />
        <input
          type="text"
          id="content"
          name="content"
          placeholder="CONTENT"
          onChange={(e) => setContentData(e.target.value)}
          value={contentData}
        />
        <input
          type="text"
          id="photoURL"
          name="photoURL"
          placeholder="LINK TO ORIGINAL ARTICLE"
          onChange={(e) => setPhotoURLData(e.target.value)}
          value={photoURLData}
        />
        <input
          type="text"
          id="originalURL"
          name="originalURL"
          placeholder="LINK TO A RELEVANT IMAGE"
          onChange={(e) => setOriginalURLData(e.target.value)}
          value={originalURLData}
        />
        <input type="submit" value="Submit" onClick={(e) => handleClick(e)} />
      </form>
    </div>
  );
};

export default Contributions;
