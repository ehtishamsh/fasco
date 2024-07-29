import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export default function ProductsTable() {
  const [getData, setData] = useState<any>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("http://localhost:4000/api/products");
        const res = await req.json();
        setData(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className=" pb-8">
      <DataTable columns={columns} data={getData?.products || []} />
    </div>
  );
}
