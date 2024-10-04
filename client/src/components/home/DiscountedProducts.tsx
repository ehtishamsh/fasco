import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ShowcaseProducts from "./ShowcaseProducts";
import { Reveal } from "../animation/Reveal";
import { Product } from "@/lib/redux/types";
import Loading from "../ui/Loading";

function DiscountedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetehData = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/products", {
          method: "GET",
        });
        const data = await res.json();
        // filter products by discount
        const filteredProducts = data.products.filter(
          (product: Product) => Number(product?.discounted) > 0
        );

        setProducts(filteredProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetehData();
    return () => {
      setProducts([]);
    };
  }, []);

  return (
    <div className="max-w-6xl  mx-auto mt-28 max-md:mt-14 max-sm:mt-10 px-2">
      <Reveal delayTime={0.5}>
        <Button variant={"secondary"}>
          <span className={`transition-all duration-300 `}>
            Discounted Products
          </span>
        </Button>
      </Reveal>
      {loading ? (
        <div className="mt-10">
          <div className="h-[60vh] flex justify-center items-center">
            <Loading />
          </div>
        </div>
      ) : (
        <Reveal delayTime={0.8}>
          <div className="grid grid-cols-4 gap-4 mt-10 max-sm:grid-cols-2 max-md:grid-cols-3">
            <ShowcaseProducts products={products} />
          </div>
        </Reveal>
      )}
    </div>
  );
}

export default DiscountedProducts;
