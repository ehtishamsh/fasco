import { Product } from "@/lib/redux/types";
import ShowcaseProducts from "../home/ShowcaseProducts";
import { useEffect, useMemo, useState } from "react";
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
import { useParams } from "react-router-dom";
import Loading from "../ui/Loading";
import PulseLoading from "../ui/PulseLoading";
function Content({
  loading,
  setLoading,
  batteryCapacity,
  price,
  ram,
  screenSize,
  brands,
  cpu,
  mainCamera,
  frontCamera,
  screenType,
  lens,
  zoom,
  megapixels,
  aperture,
  videoResolution,
  storage,
  gpu,
  maxResolution,
  open,
  setOpen,
}: {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  brands: string[];
  batteryCapacity: string[];
  price: string[];
  ram: string[];
  screenSize: string[];
  cpu: string[];
  mainCamera: string[];
  frontCamera: string[];
  screenType: string[];
  lens: string[];
  zoom: string[];
  megapixels: string[];
  aperture: string[];
  videoResolution: string[];
  storage: string[];
  gpu: string[];
  maxResolution: string[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [select, setSelect] = useState<string>("");
  const params = useParams();

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        const data = await response.json();
        setAllProducts(data.products);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let products = allProducts;

    // Filter products by category
    products = products.filter(
      (product) =>
        typeof product.category === "string" &&
        product.category.toLowerCase() === params.category
    );

    // Apply additional filters
    if (brands.length > 0) {
      products = products.filter((product) => {
        const brand =
          typeof product.brand === "string" && product.brand.toLowerCase();
        return brands.includes(brand as string);
      });
    }

    if (batteryCapacity.length > 0) {
      const convertAllNumber = batteryCapacity.map(Number);
      const findMin = Math.min(...convertAllNumber);
      products = products.filter(
        (product) => Number(product.battery) >= findMin
      );
    }

    if (price.length > 0) {
      const convertAllNumber = price.map(Number);
      const findMin = Math.min(...convertAllNumber);
      products = products.filter(
        (product) =>
          (Number(product.discounted) > 0
            ? Number(product.discounted)
            : Number(product.price)) >= findMin
      );
    }

    if (ram.length > 0) {
      const selectedRams = ram.map((num) => parseInt(num.replace("gb", "")));

      products = products.filter((product) =>
        selectedRams.includes(Number(product.ram))
      );
    }

    if (screenSize.length > 0) {
      const selectedScreenSizes = screenSize.map((num) => Number(num));
      selectedScreenSizes.forEach((num) => {
        products = products.filter(
          (product) => Number(product.screenSize) >= num
        );
      });
    }
    if (screenType.length > 0) {
      products = products.filter((product) => {
        const screenTypeValue = screenType
          .map((screenType) => screenType.toLowerCase())
          .includes((product.screenType ?? "").toLowerCase());
        return screenTypeValue;
      });
    }

    setFilteredProducts(products);
  }, [
    allProducts,
    brands,
    price,
    ram,
    screenSize,
    batteryCapacity,
    params.category,
  ]);

  const sortedProducts = useMemo(() => {
    switch (select) {
      case "price":
        return [...filteredProducts].sort(
          (a, b) =>
            (parseFloat(b.discounted) > 0
              ? parseFloat(b.discounted)
              : parseFloat(b.price)) -
            (parseFloat(a.discounted) > 0
              ? parseFloat(a.discounted)
              : parseFloat(a.price))
        );
        break;

      case "rating":
        return [...filteredProducts].sort(
          (a, b) => (b?.rating || 0) - (a?.rating || 0)
        );
        break;
      case "top":
        return [...filteredProducts].sort(
          (a, b) => (b.orders || 0) - (a.orders || 0)
        );
        break;
      case "best":
        //Return unfiltered products if select is 'best'
        return filteredProducts;
        break;
      default:
        break;
    }

    return filteredProducts;
  }, [filteredProducts, select]);

  return (
    <div className="px-2 max-md:px-0">
      <div className="flex justify-between items-center max-md:grid max-md:grid-cols-2 max-md:gap-5">
        <p className="text-gray-400 text-sm max-md:col-span-2 max-md:order-1 ">
          {loading ? (
            <PulseLoading height={20} width={100} />
          ) : (
            <>
              Selected Products :
              <span className={"text-black font-semibold text-base  "}>
                {sortedProducts.length}
              </span>
            </>
          )}
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

      <div className="mt-10 grid grid-cols-3 gap-3 max-md:grid-cols-2 min-h-[600px] transition-all duration-300">
        {loading ? (
          <div className="col-span-3">
            <Loading />
          </div>
        ) : (
          <ShowcaseProducts products={sortedProducts} />
        )}
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
