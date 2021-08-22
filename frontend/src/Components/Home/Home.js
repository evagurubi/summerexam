import React, { useState, useEffect } from "react";
import "./Home.css";
import London_scene from "../../Images/London_scene.jpg";

//Welcome text with London scene in background
const Home = () => {
  return (
    <div className="homecontainer">
      <img src={London_scene} id="image" />
      <div className="intro">
        <div className="introcontent">
          <div className="h1font">
            <h1 className="h1">
              Newspaper And Magazine Articles for Your English Class
            </h1>
          </div>
          <h4 className="h4font">
            " ‘One of the words that has been creeping into English teaching in
            the past few years is 'authentic'. It has a kind of magic ring to
            it: who after all would want to be inauthentic?’ Teachers and
            students are naturally attracted to authentic texts (by which I mean
            any text which has not been produced for the purpose of
            language-learning). Finding that you can read something designed for
            a native speaker is motivating, and developing ways to deal with
            ‘real’ texts enables students to read more confidently and
            extensively outside the classroom."
            <span id="quote"> Rachael Roberts</span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default Home;
