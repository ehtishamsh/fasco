import { Button } from "../ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../ui/dialog";
export function PaymentModal({
  setConfirm,
}: {
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size={"lg"} className="py-6 w-full">
          Place Order
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-sm:max-w-[350px]  max-sm:!p-3">
        <DialogHeader>
          <DialogTitle>Select Payment Method</DialogTitle>
          <DialogDescription>
            Select the payment method you want to use.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 flex flex-col">
          <Button
            variant="outline"
            onClick={() => {
              setConfirm(true);
            }}
          >
            Pay with Credit Card
          </Button>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Note : At this moment, we only support credit card.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
