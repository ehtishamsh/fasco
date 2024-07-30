import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { BreadCrumbAdmin } from "../../BreadCrumAdmin";
import { Order, User } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface OrderDetail extends Order {
  user: {
    email: string;
    firstname: string;
    lastname: string;
  };
}
function ViewOrder() {
  const [order, setOrder] = useState<OrderDetail>();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(`http://localhost:4000/api/order/${id}`);
        const res = await req.json();
        setOrder(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setOrder({} as OrderDetail);
    };
  }, []);
  return (
    <div className="mt-10 px-10">
      <div className=" flex flex-col gap-5 ">
        <div className="flex flex-col gap-2">
          <BreadCrumbAdmin
            paths={["Admin", "Orders"]}
            end={`${order?.orderNumber}`}
          />
          <h1 className="text-3xl font-bold tracking-tight">View Order</h1>
          <span className="text-sm text-muted-foreground">
            View order details of user.
          </span>
        </div>
        <DropdownMenuSeparator />
        <div className="">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-semibold mb-6">Order Details</h1>

            {order?.user && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold">Customer Information</h2>
                <p className="mt-2">
                  <span className="font-semibold">Name:</span>
                  {order?.user?.firstname + " " + order?.user?.lastname}
                </p>
                <p className="mt-2">
                  <span className="font-semibold">Email:</span>{" "}
                  {order?.user.email}
                </p>
              </div>
            )}
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Order Information</h2>
              <p className="mt-2">
                <span className="font-semibold">Order No:</span>{" "}
                {order?.orderNumber}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Order Date:</span>{" "}
                {order?.createdAt}
              </p>
              <p className="mt-2">
                <span className="font-semibold">Total Amount:</span> $
                {order?.amount}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold">Shipping Address</h2>
              <p className="mt-2">
                <span className="font-semibold">Address:</span>{" "}
                {order?.address?.addressLine1}
              </p>
              <p className="mt-2">
                <span className="font-semibold">City:</span>{" "}
                {order?.address?.city}
              </p>
              <p className="mt-2">
                <span className="font-semibold">State:</span>{" "}
                {order?.address?.state}
              </p>
              <p className="mt-2">
                <span className="font-semibold">ZIP Code:</span>{" "}
                {order?.address?.postalCode}
              </p>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold">Order Items</h2>
              <table className="min-w-full bg-white">
                <thead>
                  <tr>
                    <th className="py-2">Product Name</th>
                    <th className="py-2">Quantity</th>
                    <th className="py-2">Price</th>
                    <th className="py-2">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order?.items &&
                    order?.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-2 border-b">{item.product.title}</td>
                        <td className="py-2 border-b">{item.quantity}</td>
                        <td className="py-2 border-b">${item.price}</td>
                        <td className="py-2 border-b">
                          ${Number(item.quantity) * Number(item.price)}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold">Order Status</h2>
              <select className="mt-2 block w-full p-2 border rounded">
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            <div className="mt-6">
              <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                Update Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewOrder;
