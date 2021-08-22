import React from "react";

function UKHoliday({ UKdata }) {
  let holidayType = UKdata.type.toLowerCase().split(" ");
  if (holidayType[holidayType.length - 1] !== "holiday")
    holidayType = holidayType.join(" ") + " holiday";
  else holidayType = UKdata.type.toLowerCase();
  console.log(holidayType);

  //Returns holiday or without one a standard text
  return (
    <div>
      {UKdata.name !== "" ? (
        <h4>
          It is {UKdata.name} in the United Kingdom, which is a/an {holidayType}
          .
        </h4>
      ) : (
        <h4 className="ukh4">It is not a holiday in the United Kingdom.</h4>
      )}
    </div>
  );
}

export default UKHoliday;
