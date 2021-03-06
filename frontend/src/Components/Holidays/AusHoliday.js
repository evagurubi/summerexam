import React from "react";

function AusHoliday({ Ausdata }) {
  let holidayType = Ausdata.type.toLowerCase().split(" ");
    if (holidayType[holidayType.length - 1] !== "holiday")
    holidayType = holidayType.join(" ") + " holiday";
  else holidayType = Ausdata.type.toLowerCase();

  //Returns holiday or without one a standard text
  return (
    <div>
      {Ausdata.name !== "" ? (
        <h4 className="ausush4">
          It is {Ausdata.name} in Australia, which is a/an {holidayType}.{" "}
        </h4>
      ) : (
        <h4>It is not a holiday in Australia.</h4>
      )}
    </div>
  );
}

export default AusHoliday;
