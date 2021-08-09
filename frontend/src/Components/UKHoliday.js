import React from "react";

function UKHoliday({ UKdata }) {
  let holidayType = UKdata.type.toLowerCase().split(" ");
  if (holidayType[holidayType.length - 1] != "holiday")
    holidayType = holidayType + " holiday";
  else holidayType = UKdata.type.toLowerCase();
  console.log(holidayType);
  return (
    <div>
      {UKdata.name !== "" ? (
        <p>
          It is {UKdata.name} in the United Kingdom, which is a/an {holidayType}
          .
        </p>
      ) : (
        <p>It is not a holiday in the United Kingdom.</p>
      )}
    </div>
  );
}

export default UKHoliday;
