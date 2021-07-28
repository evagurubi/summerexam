import React, { useState, useEffect } from "react";
import "../../src/App.css";
import Articles from "./Articles";

const Home = () => {
  return (
    <div className="intro">
      <h1>Newspaper And Magazine Articles for Your English Class</h1>
      <h4>
        " ‘One of the words that has been creeping into English teaching in the
        past few years is 'authentic'. It has a kind of magic ring to it: who
        after all would want to be inauthentic?’ Teachers and students are
        naturally attracted to authentic texts (by which I mean any text which
        has not been produced for the purpose of language-learning). Finding
        that you can read something designed for a native speaker is motivating,
        and developing ways to deal with ‘real’ texts enables students to read
        more confidently and extensively outside the classroom."
      </h4>
    </div>
  );
};

export default Home;
