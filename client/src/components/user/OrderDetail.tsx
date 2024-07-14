import { useEffect, useState } from "react";
import { BreadCrumbAdmin } from "../admin/BreadCrumAdmin";
import ProgressBar from "./ProgressBar";
import ItemCard from "./ItemCard";
import AddressCard from "./AddressCard";
import { Address, Order } from "@/lib/redux/types";
import { Separator } from "../ui/separator";
import { useParams } from "react-router-dom";

interface OrderStatus {
  orderConfirmation: boolean;
  shipping: boolean;
  toDeliver: boolean;
}

interface Step {
  label: string;
  text: string;
  completed: boolean;
}

function OrderDetail() {
  const { id } = useParams();
  console.log(id);
  // @ts-ignore
  const [orders, setOrders] = useState<Order>();
  const [steps, setSteps] = useState<Step[]>([]);
  const [address, setAddress] = useState<Address[]>([]);

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
        label: "TO DELIVER",
        text:
          orders?.orderStatus === "DELIVERED"
            ? getCurrentDate()
            : "In Progress",
        completed: orders?.orderStatus === "DELIVERED" ? true : false,
      },
    ];
    setSteps(newSteps);
  }, [orders]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`http://localhost:4000/api/order/${id}`);
        const res = await req.json();
        setOrders(res.data);
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
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base max-sm:text-xs rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Order Detail
        </h1>
      </div>
      <div className="flex justify-between items-center mt-6 border border-gray-300/85 rounded-lg p-3">
        <div className="flex flex-col text-xs">
          <h1 className="mb-1 text-sm">Order #{orders?.orderNumber}</h1>
          <p className="text-gray-400">Placed on {new Date().toLocaleTimeString()} at 11:21:54</p>
        </div>
        <div className="flex gap-2">
          <span className="text-base text-gray-400">Total: </span>
          <span>$1000</span>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 max-sm:gap-2 border border-gray-300/85 rounded-lg p-4 max-sm:p-2">
        <h1 className="text-xs bg-yellow-200 text-yellow-600 py-1 px-2 w-fit">
          Currently in Shipping
        </h1>
        <div className="mt-10 px-10 max-sm:px-0">
          <ProgressBar steps={steps} />
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 max-sm:gap-2 border border-gray-300/85 rounded-lg p-4 max-sm:p-2">
        <ItemCard
          images={["http://localhost:4000/uploads/image_1718843579090.png"]}
          quantity={2}
          title="OnePlus 11"
          price={1000}
          orderNumber={1211893928372898}
        />
      </div>

      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-5">
        {/* Address Box */}
        <div className="mt-6 border border-gray-300/85 rounded-lg">
          {orders?.address && <AddressCard address={orders.address} />}
        </div>

        {/* Total Summary Box */}
        <div className="mt-6 border border-gray-300/85 rounded-lg p-4">
          <h2 className="text-sm font-semibold mb-2">Order Summary</h2>
          <div className="flex justify-between text-xs mb-1">
            <span>Subtotal:</span>
            <span>$1000</span>
          </div>
          <div className="flex justify-between text-xs mb-1">
            <span>Shipping:</span>
            <span>$20</span>
          </div>
          <div className="flex justify-between text-xs mb-1">
            <span>Tax:</span>
            <span>$80</span>
          </div>
          <div className="flex justify-between text-sm font-semibold mt-2">
            <span>Total:</span>
            <span>$1100</span>
          </div>
          <Separator />
          <div className="flex justify-between text-sm font-semibold mt-2">
            <span>Total Paid By COD:</span>
            <span>$1100</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetail;
