import Steps from "@/components/checkout/Steps";
import React, { useEffect } from "react";

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
  useEffect(() => {
    setStep(stepsArr);
  }, [step]);
  return (
    <div className="max-w-6xl mx-auto">{step && <Steps stepData={step} />}</div>
  );
}

export default Checkout;
