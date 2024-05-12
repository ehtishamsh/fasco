import { Product } from "@/lib/redux/types";
import ShowcaseProducts from "../home/ShowcaseProducts";
import { useEffect, useState } from "react";
import SelectBy from "./SelectBy";

function Content({
  batteryCapacity,
  price,
  ram,
  screenSize,
  screenType,
  brands,
  color,
}: {
  brands: string[];
  batteryCapacity: string[];
  color: string[];
  price: string[];
  ram: string[];
  screenSize: string[];
  screenType: string[];
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [select, setSelect] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const req = await fetch("https://dummyjson.com/products");
        const res = await req.json();
        const filterProducts = res?.products.filter((product: Product) => {
          if (brands.length > 0) {
            return brands.includes(product.brand);
          } else if (price.length > 0) {
            return price.includes(product.price);
          }
          return { ...product };
        });

        setProducts(filterProducts.length > 0 ? filterProducts : res.products);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setProducts([]);
    };
  }, [brands, price, ram, screenSize, screenType, batteryCapacity, color]);
  useEffect(() => {
    if (select === "price") {
      setProducts((prev) =>
        prev.sort((a, b) => Number(a.price) - Number(b.price))
      );
    } else if (select === "rating") {
      setProducts((prev) => prev.sort((a, b) => a.rating - b.rating));
    }
  }, [select, products]);
  return (
    <div className="px-2">
      <div className="flex justify-between">
        <p className="text-gray-400 text-sm">
          Selected Products:
          <span className="text-black font-semibold text-base"> 144</span>
        </p>
        <SelectBy select={select} setSelect={setSelect} />
      </div>
      <div className="mt-10 grid grid-cols-3 gap-3">
        <ShowcaseProducts products={products} />
      </div>
    </div>
  );
}

export default Content;
