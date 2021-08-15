import React from "react";

function AusHoliday({ Ausdata }) {
  let holidayType = Ausdata.type.toLowerCase().split(" ");
  console.log(holidayType);
  if (holidayType[holidayType.length - 1] !== "holiday")
    holidayType = holidayType + " holiday";
  else holidayType = Ausdata.type.toLowerCase();

  return (
    <div>
      {Ausdata.name !== "" ? (
        <p>
          It is {Ausdata.name} in Australia, which is a/an {holidayType}.{" "}
        </p>
      ) : (
        <p>It is not a holiday in Australia.</p>
      )}
    </div>
  );
}

export default AusHoliday;
