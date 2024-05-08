import { useEffect, useState } from "react";
import { FaShippingFast } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa";

import { FaMapMarkerAlt } from "react-icons/fa";
type Steps = {
  step: number;
  name: string;
  active: boolean;
};
function Steps({ stepData }: { stepData: Steps[] }) {
  const [data, setData] = useState<Steps[]>([]);

  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    setData(stepData);
    const checkStep = stepData?.filter((item) => item.active === true);
    setCurrentStep(checkStep?.[0]?.step || 1);
  }, [data]);

  return (
    <div className="mt-6 flex justify-between mb-24">
      <div className="flex justify-center items-center">
        <span
          className={` h-8 w-8 ${
            currentStep === 1 ? "bg-foreground" : "bg-gray-200"
          } rounded-full flex justify-center items-center`}
        >
          <FaMapMarkerAlt
            className={`text-xl ${
              currentStep === 1 ? "text-background" : "text-gray-400"
            }`}
          />
        </span>
        <div
          className={`ml-2 ${
            currentStep === 1 ? "text-foreground" : "text-gray-400"
          }`}
        >
          <p className="text-sm">Step 1</p>
          <p className="text-base font-semibold">Address</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <span
          className={` h-8 w-8 ${
            currentStep === 2 ? "bg-foreground" : "bg-gray-200"
          } rounded-full flex justify-center items-center`}
        >
          <FaShippingFast
            className={`text-xl ${
              currentStep === 2 ? "text-background" : "text-gray-400"
            }`}
          />
        </span>
        <div
          className={`ml-2 ${
            currentStep === 2 ? "text-foreground" : "text-gray-400"
          }`}
        >
          <p className="text-sm">Step 2</p>
          <p className="text-base font-semibold">Shipping</p>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <span
          className={` h-8 w-8 ${
            currentStep === 3 ? "bg-foreground" : "bg-gray-200"
          } rounded-full flex justify-center items-center`}
        >
          <FaCreditCard
            className={`text-xl ${
              currentStep === 3 ? "text-foreground" : "text-gray-400"
            }`}
          />
        </span>
        <div
          className={`ml-2 ${
            currentStep === 3 ? "text-background" : "text-gray-400"
          }`}
        >
          <p className="text-sm">Step 3</p>
          <p className="text-base font-semibold">Payment</p>
        </div>
      </div>
    </div>
  );
}

export default Steps;
