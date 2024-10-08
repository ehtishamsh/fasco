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
        const response = await fetch(
          "https://fascobackend-production.up.railway.app/api/products"
        );
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
      console.log(batteryCapacity);
      const battery = batteryCapacity.map((num) => Number(num));
      battery.forEach((num) => {
        products = products.filter((product) => Number(product.battery) >= num);
      });
    }

    if (price.length > 0) {
      const convertAllNumber = price.map(Number);
      const findMin = Math.min(...convertAllNumber);
      products = products.filter(
        (product) =>
          (Number(product.discounted) > 0
            ? Number(product.discounted)
            : Number(product.price)) <= findMin
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
      params.category === "laptops"
        ? selectedScreenSizes.forEach((num) => {
            products = products.filter(
              (product) => Number(product.screenSize) === num
            );
          })
        : selectedScreenSizes.forEach((num) => {
            products = products.filter(
              (product) => Number(product.screenSize) >= num
            );
          });
    }
    if (screenType.length > 0) {
      products = products.filter((product) => {
        const screenTypeValue = screenType
          .map((screenType) => screenType.toLowerCase())
          .includes((product.screenType ?? "").toLowerCase().replace(" ", ""));
        return screenTypeValue;
      });
    }

    if (zoom.length > 0) {
      products = products.filter((product) => {
        const zoomMap = zoom.map((zoom) => Number(zoom));
        return zoomMap.includes(
          Number(product?.zoom?.replace(/[^\d.]+/g, "") || "0")
        );
      });
    }
    if (megapixels.length > 0) {
      products = products.filter((product) => {
        const convertAllNumber = megapixels.map(Number);
        const findMin = Math.min(...convertAllNumber);
        return (
          Number(product?.megapixels?.replace(/[^\d.]+/g, "") || "0") >= findMin
        );
      });
    }
    if (videoResolution.length > 0) {
      products = products.filter((product) => {
        const videoResolutionMap = videoResolution.map((videoResolution) =>
          Number(videoResolution)
        );
        return videoResolutionMap.includes(
          Number(product?.videoResolution?.replace(/[^\d.]+/g, "") || "0")
        );
      });
    }
    if (aperture.length > 0) {
      products = products.filter((product) => {
        const apertureMap = aperture.map((aperture) => Number(aperture));
        return apertureMap.includes(
          Number(product?.aperture?.replace(/[^\d.]+/g, "") || "0")
        );
      });
    }
    if (maxResolution.length > 0) {
      console.log(maxResolution);
      products = products.filter((product) => {
        const maxResolutionMap = maxResolution.map((maxResolution) =>
          Number(maxResolution)
        );
        return maxResolutionMap.includes(
          Number(product?.maxResolution?.replace(/[^\d.]+/g, "") || "0")
        );
      });
    }
    if (storage.length > 0) {
      products = products.filter((product) => {
        const storageMap = storage.map((item) => Number(item));
        console.log(storageMap);
        return storageMap.includes(
          Number(product?.storage?.replace(/[^\d.]+/g, "") || "0")
        );
      });
    }
    if (cpu.length > 0) {
      products = products.filter((product) => {
        const productCpu = (product.cpu ?? "").toLowerCase();
        return cpu.some((filterCpu) =>
          productCpu.includes(filterCpu.toLowerCase())
        );
      });
    }
    if (mainCamera.length > 0) {
      const convertAllNumber = mainCamera.map(Number);
      console.log(convertAllNumber);
      convertAllNumber.forEach((num) => {
        products = products.filter(
          (product) =>
            Number(product?.mainCamera?.replace(/[^\d.]+/g, "")) === num
        );
      });
    }
    if (frontCamera.length > 0) {
      const convertAllNumber = frontCamera.map(Number);
      console.log(convertAllNumber);
      convertAllNumber.forEach((num) => {
        products = products.filter(
          (product) =>
            Number(product?.frontCamera?.replace(/[^\d.]+/g, "")) === num
        );
      });
    }

    setFilteredProducts(products);
  }, [
    allProducts,
    brands,
    price,
    cpu,
    mainCamera,
    frontCamera,
    screenType,
    zoom,
    megapixels,
    aperture,
    videoResolution,
    storage,
    gpu,
    maxResolution,
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
