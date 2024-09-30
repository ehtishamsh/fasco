import { useEffect, useState } from "react";
import { FaShippingFast, FaCreditCard, FaMapMarkerAlt } from "react-icons/fa";

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
  //@ts-ignore
  const [data, setData] = useState<Steps[]>([]);

  useEffect(() => {
    setData(stepData);
  }, [stepData]);

  return (
    <div className="relative mt-6 max-sm:mt-4 mb-24 max-sm:mb-12">
      {/* Progress Bar */}
      <div className="absolute -bottom-4 left-0 right-0 h-1 bg-gray-300 z-0">
        <div
          className={`h-1 bg-yellow-500 transition-all duration-500`}
          style={{ width: `${(currentStep - 1) * 50}%` }} // Adjust progress width
        />
      </div>

      {/* Steps */}
      <div className="relative z-10 flex justify-between">
        <div className="flex justify-center items-center">
          <span
            className={`h-10 w-10 max-sm:w-8 max-sm:h-8 ${
              currentStep >= 1 ? "bg-yellow-500" : "bg-yellow-200"
            } rounded-full flex justify-center items-center transition-all duration-300`}
          >
            <FaMapMarkerAlt
              className={`text-2xl max-sm:text-lg ${
                currentStep >= 1 ? "text-background" : "text-gray-400"
              }`}
            />
          </span>
          <div
            className={`ml-2 transition-all duration-300 ${
              currentStep >= 1 ? "text-foreground" : "text-gray-400"
            }`}
          >
            <p className="text-sm max-sm:text-xs">Step 1</p>
            <p className="text-base max-sm:text-sm font-semibold">Address</p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <span
            className={`h-10 w-10 max-sm:w-8 max-sm:h-8 ${
              currentStep >= 2 ? "bg-yellow-500" : "bg-yellow-200"
            } rounded-full flex justify-center items-center transition-all duration-300`}
          >
            <FaShippingFast
              className={`text-2xl max-sm:text-lg ${
                currentStep >= 2 ? "text-background" : "text-gray-400"
              }`}
            />
          </span>
          <div
            className={`ml-2 transition-all duration-300 ${
              currentStep >= 2 ? "text-foreground" : "text-gray-400"
            }`}
          >
            <p className="text-sm max-sm:text-xs">Step 2</p>
            <p className="text-base max-sm:text-sm font-semibold">Shipping</p>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <span
            className={`h-10 w-10 max-sm:w-8 max-sm:h-8 ${
              currentStep >= 3 ? "bg-yellow-500" : "bg-yellow-200"
            } rounded-full flex justify-center items-center transition-all duration-300`}
          >
            <FaCreditCard
              className={`text-2xl max-sm:text-lg ${
                currentStep >= 3 ? "text-background" : "text-gray-400"
              }`}
            />
          </span>
          <div
            className={`ml-2 transition-all duration-300 ${
              currentStep >= 3 ? "text-foreground" : "text-gray-400"
            }`}
          >
            <p className="text-sm max-sm:text-xs">Step 3</p>
            <p className="text-base max-sm:text-sm font-semibold">Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Steps;
