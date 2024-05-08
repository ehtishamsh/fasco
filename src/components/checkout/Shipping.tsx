import { useNavigate } from "react-router-dom";
import ButtonNextBack from "./ButtonNextBack";
import { Checkbox } from "../ui/checkbox";
import { useEffect, useState } from "react";

interface Data {
  free: boolean;
  standard: boolean;
  express: boolean;
}
function Shipping() {
  const navigate = useNavigate();

  // State to manage the checked status of checkboxes
  const [checked, setChecked] = useState<Data>({
    free: false,
    standard: false,
    express: false,
  });

  // Function to handle checkbox changes
  const handleCheck = (name: keyof Data) => {
    // Create a new object with all checkboxes set to false
    const newCheckedState: Data = {
      free: false,
      standard: false,
      express: false,
    };

    // Set the clicked checkbox to true
    newCheckedState[name] = true;

    // Update the state
    setChecked(newCheckedState);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Select Shipping</h1>
      <div className="grid grid-cols-1 gap-9 mt-10">
        <div className="flex justify-between items-center gap-4 border border-muted-foreground p-6 rounded-lg">
          <div
            className={`flex items-center gap-3 ${
              !checked.free ? "text-gray-400" : ""
            }`}
          >
            <input
              type="checkbox"
              className="rounded-full"
              onChange={() => handleCheck("free")}
              checked={checked.free}
            />
            <h1 className="font-semibold text-sm">Free</h1>
            <p className="text-sm">Regular shipment</p>
          </div>
          <p className={`text-sm ${checked.free ? "" : "text-gray-400"}`}>
            17 Oct, 2023
          </p>
        </div>
        <div className="flex justify-between items-center gap-4 border border-muted-foreground p-6 rounded-lg">
          <div
            className={`flex items-center gap-3 ${
              !checked.standard ? "text-gray-400" : ""
            }`}
          >
            <Checkbox
              className="rounded-full"
              onChange={() => handleCheck("standard")}
              checked={checked.standard}
            />
            <h1 className="font-semibold text-sm">$8.50</h1>
            <p className="text-sm">Get your delivery as soon as possible</p>
          </div>
          <p className={`text-sm ${checked.standard ? "" : "text-gray-400"}`}>
            17 Oct, 2023
          </p>
        </div>
        <div className="flex justify-between items-center gap-4 border border-muted-foreground p-6 rounded-lg">
          <div
            className={`flex items-center gap-3 ${
              !checked.express ? "text-gray-400" : ""
            }`}
          >
            <Checkbox
              className="rounded-full"
              onChange={() => handleCheck("express")}
              checked={checked.express}
            />
            <h1 className="font-semibold text-sm">Schedule</h1>
            <p className="text-sm">
              Pick a date when you want to get your delivery
            </p>
          </div>
          <p className={`text-sm ${checked.express ? "" : "text-gray-400"}`}>
            17 Oct, 2023
          </p>
        </div>
      </div>
      <ButtonNextBack handleNext={() => navigate("/payment")} />
    </div>
  );
}

export default Shipping;
