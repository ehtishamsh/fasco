import { BiPlus } from "react-icons/bi";
import { Button } from "../ui/button";
import { Address as AddressType, StepData } from "@/lib/redux/types";
import ButtonNextBack from "./ButtonNextBack";
import { Link } from "react-router-dom";
import AddressCard from "./AddressCard";

function SelectAddress({
  setStep,
  currentStep,
  setCurrentStep,
  address,
  setSelectedAddress,
  selectedAddress,
}: {
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<StepData[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  address: AddressType[];
  setSelectedAddress: React.Dispatch<
    React.SetStateAction<AddressType | undefined>
  >;
  selectedAddress: AddressType | undefined;
}) {
  const handleNext = () => {
    if (currentStep === 1) {
      setStep((prev) => {
        return prev.map((item) => {
          if (item.step === 1) {
            return { ...item, active: false };
          }
          if (item.step === 2) {
            return { ...item, active: true };
          }
          return item;
        });
      });
      setCurrentStep(2);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold max-sm:text-base">Select Address</h1>
      <div className="grid grid-cols-1 gap-9 max-sm:gap-4 mt-10 max-sm:mt-5">
        {address.map((address) => (
          <div
            key={address.id}
            className={`flex gap-4 bg-gray-100/80 p-6 max-sm:p-4 max-sm:gap-2 rounded-lg ${
              selectedAddress?.id === address.id ? "border border-blue-500" : ""
            }`}
          >
            <div className="flex justify-center">
              <input
                type="checkbox"
                className="custom-checkbox mt-[5px]"
                checked={selectedAddress?.id === address.id}
                onChange={() => setSelectedAddress(address)}
              />
            </div>
            <AddressCard address={address} />
          </div>
        ))}
      </div>
      <div className="w-full my-16 relative">
        <div className="relative">
          <span className="bg-gradient-to-r from-white via-transparent cursor-none pointer-events-none to-white absolute h-full w-full">
            &nbsp;
          </span>
          <hr className="border border-gray-600 border-spacing-2 border-dashed z-20" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
          <Button
            className="rounded-full mt-[28px]"
            variant={"default"}
            size={"icon"}
          >
            <BiPlus size={24} />
          </Button>
          <Link to={"/address"} className="text-sm mt-2">
            Add new address
          </Link>
        </div>
      </div>
      <ButtonNextBack handleNext={handleNext} />
    </div>
  );
}
export default SelectAddress;
