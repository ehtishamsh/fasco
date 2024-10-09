import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export default function OrdersTable() {
  const [getData, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(
          "https://fascobackend-production.up.railway.app/api/orders"
        );
        const res = await req.json();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="  pb-8 max-w-7xl">
      <DataTable columns={columns} data={getData?.orders || []} />
    </div>
  );
}
