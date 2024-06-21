import TopProductsButton from "./TopProductsButton";
import { useEffect, useState } from "react";
import ShowcaseProducts from "./ShowcaseProducts";
import { Reveal } from "../animation/Reveal";

function TopProducts() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const fetehData = async () => {
      try {
        const getres = await fetch("http://localhost:4000/api/products", {
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

  const [checkActive, setCheckActive] = useState("new");

  return (
    <div className="max-w-6xl mt-28 mx-auto px-2 max-md:mt-16 max-sm:mt-10">
      <Reveal delayTime={0.5}>
        <TopProductsButton active={checkActive} setActive={setCheckActive} />
      </Reveal>
      <Reveal delayTime={0.8}>
        <div className="grid grid-cols-4 gap-4 mt-10 max-sm:grid-cols-2 max-md:grid-cols-3">
          <ShowcaseProducts products={products} />
        </div>
      </Reveal>
    </div>
  );
}

export default TopProducts;
