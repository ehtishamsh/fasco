import { BreadCrum } from "@/components/BreadCrum";
import ColorCheckbox from "@/components/product/ColorCheckbox";
import SelectSize from "@/components/product/SelectSize";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import DeliverySection from "@/components/product/DeliverySection";
import TopDetailsGrid from "@/components/product/TopDetailsGrid";
import Details from "@/components/product/Details";
import ProductReview from "@/components/product/ProductReview";
import Recommended from "@/components/product/Recommended";

function Product() {
  const path = useParams();
  console.log(path);
  const [data, setData] = useState<any>({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch("https://dummyjson.com/products/", {
          method: "GET",
        });
        const response = await request.json();

        const filterProduct = response?.products.filter((item: any) => {
          return (
            item.title
              .replace("-", " ")
              .replace(/\s{2,}/g, "-")
              .replace(/\s/g, "-")
              .replace(".", "")
              .toLowerCase() === path?.title
          );
        });

        setData(filterProduct[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setData({});
    };
  }, []);

  const sizes = ["128GB", "256GB", "512GB", "1TB"];

  const [selectSize, setSelectSize] = useState(sizes[0]);
  // @ts-ignore
  const [onChange, setOnChange] = useState("");

  return (
    <div>
      <div className="max-w-6xl mx-auto pb-20 px-4 max-md:pb-16 max-sm:pb-0">
        <div className="mb-10">
          <BreadCrum
            cat={data?.category}
            brand={data?.brand}
            productName={data?.title}
          />
        </div>
        <div className="mt-20 max-md:mt-16 max-sm:mt-7">
          <div className="grid grid-cols-2 gap-8 max-md:gap-6 max-sm:gap-2 max-md:grid-cols-1">
            <div className="flex justify-center">
              <img
                src={data?.thumbnail}
                alt=""
                className=" max-h-[800px] object-contain border border-border"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-6 max-sm:mb-2 max-md:text-2xl max-sm:text-lg">
                {data?.title}
              </h1>
              <p className="text-3xl mb-6 max-sm:mb-2  max-md:text-xl max-sm:text-lg">
                ${data?.price}
              </p>
              {/* Select color */}
              <div className="flex items-center mb-6 max-sm:mb-2">
                <p className="text-sm mr-4">Select color:</p>

                <ColorCheckbox
                  colors={["bg-red-500", "bg-green-500", "bg-blue-500"]}
                  onChange={setOnChange}
                />
              </div>
              {/* Select variation or size, if any */}
              <div className="flex items-center max-sm:justify-evenly max-sm:flex-wrap gap-5  max-sm:gap-2 ">
                <SelectSize
                  sizes={sizes}
                  selectedSize={selectSize}
                  setSelectedSize={setSelectSize}
                />
              </div>
              <TopDetailsGrid />
              <p className="text-gray-700/80 mt-6 text-sm leading-relaxed  line-clamp-3">
                {data?.description}, {data?.description}, {data?.description}
              </p>
              <div className=" grid grid-cols-2 max-sm:grid-cols-1   max-sm:gap-3 gap-5 mt-6">
                <Button
                  variant={"outline"}
                  className="border border-foreground py-7"
                  size={"lg"}
                >
                  Add to Wishlist
                </Button>
                <Button
                  variant={"default"}
                  className="border border-foreground py-7"
                  size={"lg"}
                >
                  Add to Cart
                </Button>
              </div>
              <div className="mt-6 flex flex-wrap  justify-evenly items-center gap-5">
                <DeliverySection />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 max-md:mt-16 max-sm:mt-7 bg-gray-100 max-sm:bg-inherit py-20 max-md:py-16 max-sm:py-2">
        <Details />
      </div>
      <div className="mt-20 max-md:mt-16 max-sm:mt-0 py-10 max-sm:py-6 ">
        <ProductReview />
      </div>
      <div className="mt-8 max-md:mt-6 max-sm:mt-0 py-10 max-sm:py-6 ">
        <Recommended />
      </div>
    </div>
  );
}

export default Product;
