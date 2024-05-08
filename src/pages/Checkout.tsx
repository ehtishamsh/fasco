import Address from "@/components/checkout/Address";
import Shipping from "@/components/checkout/Shipping";
import Steps from "@/components/checkout/Steps";
import React, { useEffect, useState } from "react";

type StepData = {
  step: number;
  name: string;
  active: boolean;
};
const stepsArr: StepData[] = [
  {
    step: 1,
    active: true,
    name: "Address",
  },
  {
    step: 2,
    active: false,
    name: "Delivery",
  },
  {
    step: 3,
    active: false,
    name: "Payment",
  },
];
function Checkout() {
  const [step, setStep] = React.useState<StepData[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  useEffect(() => {
    setStep(stepsArr);
  }, [step, currentStep]);
  return (
    <div className="max-w-6xl mx-auto px-4">
      {step && <Steps stepData={step} currentStep={currentStep} />}
      <div>
        {currentStep === 1 && (
          <Address
            setStep={setStep}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 2 && <Shipping />}
      </div>
    </div>
  );
}

export default Checkout;
