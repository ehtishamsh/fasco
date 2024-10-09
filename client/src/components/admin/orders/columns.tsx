import { Button } from "@/components/ui/button";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Order } from "@/lib/redux/types";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "cover",
    header: "Cover",
    cell: function Cell({ row }) {
      const order = row.original;
      const images = order.items?.map((prev) => {
        return (
          <img
            src={`https://fascobackend-production.up.railway.app${prev.product.cover}`}
            className="max-w-20 max-h-20  max-sm:max-w-14 max-sm:max-h-14 object-contain border border-border rounded-lg"
            alt="cover image"
          />
        );
      });
      return <div className="flex gap-2">{images}</div>;
    },
  },
  {
    accessorKey: "orderNumber",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order No.
          <ArrowUpDown className="ml-2 h-3 w-3" />
        </Button>
      );
    },
    cell: function Cell({ row }) {
      const order = row.original;
      const orderNo = order.orderNumber;
      return (
        <p className="line-clamp-1 max-sm:text-xs bg-gray-200 p-1 text-center rounded-md w-fit">
          {orderNo}
        </p>
      );
    },
  },
  {
    accessorKey: "orderStatus",
    header: "Status",

    cell: function Cell({ row }) {
      const order = row.original;
      return (
        <p
          className={`line-clamp-1 max-sm:text-xs text-center  px-2 py-1 rounded-md w-fit ${
            order.orderStatus === "PENDING"
              ? "bg-yellow-200 text-yellow-600"
              : order.orderStatus === "CONFIRMED"
              ? "bg-purple-200 text-purple-600"
              : order.orderStatus === "SHIPPED"
              ? "bg-blue-200 text-blue-600"
              : order.orderStatus === "DELIVERED"
              ? "bg-teal-200 text-teal-600"
              : order.orderStatus === "COMPLETED"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {order.orderStatus}
        </p>
      );
    },
  },

  {
    accessorKey: "amount",
    header: "Total",

    cell: function Cell({ row }) {
      const order = row.original;
      return (
        <p className="line-clamp-1 max-sm:text-xs font-semibold">
          ${order?.amount}
        </p>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: "Payment Status",

    cell: function Cell({ row }) {
      const order = row.original;
      return (
        <p
          className={`line-clamp-1 px-2 py-1 rounded-md text-center max-sm:text-xs w-fit ${
            order?.paymentStatus === "PAID"
              ? "bg-green-200 text-green-600"
              : "bg-red-200 text-red-600"
          }`}
        >
          {order?.paymentStatus}
        </p>
      );
    },
  },

  {
    accessorKey: "Action",
    header: "Action",

    id: "actions",
    cell: function Cell({ row }) {
      const order = row.original;
      return (
        <Link
          className="text-sm items-center flex gap-2"
          to={`/admin/orders/${order.orderNumber}`}
        >
          View
          <Eye className="h-4 w-4" />
        </Link>
      );
    },
  },
];
