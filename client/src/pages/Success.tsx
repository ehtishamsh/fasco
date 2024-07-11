import { CartState } from "@/lib/redux/types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function Success() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");
  const getProduct = useSelector((state: CartState) => state.cart.items);
  const [checkPayment, setCheckPayment] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/check-session?session_id=${sessionId}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.payment_status === "paid") {
          setCheckPayment(true);
        } else {
          console.log("Payment not successful.");
          setCheckPayment(false);
        }
      });
  }, []);

  return <div></div>;
}

export default Success;
