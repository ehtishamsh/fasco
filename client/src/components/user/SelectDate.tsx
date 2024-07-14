import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Order } from "@/lib/redux/types";

export function SelectDate({
  setOrders,
}: {
  setOrders: React.Dispatch<React.SetStateAction<Order[] | undefined>>;
}) {
  const handleSelect = (value: string) => {
    setOrders((prev) => {
      const currentDate = new Date();
      switch (value) {
        case "5":
          return prev?.slice(-5);
        case "15d":
        case "30d":
        case "6m":
          const daysMap: { [key: string]: number } = {
            "15d": 15,
            "30d": 30,
            "6m": 180,
          };
          const daysLimit = daysMap[value];
          return prev?.filter((order) => {
            const orderDate = new Date(order.createdAt);
            const dayDiff = Math.floor(
              (currentDate.getTime() - orderDate.getTime()) /
                (1000 * 60 * 60 * 24)
            );
            return dayDiff <= daysLimit;
          });
        case "all":
          return prev;
        default:
          return prev;
      }
    });
  };

  return (
    <Select onValueChange={handleSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Last 5 order" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="5" defaultChecked>
            Last 5 orders
          </SelectItem>
          <SelectItem value="15d">Last 15 days</SelectItem>
          <SelectItem value="30d">Last 30 days</SelectItem>
          <SelectItem value="6m">Last 6 months</SelectItem>
          <SelectItem value="all">All</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
