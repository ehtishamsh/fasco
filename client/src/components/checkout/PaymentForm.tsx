import { Product } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "../ui/use-toast";

function PaymentForm({ cartData }: { cartData: Product[] }) {
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setTotal(() =>
      cartData.reduce(
        (acc, item) =>
          acc +
          Number(item.price) * Number(item.quantity) +
          Number(item.selectedVariant?.price || 0),
        0
      )
    );
  }, [cartData]);

  console.log(total);
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51OaSIsLXJrC5pQEFKKm3qrmBncqMYscHgLotdohKIPUkgoo3A12e3Inl8RnhuPHlEpx8Y4b9w4kv5qEevUHUnZn000m0tQPia9"
    );
    const body = {
      products: cartData,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(
      "http://localhost:4000/api/create-checkout-session",
      {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();
    const result = await stripe?.redirectToCheckout({ sessionId: session.id });
    if (result?.error) {
      toast({
        title: "Error",
        description: result.error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <button onClick={makePayment}>Pay</button>
    </>
  );
}

export default PaymentForm;
