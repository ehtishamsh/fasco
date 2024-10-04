import { useEffect, useState } from "react";
import { BreadCrumbAdmin } from "../admin/BreadCrumAdmin";
import ProgressBar from "./ProgressBar";
import ItemCard from "./ItemCard";
import { Order } from "@/lib/redux/types";
import { Separator } from "../ui/separator";
import { useParams } from "react-router-dom";
import OrderAddress from "./OrderAddress";
import Loading from "../ui/Loading";

interface Step {
  label: string;
  text: string;
  completed: boolean;
}

function OrderDetail() {
  const { id } = useParams();
  // @ts-ignore
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order>();
  const [steps, setSteps] = useState<Step[]>([]);

  const getCurrentDate = () => new Date().toLocaleString();
  useEffect(() => {
    const newSteps = [
      {
        label: "ORDER CONFIRMATION",
        text:
          orders?.orderStatus === "CONFIRMED"
            ? getCurrentDate()
            : "In Progress",
        completed: orders?.orderStatus === "CONFIRMED" ? true : false,
      },
      {
        label: "SHIPPING",
        text:
          orders?.orderStatus === "SHIPPED" ? getCurrentDate() : "In Progress",
        completed: orders?.orderStatus === "SHIPPED" ? true : false,
      },
      {
        label: "DELIVERED",
        text:
          orders?.orderStatus === "COMPLETED"
            ? getCurrentDate()
            : "In Progress",
        completed: orders?.orderStatus === "COMPLETED" ? true : false,
      },
    ];
    if (orders?.orderStatus === "SHIPPED") {
      newSteps[0].completed = true;
    }
    if (orders?.orderStatus === "COMPLETED") {
      newSteps[0].completed = true;
      newSteps[1].completed = true;
    }
    setSteps(newSteps);
  }, [orders]);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const req = await fetch(`http://localhost:4000/api/order/${id}`);
        const res = await req.json();
        setOrders(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();

    return () => {};
  }, []);
  return (
    <div className="w-full">
      <BreadCrumbAdmin paths={["Dashboard"]} end={"Address"} />
      {loading ? (
        <div className="mt-16 flex justify-center h-[50vh]">
          <Loading />
        </div>
      ) : (
        <>
          <div className="bg-accent rounded-lg w-fit p-1 mt-6">
            <h1 className="text-base max-sm:text-xs rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
              Order Detail
            </h1>
          </div>
          <div className="flex justify-between items-center mt-6 border border-gray-300/85 rounded-lg p-3">
            <div className="flex flex-col text-xs">
              <h1 className="mb-1 text-sm">Order #{orders?.orderNumber}</h1>
              <p className="text-gray-400">
                Placed on{" "}
                {orders?.createdAt
                  ? new Date(orders.createdAt).toDateString()
                  : "-"}{" "}
                at{" "}
                {orders?.createdAt
                  ? new Date(orders.createdAt).toLocaleTimeString()
                  : "-"}
              </p>
            </div>
            <div className="flex gap-2">
              <span className="text-base text-gray-400">Total: </span>
              <span>${orders?.amount}</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-4 max-sm:gap-2 border border-gray-300/85 rounded-lg p-4 max-sm:p-2">
            <h1
              className={`text-xs ${
                orders?.orderStatus === "CANCELLED"
                  ? "text-red-500 bg-red-100"
                  : "bg-yellow-200 text-yellow-600"
              } py-1 px-2 w-fit`}
            >
              {orders?.orderStatus}
            </h1>
            <div className="mt-10 px-10 max-sm:px-0">
              <ProgressBar steps={steps} status={orders?.status} />
            </div>
          </div>
          <div
            className={`mt-6 grid grid-cols-1 gap-4 max-sm:gap-2 border border-gray-300/85 ${
              orders?.orderStatus === "CANCELLED" ? "bg-red-100" : ""
            } rounded-lg p-4 max-sm:p-2 relative`}
          >
            {orders?.items?.map(
              (item, index) =>
                item && (
                  <ItemCard
                    key={index}
                    title={item.product.title}
                    cover={item.product.cover}
                    price={
                      Number(item.product.discounted) > 0
                        ? item.product.discounted
                        : item.product.price
                    }
                    quantity={item.quantity}
                    category={Object(item.product.category).name}
                    brand={Object(item.product.brand).name}
                    orderNumber={orders?.orderNumber}
                    selectedColor={item?.color}
                    selectedVariant={item?.variant}
                    deliverd={steps[2].completed}
                    confirmed={steps[0].completed}
                    orderStatus={orders?.orderStatus}
                    payment_intent_id={orders?.paymentIntentId || ""}
                  />
                )
            )}
          </div>

          <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
            {/* Address Box */}
            <div className="mt-6 border border-gray-300/85 rounded-lg">
              {orders?.address && <OrderAddress address={orders.address} />}
            </div>

            {/* Total Summary Box */}
            <div className="mt-6 border border-gray-300/85 rounded-lg p-4">
              <h2 className="text-sm font-semibold mb-2">Order Summary</h2>
              <div className="flex justify-between text-xs mb-1">
                <span>Subtotal:</span>
                <span>${orders?.amount}</span>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span>Shipping:</span>
                <span>$0</span>
              </div>
              <div className="flex justify-between text-xs mb-1">
                <span>Tax:</span>
                <span>$0</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm font-semibold mt-2">
                <span>Total:</span>
                <span>${orders?.amount}</span>
              </div>
              <Separator />
              <span className="text-xs text-gray-400">
                Status : {orders?.paymentStatus}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default OrderDetail;
