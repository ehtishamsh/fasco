import TopProductsButton from "./TopProductsButton";
import { useEffect, useState } from "react";
import ShowcaseProducts from "./ShowcaseProducts";
import { Reveal } from "../animation/Reveal";
import { Product as ProductType } from "@/lib/redux/types";
import Loading from "../ui/Loading";

function TopProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    const fetehData = async () => {
      try {
        const getres = await fetch("http://localhost:4000/api/products", {
          method: "GET",
        });
        const res = await getres.json();
        const sortedProducts = [...res.products].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        const sortedProducts2 = sortedProducts.slice(0, 20);
        setProducts(sortedProducts2);
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

  const [checkActive, setCheckActive] = useState("new");

  useEffect(() => {
    if (checkActive === "new") {
      const sortedProducts = [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setProducts(sortedProducts);
    }

    if (checkActive === "best") {
      const sortedProducts = [...products].sort(
        (a: any, b: any) => b.orders - a.orders
      );
      setProducts(sortedProducts);
    }
    if (checkActive === "price") {
      const sortedProducts = [...products].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
      setProducts(sortedProducts);
    }
  }, [checkActive]);
  return (
    <div className="max-w-6xl mt-28 mx-auto px-2 max-md:mt-16 max-sm:mt-10">
      <Reveal delayTime={0.5}>
        <TopProductsButton active={checkActive} setActive={setCheckActive} />
      </Reveal>
      {loading ? (
        <div className="mt-10">
          <div className="h-[60vh] flex justify-center items-center">
            <Loading />
          </div>
        </div>
      ) : (
        <Reveal delayTime={0.8} width="100%">
          <div className="grid grid-cols-4 gap-4 mt-10 max-sm:grid-cols-2 max-md:grid-cols-3">
            <ShowcaseProducts products={products} />
          </div>
        </Reveal>
      )}
    </div>
  );
}

export default TopProducts;
