import { BreadCrum } from "@/components/BreadCrum";
import ColorCheckbox from "@/components/product/ColorCheckbox";
import SelectSize from "@/components/product/SelectSize";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";
import DeliverySection from "@/components/product/DeliverySection";
import TopDetailsGrid from "@/components/product/TopDetailsGrid";
import Details from "@/components/product/Details";
import ProductReview from "@/components/product/ProductReview";

function Product() {
  const path = useParams();
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(
          "https://dummyjson.com/products/" + path.id,
          {
            method: "GET",
          }
        );
        const response = await request.json();
        setData(response);
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
  const [onChange, setOnChange] = useState("");
  const [selectSize, setSelectSize] = useState(sizes[0]);
  console.log(data);

  return (
    <div>
      <div className="max-w-6xl mx-auto pb-20 px-4">
        <div className="mb-10">
          <BreadCrum
            cat={data?.category}
            brand={data?.brand}
            productName={data?.title}
          />
        </div>
        <div className="mt-20">
          <div className="grid grid-cols-2 gap-8 max-md:gap-6 max-sm:gap-3 max-md:grid-cols-1">
            <div>
              <img src={data?.thumbnail} alt="" className="max-w-full" />
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-6 max-md:text-2xl max-sm:text-xl">
                {data?.title}
              </h1>
              <p className="text-3xl mb-6  max-md:text-xl max-sm:text-lg">
                ${data?.price}
              </p>
              {/* Select color */}
              <div className="flex items-center mb-6">
                <p className="text-sm mr-4">Select color:</p>

                <ColorCheckbox
                  colors={["bg-red-500", "bg-green-500", "bg-blue-500"]}
                  onChange={setOnChange}
                />
              </div>
              {/* Select variation or size, if any */}
              <div className="flex items-center justify-between gap-5  max-sm:gap-3">
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
              <div className=" grid grid-cols-2   max-sm:gap-3 gap-5 mt-6">
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
              <div className="mt-6 grid grid-cols-3 gap-5">
                <DeliverySection />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-20 bg-gray-100 py-20">
        <Details />
      </div>
      <div className="mt-20 py-10">
        <ProductReview />
      </div>
    </div>
  );
}

export default Product;
