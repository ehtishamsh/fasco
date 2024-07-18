import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { toast } from "../ui/use-toast";

function OrderCancel({
  orderNumber,
  orderConfirmed,
}: {
  orderNumber: number;
  orderConfirmed: boolean;
}) {
  const [confirm, setConfirm] = useState(false);
  const [open, setOpen] = useState(false);

  const onConfirm = () => {
    if (!orderConfirmed) {
      setConfirm(true);
    }
  };
  useEffect(() => {
    const cancelOrder = async () => {
      if (confirm) {
        try {
          const status = "CANCELLED";
          const orderStatus = ["Your order has been cancelled."];
          const req = await fetch(`http://localhost:4000/api/order/update`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ status, orderNumber, orderStatus }),
          });
          const res = await req.json();
          console.log(res);
          if (res.status === 200) {
            toast({
              title: "Order Cancelled",
              description: "Order cancelled successfully",
              variant: "success",
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          }
        } catch (error) {
          console.log(error);
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
        }
      }
    };
    cancelOrder();
    return () => {
      setConfirm(false);
    };
  }, [confirm]);
  return (
    <>
      <Button
        variant="link"
        className="text-yellow-600"
        size={"lg"}
        onClick={() => setOpen(true)}
      >
        Cancel
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          {orderConfirmed ? (
            <>
              <DialogHeader>
                <DialogTitle className="mb-4">Sorry!</DialogTitle>
                <DialogDescription>
                  Sorry, order that has been confirmed cannot be cancelled.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="default">Go Back</Button>
                </DialogClose>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Are you sure?</DialogTitle>
                <DialogDescription>
                  Do you want to cancel the order?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Go Back</Button>
                </DialogClose>
                <Button variant="destructive" onClick={onConfirm}>
                  Cancel
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default OrderCancel;
