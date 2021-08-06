import React, { useState, useEffect } from "react";

function Holidays() {
  let dateObj = new Date();
  let month = 12;
  //dateObj.getUTCMonth() + 1; //months from 1-12
  let day = 26;
  //dateObj.getUTCDate();
  let year = 2021;
  // dateObj.getUTCFullYear();

  //let newdate = day + "/" + month + "/" + year;

  const fetchData = () => {
    fetch(`/api/ukholidays?year=${year}&month=${month}&day=${day}`)
      .then((res) => {
        if (res.status !== 200) return "It is still loading";
        return res.json();
      })
      .then((json) => {
        console.log(json);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      {" "}
      <p>UK holidays</p>{" "}
    </div>
  );
}

export default Holidays;
