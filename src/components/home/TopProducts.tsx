import { HeartIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import TopProductsButton from "./TopProductsButton";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ShowcaseProducts from "./ShowcaseProducts";
import { Reveal } from "../animation/Reveal";

function TopProducts() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetehData = async () => {
      try {
        const getres = await fetch("https://dummyjson.com/products", {
          method: "GET",
        });
        const res = await getres.json();
        setProducts(res.products);
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
    <div className="max-w-6xl mt-28 mx-auto px-2 max-md:mt-16 max-sm:mt-10">
      <Reveal delayTime={0.5}>
        <TopProductsButton active={checkActive} setActive={setCheckActive} />
      </Reveal>
      <Reveal delayTime={0.8}>
        <div className="grid grid-cols-4 gap-4 mt-10 max-sm:grid-cols-2 max-md:grid-cols-3">
          <ShowcaseProducts products={products} handleclick={handleclick} />
        </div>
      </Reveal>
    </div>
  );
}

export default TopProducts;
