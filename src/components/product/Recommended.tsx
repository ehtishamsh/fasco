import { useState, useEffect } from "react";
import ShowcaseProducts from "../home/ShowcaseProducts";
import { Product as Data } from "@/lib/redux/types";
function Recommended() {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("https://dummyjson.com/products");
        const res = await req.json();
        const removetenProducts = res?.products.filter(
          //@ts-ignore
          (product: Data, i: number) => i < 4
        );

        setData(removetenProducts);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setData([]);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-8  max-sm:px-4 bg-background">
      <h1 className="text-2xl font-semibold mb-8">Recommended</h1>
      <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4 w-full">
        <ShowcaseProducts products={data} />
      </div>
    </div>
  );
}

export default Recommended;
