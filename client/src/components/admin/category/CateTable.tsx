import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useEffect, useState } from "react";

export interface Cate {
  id: string;
  name: string;
}
export default function CatesTable() {
  const [getData, setData] = useState<Cate[]>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("http://localhost:4000/api/categories");
        const res = await req.json();
        setData(res.categories);
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
