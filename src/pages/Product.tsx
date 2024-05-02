import { BreadCrum } from "@/components/BreadCrum";
import ColorCheckbox from "@/components/product/ColorCheckbox";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

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
  const [onChange, setOnChange] = useState("");
  console.log(onChange);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-10">
        <BreadCrum
          cat={data?.category}
          brand={data?.brand}
          productName={data?.title}
        />
      </div>
      <div className="mt-20">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <img src={data?.thumbnail} alt="" className="max-w-full" />
          </div>
          <div>
            <h1 className="text-4xl font-bold mb-5">{data?.title}</h1>
            <p className="text-3xl mb-5">${data?.price}</p>
            <div className="flex items-center">
              <p className="text-sm mr-4">Select color:</p>
              <div className="flex items-center">
                <ColorCheckbox
                  colors={["bg-red-500", "bg-green-500", "bg-blue-500"]}
                  onChange={setOnChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
