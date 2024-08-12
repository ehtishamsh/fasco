import { toast } from "../ui/use-toast";
import ButtonNextBack from "./ButtonNextBack";
import { StepData } from "@/lib/redux/types";

interface Data {
  free: boolean;
  standard: boolean;
  express: boolean;
}
function Shipping({
  checked,
  setChecked,
  setStep,
  currentStep,
  setCurrentStep,
}: {
  checked: Data;
  setChecked: React.Dispatch<React.SetStateAction<Data>>;
  currentStep: number;
  setStep: React.Dispatch<React.SetStateAction<StepData[]>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
}) {
  const handleNext = () => {
    if (
      checked.free === false &&
      checked.standard === false &&
      checked.express === false
    ) {
      toast({
        title: "Error",
        description: "Please select a shipping method",
        variant: "destructive",
      });
      return;
    }
    setCurrentStep(3);
    if (currentStep === 1) {
      setStep((prev) => {
        return prev.map((item) => {
          if (item.step === 1) {
            return { ...item, active: false };
          }
          if (item.step === 2) {
            return { ...item, active: false };
          }
          if (item.step === 3) {
            return { ...item, active: true };
          }

          return item;
        });
      });
    }
  };

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    if (name === "free") {
      setChecked({ free: true, standard: false, express: false });
    } else if (name === "standard") {
      setChecked({ free: false, standard: true, express: false });
    } else if (name === "express") {
      setChecked({ free: false, standard: false, express: true });
    }
  };

  return (
    <div>
      <h1 className="text-xl font-semibold max-sm:text-base">
        Select Shipping
      </h1>
      <div className="grid grid-cols-1 gap-9 mt-10 max-sm:mt-6 max-sm:gap-4">
        <div
          className={`items-center grid grid-cols-12 gap-4 h-fit border max-sm:gap-2 border-muted-foreground p-4 max-sm:p-3 rounded-lg ${
            !checked.free ? "text-gray-400" : ""
          }`}
        >
          <input
            type="checkbox"
            className="custom-checkbox max-sm:w-5 max-sm:h-5 max-sm:col-span-12"
            onChange={(e) => handleCheck(e)}
            checked={checked.free}
            name="free"
          />
          <h1 className="font-semibold text-sm max-sm:text-xs max-sm:col-span-12">
            Free
          </h1>
          <p className="text-sm max-sm:text-xs col-span-8">Regular shipment</p>
          <p
            className={`text-sm max-sm:text-xs col-span-2 max-sm:col-span-4 ${
              checked.free ? "" : "text-gray-400"
            }`}
          >
            $0
          </p>
        </div>
      </div>
      <ButtonNextBack handleNext={handleNext} />
    </div>
  );
}

export default Shipping;
