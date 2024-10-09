import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export interface Brand {
  id: string;
  name: string;
}
export default function BrandTable() {
  const [getData, setData] = useState<Brand[]>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(
          "https://fascobackend-production.up.railway.app/api/brands"
        );
        const res = await req.json();
        setData(res.brands);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className=" pb-8">
      <DataTable columns={columns} data={getData || []} />
    </div>
  );
}
