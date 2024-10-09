import Payment from "@/components/checkout/Payment";
import SelectAddress from "@/components/checkout/SelectAddress";
import Shipping from "@/components/checkout/Shipping";
import Steps from "@/components/checkout/Steps";
import { Address as AddressType, User } from "@/lib/redux/types";
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
interface Data {
  free: boolean;
  standard: boolean;
  express: boolean;
}
function Checkout() {
  const [checked, setChecked] = useState<Data>({
    free: false,
    standard: false,
    express: false,
  });
  const [step, setStep] = React.useState<StepData[]>([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [address, setAddress] = useState<AddressType[]>();
  const [selectedAddress, setSelectedAddress] = useState<AddressType>();
  useEffect(() => {
    const user: User = JSON.parse(localStorage.getItem("user") || "{}");
    if (user) {
      const fetchData = async () => {
        try {
          const req = await fetch(
            `https://fascobackend-production.up.railway.app/api/address/user/${user.id}`
          );
          const res = await req.json();
          if (res) {
            setAddress(res.address);
          }
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }

    return () => {};
  }, []);
  useEffect(() => {
    setStep(stepsArr);
  }, [step, currentStep]);
  return (
    <div className="max-w-6xl mx-auto px-4">
      {step && <Steps stepData={step} currentStep={currentStep} />}
      <div>
        {currentStep === 1 && address && (
          <SelectAddress
            setStep={setStep}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            address={address}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />
        )}
        {currentStep === 2 && (
          <Shipping
            checked={checked}
            setChecked={setChecked}
            setStep={setStep}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === 3 && (
          <Payment
            checked={checked}
            setChecked={setChecked}
            selectedAddress={selectedAddress}
          />
        )}
      </div>
    </div>
  );
}

export default Checkout;
