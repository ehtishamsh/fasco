import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

function ButtonNextBack({ handleNext }: { handleNext: () => void }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-end items-center  py-10">
      <div className="w-[500px] flex items-center gap-5">
        <Button
          variant={"outline"}
          size={"lg"}
          onClick={() => navigate(-1)}
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
