import { Button } from "../ui/button";

function ButtonNextBack({
  handleNext,
  handleBack,
}: { handleNext: () => void } & { handleBack: () => void }) {
  return (
    <div className="flex justify-end items-center  py-10">
      <div className="w-[500px] flex items-center gap-5">
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={handleBack}
          className="py-6 w-full"
        >
          Back
        </Button>
        <Button size={"lg"} className="py-6 w-full" onClick={handleNext}>
          Next
        </Button>
      </div>
    </div>
  );
}

export default ButtonNextBack;
