import { Product } from "@/lib/redux/types";
import ShowcaseProducts from "../home/ShowcaseProducts";
import { useEffect, useState } from "react";
import SelectBy from "./SelectBy";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
            return brands.includes(product.brand.toLowerCase());
          } else if (price.length > 0) {
            return price.includes(product.price);
          }
          return { ...product };
        });

        setProducts(filterProducts.length > 0 ? filterProducts : res.products);
        if (select === "price") {
          setProducts((prev) =>
            prev.sort((a, b) => Number(a.price) - Number(b.price))
          );
        }
        if (select === "rating") {
          setProducts((prev) =>
            prev.sort((a, b) => Number(b.rating) - Number(a.rating))
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setProducts([]);
    };
  }, [
    brands,
    price,
    ram,
    screenSize,
    screenType,
    batteryCapacity,
    color,
    select,
    setProducts,
  ]);
  console.log(Math.ceil(products.length / 5));
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
        <div className="col-span-3">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Content;
