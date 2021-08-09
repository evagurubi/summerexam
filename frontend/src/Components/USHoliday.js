import React from "react";

function USHoliday({ USdata }) {
  let holidayType = USdata.type.toLowerCase().split(" ");
  if (holidayType[holidayType.length - 1] != "holiday")
    holidayType = holidayType + " holiday";
  else holidayType = USdata.type.toLowerCase();
  console.log(holidayType);
  return (
    <div>
      {USdata.name !== "" ? (
        <p>
          It is {USdata.name} in the United States of America, which is a/an{" "}
          {holidayType}.
        </p>
      ) : (
        <p>It is not a holiday in the United States of America.</p>
      )}
    </div>
  );
}

export default USHoliday;
