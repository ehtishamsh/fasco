import { useEffect, useState } from "react";
import { BreadCrum } from "../BreadCrum";
import ShowcaseProducts from "../home/ShowcaseProducts";
import { Product } from "@/lib/redux/types";
import Loading from "../ui/Loading";
import { Link } from "react-router-dom";

function OffersShop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
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
    <div className="max-w-6xl mx-auto px-3 mb-7">
      <Link
        to="/smartphones/samsung/samsung-galaxy-s24"
        className="w-full mt-16 max-md:mt-8 mb-8 block"
      >
        <img src="/offers.png" alt="" className="w-full object-cover" />
      </Link>
      <BreadCrum cat="discount" />
      {loading ? (
        <div className="mt-10">
          <div className="h-[60vh] flex justify-center items-center">
            <Loading />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4 max-sm:grid-cols-2 mt-12 max-md:grid-cols-3">
          <ShowcaseProducts products={products} />
        </div>
      )}
    </div>
  );
}

export default OffersShop;
