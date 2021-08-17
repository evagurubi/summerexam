import React, { useState, useEffect } from "react";
import UKHoliday from "./UKHoliday";
import USHoliday from "./USHoliday";
import AusHoliday from "./AusHoliday";
import New_York from "../../Images/New_york_times_square.jpg";
import "./Holidays.css";

function Holidays() {
  let dateObj = new Date();
  console.log(dateObj);
  let month = dateObj.getUTCMonth() + 1; //months from 1-12
  //dateObj.getUTCMonth() + 1; //months from 1-12
  let day = dateObj.getUTCDate();
  //dateObj.getUTCDate();
  let year = dateObj.getUTCFullYear();

  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let dayname = weekday[dateObj.getUTCDay()];

  let newdate = day + "/" + month + "/" + year;
  const [UKdata, setUKdata] = useState(null);
  const [USdata, setUSdata] = useState(null);
  const [Ausdata, setAusdata] = useState(null);

  const fetchUKData = () => {
    fetch(`/api/holidays/uk?year=${year}&month=${month}&day=${day}`)
      .then((res) => {
        if (res.status !== 200) return "It is still loading";
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setUKdata(json);
      });
  };

  const fetchUSData = () => {
    fetch(`/api/holidays/us?year=${year}&month=${month}&day=${day}`)
      .then((res) => {
        if (res.status !== 200) return "It is still loading";
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setUSdata(json);
      });
  };

  const fetchAusData = () => {
    fetch(`/api/holidays/aus?year=${year}&month=${month}&day=${day}`)
      .then((res) => {
        if (res.status !== 200) return "It is still loading";
        return res.json();
      })
      .then((json) => {
        console.log(json);
        setAusdata(json);
      });
  };

  useEffect(() => {
    fetchUKData();
    setTimeout(() => {
      fetchUSData();
    }, 3000);
    setTimeout(() => {
      fetchAusData();
    }, 4000);
  }, []);

  return (
    <div className="holidayscontainer">
      <img src={New_York} id="nyimage" />
      <div className="holidays">
        <div className="holidayscontent">
          <h4>
            Why don't you start your lesson with something authentic, like
            discussing holidays in English-speaking countries?
          </h4>
          <h4>
            It is {newdate}, {dayname} today.
          </h4>
          {UKdata && <UKHoliday UKdata={UKdata.message} />}
          {USdata && <USHoliday USdata={USdata.message} />}
          {Ausdata && <AusHoliday Ausdata={Ausdata.message} />}
          <h4>Log in and search for articles on the topic and much more...</h4>
        </div>
      </div>
    </div>
  );
}

export default Holidays;
