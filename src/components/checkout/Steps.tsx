import { useEffect, useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";

import { FaMapMarkerAlt } from "react-icons/fa";
type Steps = {
  step: number;
  name: string;
  active: boolean;
};
function Steps({
  stepData,
  currentStep,
}: {
  stepData: Steps[];
  currentStep: number;
}) {
  const [data, setData] = useState<Steps[]>([]);
  useEffect(() => {
    setData(stepData);
  }, [data]);

  return (
    <div className="mt-6 max-sm:mt-4 flex justify-between mb-24 max-sm:mb-12">
      <div className="flex justify-center items-center">
        <span
          className={` h-8 w-8 max-sm:w-6 max-sm:h-6 ${
            currentStep === 1 ? "bg-foreground" : "bg-gray-200"
          } rounded-full flex justify-center items-center`}
        >
          <FaMapMarkerAlt
            className={`text-xl max-sm:text-sm ${
              currentStep === 1 ? "text-background" : "text-gray-400"
            }`}
          />
        </span>
        <div
          className={`ml-2 ${
            currentStep === 1 ? "text-foreground" : "text-gray-400"
          }`}
        >
          <p className="text-sm max-sm:text-xs">Step 1</p>
          <p className="text-base max-sm:text-sm font-semibold">Address</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <span
          className={` h-8 w-8 max-sm:w-6 max-sm:h-6 ${
            currentStep === 2 ? "bg-foreground" : "bg-gray-200"
          } rounded-full flex justify-center items-center`}
        >
          <FaShippingFast
            className={`text-xl max-sm:text-sm ${
              currentStep === 2 ? "text-background" : "text-gray-400"
            }`}
          />
        </span>
        <div
          className={`ml-2 ${
            currentStep === 2 ? "text-foreground" : "text-gray-400"
          }`}
        >
          <p className="text-sm max-sm:text-xs">Step 2</p>
          <p className="text-base max-sm:text-sm font-semibold">Shipping</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <span
          className={` h-8 w-8 max-sm:w-6 max-sm:h-6 ${
            currentStep === 3 ? "bg-foreground" : "bg-gray-200"
          } rounded-full flex justify-center items-center`}
        >
          <FaCreditCard
            className={`text-xl max-sm:text-sm ${
              currentStep === 3 ? "text-background" : "text-gray-400"
            }`}
          />
        </span>
        <div
          className={`ml-2 ${
            currentStep === 3 ? "text-foreground" : "text-gray-400"
          }`}
        >
          <p className="text-sm max-sm:text-xs">Step 3</p>
          <p className="text-base max-sm:text-sm font-semibold">Payment</p>
        </div>
      </div>
    </div>
  );
}

export default Steps;
