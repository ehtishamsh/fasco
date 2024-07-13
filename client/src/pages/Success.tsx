import { useToast } from "@/components/ui/use-toast";
import { reset } from "@/lib/redux/cartSlice";
import { CartState, User } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";

function Success() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get("session_id");
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [data, setData] = useState<any>({});
  const [message, setMessage] = useState<any>({
    status: 0,
    message: "",
  });
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
  }, [sessionId]);

  useEffect(() => {
    if (checkPayment) {
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
          if (check.status) {
            setMessage({
              status: check.status,
              message: check.message,
            });
          }

          if (check.status === 200) {
            dispatch(reset());
            setTimeout(() => {
              window.location.href = "/";
            }, 2000);
          }
          if (check.status === 400) {
            toast({
              title: "Error",
              description: check?.message,
              variant: "destructive",
            });
            window.location.href = "/";
          }
        } catch (error) {
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
  }, [checkPayment]);

  return (
    <div className="flex items-center justify-center h-[60svh]">
      {checkPayment && message?.status === 200 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-10 bg-white rounded-lg shadow-lg text-center"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-bold text-green-500 mb-4"
          >
            Payment Successful
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg mb-2"
          >
            Your payment was successful
          </motion.p>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-lg"
          >
            Thank you for shopping with us, {user.firstname}
          </motion.p>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            redirecting to home page in 3 seconds...
          </motion.span>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-10 bg-white rounded-lg shadow-lg text-center"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-3xl font-bold text-red-500 mb-4"
          >
            {message?.message || "Payment Failed"}
          </motion.h1>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-lg mb-2"
          >
            Your payment was not successful
          </motion.p>
          <motion.p
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-lg"
          >
            Please try again
          </motion.p>
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            redirecting to home page in 3 seconds...
          </motion.span>
        </motion.div>
      )}
    </div>
  );
}

export default Success;
