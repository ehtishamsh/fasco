import React from "react";
import ButtonNextBack from "./ButtonNextBack";

function Payment() {
  return (
    <div>
      <h1 className="text-xl font-semibold">Select Shipping</h1>
      <div className="grid grid-cols-1 gap-9 mt-10"></div>
      <ButtonNextBack handleNext={() => console.log("next")} />
    </div>
  );
}

export default Payment;
