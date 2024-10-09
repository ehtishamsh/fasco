import { Link } from "react-router-dom";
import { BreadCrumbAdmin } from "../admin/BreadCrumAdmin";
import { SelectDate } from "./SelectDate";
import { useEffect, useState } from "react";
import { Order, User } from "@/lib/redux/types";
import Loading from "../ui/Loading";

function Orders() {
  const [orders, setOrders] = useState<Order[]>();
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://fascobackend-production.up.railway.app/api/order/user/" +
            user.id
        );
        const data = await response.json();
        setOrders(data.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {};
  }, []);

  const renderOrders = orders?.map((order) => {
    return (
      <div className="border border-gray-300/85 rounded-lg mt-3 gap-2 text-sm  items-center">
        <div className="flex justify-between items-center border-b border-gray-300/85  px-4 py-2 ">
          <div className=" flex flex-col gap-1">
            <span>
              Order
              <Link
                className="text-yellow-600"
                to={`/order/view/${order.orderNumber}`}
              >
                {" "}
                #{order.orderNumber}
              </Link>
            </span>
            <span className="text-gray-400 text-xs">
              {new Date(order.createdAt).toDateString()} at{" "}
              {new Date(order.createdAt).toLocaleTimeString()}
            </span>
          </div>
          <Link
            to={`/orders/view/${order.orderNumber}`}
            className="bg-yellow-200 py-1 px-2 max-sm:px-1  max-sm:text-xs text-sm rounded-xl text-yellow-900"
          >
            Manage
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-6 gap-2 px-6 py-2  ">
          <div className="text-left w-full max-w-[170px] max-sm:max-w-[50px] max-sm:col-span-2  flex gap-1">
            {order.items?.map((item) => {
              return (
                <img
                  src={`https://fascobackend-production.up.railway.app${item.product.cover}`}
                  alt=""
                  className="w-20 h-20 max-sm:w-full max-sm:h-full max-sm:object-contain"
                />
              );
            })}
          </div>
          <div className="col-span-4 max-sm:ml-3">
            <div className="flex flex-col">
              {order.items?.map((item) => (
                <h1 className="border-b pb-1 border-gray-300 w-fit">
                  {item.product.title}
                </h1>
              ))}
            </div>
          </div>
          <div className="max-sm:col-span-3 max-sm:mt-4">
            <span>
              {order.items?.map((item) => (
                <>
                  <span className="text-center text-gray-600">
                    Qty: {item.quantity} x ${item.product.price}
                  </span>
                  {orders.length > 1 && <br />}
                </>
              ))}
            </span>
          </div>

          <div className="max-sm:col-span-3">
            <span
              className={`${
                order?.orderStatus === "CANCELLED"
                  ? "text-red-500 bg-red-100"
                  : "bg-yellow-200 text-yellow-600"
              } py-1 px-2 max-sm:px-1 text-xs rounded-xl`}
            >
              {order.orderStatus}
            </span>
          </div>
          <div className="max-sm:col-span-6">
            <span className="font-semibold text-gray-600">
              Total: ${order.amount}
            </span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div className="w-full">
      <BreadCrumbAdmin paths={["Dashboard"]} end={"Orders"} />
      <div className="bg-accent rounded-lg w-fit p-1 mt-6">
        <h1 className="text-base max-sm:text-xs rounded-lg font-semibold tracking-tight text-foreground bg-background py-1 px-3">
          Orders
        </h1>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-4 max-sm:gap-2">
        <div className="border border-gray-300/85 rounded-lg  px-4 py-2 flex gap-2 text-sm  items-center">
          Show: <SelectDate setOrders={setOrders} />
        </div>
        {loading ? (
          <div className="h-[50vh] flex justify-center items-center">
            <Loading />
          </div>
        ) : (
          renderOrders
        )}
      </div>
    </div>
  );
}

export default Orders;
