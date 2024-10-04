import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Order, User } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../ui/Loading";

export function RecentOrderTable() {
  const [orders, setOrders] = useState<Order[]>();
  const [loading, setLoading] = useState(false);
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

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
  return (
    <>
      {loading ? (
        <Loading />
      ) : orders && orders.length === 0 ? (
        <div className="mb-6 my-8 flex justify-center items-center">
          <h1 className="font-semibold">No Orders</h1>
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow className="max-sm:text-xs">
              <TableHead className="w-[100px]  max-sm:w-[70px]">
                Order #
              </TableHead>
              <TableHead className="w-[100px] ">Placed On</TableHead>
              <TableHead className="text-center">Images</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="text-right">&nbsp;</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders &&
              orders?.map((item, i) => (
                <TableRow key={i} className="max-sm:text-xs">
                  <TableCell className="font-medium">
                    {item?.orderNumber}
                  </TableCell>
                  <TableCell>
                    {new Date(item?.createdAt).toDateString()}
                  </TableCell>
                  <TableCell className="flex gap-2 max-sm:flex-col text-center justify-center items-center ">
                    {item.items &&
                      item.items.map((orderItems) => (
                        <img
                          src={`https://fascobackend-production.up.railway.app${orderItems.product.cover}`}
                          className="h-12 w-12 max-sm:h-8 max-sm:w-8 "
                        />
                      ))}
                  </TableCell>
                  <TableCell className="text-right">
                    USD ${item.amount}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      to={"/orders/view/" + item.orderNumber}
                      className="bg-yellow-200 py-1 px-2 max-sm:px-1  max-sm:text-xs text-sm rounded-xl text-yellow-900"
                    >
                      Manage
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      )}{" "}
    </>
  );
}
