import { HeartIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import TopProductsButton from "./TopProductsButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowcaseProducts from "./ShowcaseProducts";

function TopProducts() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetehData = async () => {
      try {
        const getres = await fetch("https://fakestoreapi.com/products", {
          method: "GET",
        });
        const res = await getres.json();
        setProducts(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetehData();
    return () => {
      setProducts([]);
    };
  }, []);

  const handleclick = (e: any) => {
    e.preventDefault();
  };
  const [checkActive, setCheckActive] = useState("new");

  return (
    <div className="max-w-6xl mt-28 mx-auto">
      <TopProductsButton active={checkActive} setActive={setCheckActive} />
      <div className="grid grid-cols-4 gap-4 mt-10 max-sm:grid-cols-2 max-md:grid-cols-3">
        <ShowcaseProducts products={products} handleclick={handleclick} />
      </div>
    </div>
  );
}

export default TopProducts;
