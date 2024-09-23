import TopProductsButton from "./TopProductsButton";
import { useEffect, useState } from "react";
import ShowcaseProducts from "./ShowcaseProducts";
import { Reveal } from "../animation/Reveal";
import { Product as ProductType } from "@/lib/redux/types";
import Loading from "../ui/Loading";

function TopProducts() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [products2, setProducts2] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const getres = await fetch("http://localhost:4000/api/products", {
          method: "GET",
        });
        const res = await getres.json();

        const sortedProducts = [...res.products].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setProducts(sortedProducts);
        setProducts2(sortedProducts);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setProducts([]);
    };
  }, []);

  const [checkActive, setCheckActive] = useState("new");

  useEffect(() => {
    setProducts(products2);

    // Sort by new arrivals
    if (checkActive === "new") {
      const sortedProducts = [...products].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      const slicedProducts = sortedProducts.slice(0, 20);
      setProducts(slicedProducts);
    }

    // Sort by best seller (number of orders)
    if (checkActive === "best") {
      const sortedProducts = [...products2].sort(
        (a, b) => (b.orders || 0) - (a.orders || 0)
      );
      const slicedProducts = sortedProducts.slice(0, 20);
      setProducts(slicedProducts);
    }

    // Sort by price
    if (checkActive === "price") {
      const sortedProducts = [...products].sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
      const slicedProducts = sortedProducts.slice(0, 20);
      setProducts(slicedProducts);
    }

    // Sort by rating (assuming 'rating' field exists)
    if (checkActive === "rating") {
      const sortedProducts = [...products].sort(
        (a, b) => (b.rating || 0) - (a.rating || 0) // Sort by highest rating
      );
      const slicedProducts = sortedProducts.slice(0, 20);
      setProducts(slicedProducts);
    }
  }, [checkActive, products2]);

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
