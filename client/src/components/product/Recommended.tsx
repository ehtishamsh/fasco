import { useState, useEffect } from "react";
import ShowcaseProducts from "../home/ShowcaseProducts";
import { Product } from "@/lib/redux/types";
import { useParams } from "react-router-dom";
function Recommended() {
  const [data, setData] = useState<Product[]>([]);
  const { category } = useParams();
  const firstCharacter = category?.split("").splice(0, 1);
  const remainingCharacter = category?.split("").splice(1).join("");
  const finalCategory =
    firstCharacter && firstCharacter[0].toUpperCase() + remainingCharacter;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch(
          "https://fascobackend-production.up.railway.app/api/products/category/" +
            finalCategory
        );
        const res = await req.json();
        const cut = res.data.slice(0, 4);
        setData(cut);
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
