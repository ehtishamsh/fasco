import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";

import { BreadCrumbAdmin } from "../../BreadCrumAdmin";
import { Order } from "@/lib/redux/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function ViewOrder() {
  const [order, setOrder] = useState<Order>();
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
      setOrder({} as Order);
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
      </div>
    </div>
  );
}

export default ViewOrder;
