import { useToast } from "@/components/ui/use-toast";
import { reset } from "@/lib/redux/cartSlice";
import { CartState } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Success() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");
  const [data, setData] = useState<any>({});
  const dispatch = useDispatch();
  const getProduct = useSelector((state: CartState) => state.cart.items);
  const [checkPayment, setCheckPayment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetch(`http://localhost:4000/api/check-session?session_id=${sessionId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.session.payment_status === "paid") {
          setCheckPayment(true);
          setData(data);
        } else {
          console.log("Payment not successful.");
          setCheckPayment(false);
        }
      });
  }, []);
  useEffect(() => {
    if (checkPayment === true) {
      const req = async () => {
        try {
          const body = {
            payment_intentId: data.session.payment_intent,
            products: getProduct,
            payment_status: data.session.payment_status,
            userId: data.session.metadata.userId,
            addressId: data.session.metadata.addressId,
          };
          const response = await fetch(
            "http://localhost:4000/api/order/create",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(body),
            }
          );

          const check = await response.json();
          if (check.status === 200) {
            toast({
              title: "Success",
              description: "Your order has been placed successfully",
              variant: "success",
            });
            dispatch(reset());
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }
        } catch (error) {
          console.log(error);
          toast({
            title: "Error",
            description: "Something went wrong",
            variant: "destructive",
          });
          window.location.href = "/";
        }
      };
      req();
    }
    return () => {};
  }, [checkPayment]);

  return (
    <div>
      {checkPayment && (
        <>
          <h1>Payment Successful</h1>
          <h1>Your payment was successful</h1>
          <h1>
            Thank you for shopping with us {data.session.customer_details.name}
          </h1>
        </>
      )}
    </div>
  );
}

export default Success;
