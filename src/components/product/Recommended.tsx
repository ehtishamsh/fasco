import React, { useState, useEffect } from "react";
import ShowcaseProducts from "../home/ShowcaseProducts";
interface Data {
  id: string;
  title: string;
  price: string;
  thumbnail: string;
  category: string;
}
function Recommended() {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("https://dummyjson.com/products");
        const res = await req.json();
        const removetenProducts = res?.products.filter(
          (product: Data, i: number) => i < 4
        );
        console.log(removetenProducts);
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
  const handleclick = (e: any) => {
    e.preventDefault();
  };
  return (
    <div className="max-w-6xl mx-auto px-8  max-sm:px-4 bg-background">
      <h1 className="text-2xl font-semibold mb-8">Recommended</h1>
      <div className="grid grid-cols-4 max-md:grid-cols-3 max-sm:grid-cols-2 gap-4 w-full">
        <ShowcaseProducts products={data} handleclick={handleclick} />
      </div>
    </div>
  );
}

export default Recommended;
