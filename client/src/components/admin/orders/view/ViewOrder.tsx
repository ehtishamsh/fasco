import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { BreadCrumbAdmin } from "../../BreadCrumAdmin";
import { Order } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SelectStatus from "../../SelectStatus";
import Loading from "@/components/ui/Loading";

interface OrderDetail extends Order {
  user: {
    email: string;
    firstname: string;
    lastname: string;
  };
}
function ViewOrder() {
  const [order, setOrder] = useState<OrderDetail>();
  const [loading, setLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState<string>(
    order?.orderStatus || ""
  );
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const req = await fetch(
          `https://fascobackend-production.up.railway.app/api/order/${id}`
        );
        const res = await req.json();
        console.log(res.data);
        setOrder(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setOrder({} as OrderDetail);
    };
  }, []);
  const handleStatusChange = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (orderStatus !== order?.orderStatus) {
      let status = [...(order?.status as string[])];

      const req = await fetch(
        `https://fascobackend-production.up.railway.app/api/order/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderNumber: order?.orderNumber,
            orderStatus:
              e.currentTarget.name === "CANCELLED" ? "CANCELLED" : orderStatus,
            payment_intent_id:
              e.currentTarget.name === "CANCELLED"
                ? order?.paymentIntentId
                : "",
            status: [
              ...status,
              e.currentTarget.name === "CANCELLED"
                ? "Your order has been cancelled"
                : orderStatus === "COMPLETED"
                ? "Your order has been delivered"
                : orderStatus === "SHIPPED"
                ? "Your order has been shipped"
                : orderStatus === "CONFIRMED"
                ? "Your order has been confirmed"
                : orderStatus === "PENDING"
                ? "Your order is being processed"
                : "Your order is being processed",
            ],
          }),
        }
      );

      const res = await req.json();
      if (res.success) {
        toast({
          title: "Success",
          description: "Order status updated successfully",
          variant: "success",
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    }
  };

  return (
    <div className="mt-10 px-7 max-sm:px-4">
      {loading ? (
        <div className="flex justify-center h-[60vh]">
          <Loading />
        </div>
      ) : (
        <>
          <div className=" flex flex-col gap-5 ">
            <div className="flex flex-col gap-2">
              <BreadCrumbAdmin
                paths={["Admin", "Orders"]}
                end={`${order?.orderNumber}`}
              />
              <h1 className="text-3xl mt-2  font-bold tracking-tight max-sm:text-xl">
                View Order
              </h1>
              <span className="text-sm max-sm:text-xs text-muted-foreground">
                View order details of user.
              </span>
            </div>
            <DropdownMenuSeparator />
            <div className="grid grid-cols-6 gap-4 max-md:grid-cols-1">
              <div className="col-span-4 max-md:col-span-1 bg-white rounded-lg p-4">
                <h1 className="text-xl max-sm:text-base font-semibold mb-5">
                  Order Number{" "}
                  <span className="text-yellow-400">#{order?.orderNumber}</span>
                </h1>
                <div className="grid grid-cols-1  gap-4 ">
                  <div className="border border-gray-300/85 rounded-lg  p-4">
                    <table className="w-full text-sm max-sm:text-xs border-collapse">
                      <thead>
                        <tr>
                          <th className="text-left p-3 text-base max-sm:text-sm ">
                            Items Summary
                          </th>
                          <th className="text-left p-3">QTY</th>
                          <th className="text-left p-3">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.items &&
                          order?.items.map((item) => (
                            <tr
                              key={item.id}
                              className="border-t border-gray-300/85"
                            >
                              <td className="text-left p-3 flex items-center">
                                <img
                                  src={`https://fascobackend-production.up.railway.app${item.product.cover}`}
                                  className="w-10 mr-2 "
                                  alt=""
                                />{" "}
                                <Link
                                  to={`/shop/${
                                    typeof item.product.category === "object" &&
                                    item.product.category.name.toLowerCase()
                                  }/${
                                    typeof item.product.brand === "object" &&
                                    item.product.brand.name.toLowerCase()
                                  }/${item.product.slug}`}
                                >
                                  {item.product.title}
                                  <br />
                                  <span className="text-sm max-sm:text-xs text-muted-foreground">
                                    {item.variant.variant} + $
                                    {item.variant.price}
                                  </span>
                                  <br />
                                  <span
                                    className="w-3 h-3 inline-block rounded-full border border-muted-foreground"
                                    style={{
                                      backgroundColor: item?.color?.color || "",
                                    }}
                                  >
                                    &nbsp;
                                  </span>
                                </Link>
                              </td>
                              <td className="text-left p-3">
                                x {item.quantity}
                              </td>
                              <td className="text-left p-3">${item.price}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="border border-gray-300/85 rounded-lg  p-4">
                    <h1 className="text-base max-sm:text-sm  font-bold p-3">
                      Customer Details
                    </h1>
                    <div className="flex justify-between items-center text-sm max-sm:text-xs border-t border-gray-300/85">
                      <span className="font-semibold p-3">Customer Email:</span>{" "}
                      <span>{order?.user && order?.user.email}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm max-sm:text-xs border-t border-gray-300/85">
                      <span className="font-semibold p-3">Customer Name:</span>{" "}
                      <span>
                        {order?.user && order?.user.firstname}{" "}
                        {order?.user && order?.user.lastname}
                      </span>
                    </div>
                  </div>
                  <div className="border border-gray-300/85 rounded-lg  p-4">
                    <h1 className="text-base max-sm:text-sm  font-bold p-3">
                      Delivery Address
                    </h1>
                    <div className="flex justify-between items-center text-sm max-sm:text-xs border-t border-gray-300/85">
                      <span className="font-semibold p-3">Full Name</span>{" "}
                      <span>
                        {order?.address &&
                          order?.address.firstname +
                            " " +
                            order?.address.lastname}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm max-sm:text-xs border-t border-gray-300/85">
                      <span className="font-semibold p-3">Address Line 1</span>{" "}
                      <span>
                        {order?.address && order?.address.addressLine1}
                      </span>
                    </div>

                    {order?.address?.addressLine2 && (
                      <div className="flex justify-between items-center text-sm max-sm:text-xs border-t border-gray-300/85">
                        <span className="font-semibold p-3">
                          Address Line 2
                        </span>{" "}
                        <span>
                          {order?.address && order?.address.addressLine2}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center text-sm max-sm:text-xs border-t border-gray-300/85">
                      <span className="font-semibold p-3">Country</span>{" "}
                      <span>{order?.address && order?.address.country}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm max-sm:text-xs border-t border-gray-300/85">
                      <span className="font-semibold p-3">State</span>{" "}
                      <span>{order?.address && order?.address.state}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm max-sm:text-xs border-t border-gray-300/85">
                      <span className="font-semibold p-3">City</span>{" "}
                      <span>{order?.address && order?.address.city}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm max-sm:text-xs border-t border-gray-300/85">
                      <span className="font-semibold p-3">Postal Code</span>{" "}
                      <span>{order?.address && order?.address.postalCode}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-2 flex flex-col gap-5 max-md:col-span-1 bg-white rounded-lg p-4">
                <div className="border border-gray-300/85 rounded-lg  p-4 h-fit">
                  <h1 className="text-base max-sm:text-sm  font-bold flex justify-between items-center">
                    Order Summary{" "}
                    <span className="text-yellow-600 rounded-md p-2 text-sm max-sm:text-xs font-semibold bg-yellow-200">
                      {order?.orderStatus}
                    </span>
                  </h1>
                  <div className="flex justify-between items-center text-sm max-sm:text-xs mt-8">
                    <span className="font-semibold">Order Created</span>
                    <span>
                      {order?.createdAt &&
                        new Date(order?.createdAt)?.toDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm max-sm:text-xs mt-4">
                    <span className="font-semibold">Order Time</span>
                    <span>
                      {order?.createdAt &&
                        new Date(order?.createdAt)?.toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm max-sm:text-xs mt-4">
                    <span className="font-semibold">Subtotal</span>
                    <span>${order?.amount && order?.amount}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm max-sm:text-xs mt-3">
                    <span className="font-semibold">Paid Status</span>
                    <span className="text-green-500 bg-green-200 rounded-md p-1 text-sm max-sm:text-xs font-semibold">
                      {order?.paymentStatus && order?.paymentStatus}
                    </span>
                  </div>
                </div>
                <div className="border border-gray-300/85 rounded-lg  p-4 h-fit">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-semibold">Total</span>
                    <span>${order?.amount && order?.amount}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="border border-gray-300/85 rounded-lg  p-4 h-fit">
                    <SelectStatus
                      selectStatus={orderStatus}
                      setSelectStatus={setOrderStatus}
                    />
                    <Button
                      variant={"default"}
                      className="w-full mt-4"
                      onClick={(e) => handleStatusChange(e)}
                    >
                      Change
                    </Button>
                  </div>
                  <div className="border border-gray-300/85 rounded-lg  p-4 h-fit">
                    <Button
                      variant={"destructive"}
                      className="w-full"
                      name="CANCELLED"
                      onClick={(e) => handleStatusChange(e)}
                    >
                      Cancel Order
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewOrder;
