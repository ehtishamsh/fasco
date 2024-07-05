import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { PaymentModal } from "./PaymentModal";

function PaymentButton({
  setConfirm,
}: {
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
        <PaymentModal setConfirm={setConfirm} />
      </div>
    </div>
  );
}

export default PaymentButton;
