import { Product } from "@/lib/redux/types";
import ShowcaseProducts from "../home/ShowcaseProducts";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
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
import { Button } from "../ui/button";
function Content({
  batteryCapacity,
  price,
  ram,
  screenSize,
  screenType,
  brands,
  color,
  open,
  setOpen,
}: {
  brands: string[];
  batteryCapacity: string[];
  color: string[];
  price: string[];
  ram: string[];
  screenSize: string[];
  screenType: string[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  return (
    <div className="px-2 max-md:px-0">
      <div className="flex justify-between items-center max-md:grid max-md:grid-cols-2 max-md:gap-5">
        <p className="text-gray-400 text-sm max-md:col-span-2 max-md:order-1 ">
          Selected Products :{" "}
          <span className="text-black font-semibold text-base">
            {products.length}
          </span>
        </p>
        <div className=" hidden max-md:block">
          <Button
            className="flex justify-between items-center text-[13px] w-full font-normal"
            variant={"outline"}
            onClick={() => setOpen(!open)}
          >
            <span className="flex justify-between items-center w-full">
              Filter
              <span>
                <CiFilter className="h-4 w-4 text-gray-500" />
              </span>
            </span>
          </Button>
        </div>
        <SelectBy select={select} setSelect={setSelect} />
      </div>
      <div className="mt-10 grid grid-cols-3 gap-3 max-md:grid-cols-2">
        <ShowcaseProducts products={products} />
        <div className="col-span-3 max-md:col-span-2">
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
