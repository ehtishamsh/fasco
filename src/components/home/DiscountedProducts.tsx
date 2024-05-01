import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ShowcaseProducts from "./ShowcaseProducts";
import { Reveal } from "../animation/Reveal";

function DiscountedProducts() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetehData = async () => {
      try {
        const getres = await fetch("https://fakestoreapi.com/products", {
          method: "GET",
        });
        const res = await getres.json();
        const removetenProducts = res.filter((item: any, i: number) => {
          return i >= 12;
        });
        setProducts(removetenProducts);
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
  return (
    <div className="max-w-6xl  mx-auto mt-28 px-2">
      <Reveal delayTime={0.5}>
        <Button variant={"secondary"}>
          <span className={`transition-all duration-300 `}>
            Discounted Products
          </span>
        </Button>
      </Reveal>
      <Reveal delayTime={0.8}>
        <div className="grid grid-cols-4 gap-4 mt-10 max-sm:grid-cols-2 max-md:grid-cols-3">
          <ShowcaseProducts products={products} handleclick={handleclick} />
        </div>
      </Reveal>
    </div>
  );
}

export default DiscountedProducts;
