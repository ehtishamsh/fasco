import { Product } from "@/lib/redux/types";
import ShowcaseProducts from "../home/ShowcaseProducts";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";

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
        console.log(filterProducts);
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
  return (
    <div className="px-2">
      <div className="flex justify-between">
        <p className="text-gray-400 text-sm">
          Selected Products:
          <span className="text-black font-semibold text-base"> 144</span>
        </p>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Best match" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="best">Best match</SelectItem>
              <SelectItem value="rating">By rating</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="top">Top Selling</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="mt-10 grid grid-cols-3 gap-3">
        <ShowcaseProducts products={products} />
      </div>
    </div>
  );
}

export default Content;
