import React from "react";

function USHoliday({ USdata }) {
 
  let holidayType = USdata.type.toLowerCase().split(" ");
  if (holidayType[holidayType.length - 1] !== "holiday")
    holidayType = holidayType.join(" ") + " holiday";
  else holidayType = USdata.type.toLowerCase();
 

  //Returns holiday or without one a standard text
  return (
    <div>
      {USdata.name !== "" ? (
        <h4 className="ausush4">
          It is {USdata.name} in the United States of America, which is a/an{" "}
          {holidayType}.
        </h4>
      ) : (
        <h4>It is not a holiday in the United States of America.</h4>
      )}
    </div>
  );
}

export default USHoliday;
