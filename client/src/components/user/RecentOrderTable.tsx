import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
const orders = [
  {
    orderNo: "ORD001",
    placedOn: "2023-06-01",
    items: [
      {
        img: "nord3.png",
      },
      {
        img: "nord3.png",
      },
    ],
    totalPrice: "$250.00",
  },
  {
    orderNo: "ORD002",
    placedOn: "2023-06-05",
    items: [
      {
        img: "item3.jpg",
      },
    ],
    totalPrice: "$150.00",
  },
  {
    orderNo: "ORD003",
    placedOn: "2023-06-10",
    items: [
      {
        img: "item4.jpg",
      },
    ],
    totalPrice: "$350.00",
  },
  {
    orderNo: "ORD004",
    placedOn: "2023-06-15",
    items: [
      {
        img: "item7.jpg",
      },
    ],
    totalPrice: "$450.00",
  },
  {
    orderNo: "ORD005",
    placedOn: "2023-06-20",
    items: [
      {
        img: "item8.jpg",
      },
    ],
    totalPrice: "$550.00",
  },
  {
    orderNo: "ORD006",
    placedOn: "2023-06-25",
    items: [
      {
        img: "item10.jpg",
      },
    ],
    totalPrice: "$200.00",
  },
  {
    orderNo: "ORD007",
    placedOn: "2023-06-30",
    items: [
      {
        img: "item11.jpg",
      },
    ],
    totalPrice: "$300.00",
  },
];

export function RecentOrderTable() {
  return (
    <Table>
      <TableCaption>A list of your recent items.</TableCaption>
      <TableHeader>
        <TableRow className="max-sm:text-xs">
          <TableHead className="w-[100px]  max-sm:w-[70px]">Order #</TableHead>
          <TableHead className="w-[100px] ">Placed On</TableHead>
          <TableHead className="text-center">Items</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead className="text-right">&nbsp;</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((item, i) => (
          <TableRow key={i} className="max-sm:text-xs">
            <TableCell className="font-medium">{item.orderNo}</TableCell>
            <TableCell>{item.placedOn}</TableCell>
            <TableCell className="flex gap-2 max-sm:flex-col text-center justify-center items-center ">
              {item.items.map((item) => (
                <img
                  src={`http://localhost:4000/uploads/${item.img}`}
                  className="h-12 w-12 max-sm:h-8 max-sm:w-8 "
                />
              ))}
            </TableCell>
            <TableCell className="text-right">{item.totalPrice}</TableCell>
            <TableCell className="text-right">
              <Link
                to={"/order/" + item.orderNo}
                className="bg-blue-200 py-1 px-2 max-sm:px-1  max-sm:text-xs text-sm rounded-xl text-blue-900"
              >
                Manage
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
