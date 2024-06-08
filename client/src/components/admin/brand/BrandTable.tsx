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
        const req = await fetch("http://localhost:4000/api/categories");
        const res = await req.json();
        setData(res.brands);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className=" mx-auto pb-8 max-w-7xl">
      <DataTable columns={columns} data={getData || []} />
    </div>
  );
}
