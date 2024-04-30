import { HeartIcon } from "@radix-ui/react-icons";
import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

interface Data {
  id: string;
  title: string;
  price: string;
  image: string;
  category: string;
}
function ShowcaseProducts({
  products,
  handleclick,
}: {
  products: Data[];
  handleclick: Function;
}) {
  const createElement = products?.map((item) => {
    return (
      <Link
        to={`/products/${item.id}`}
        className="grid grid-row-6  border border-border px-4 hover:shadow-lg transition-all duration-300"
        key={item.id}
      >
        <div className="flex items-center justify-end py-4">
          <Button variant={"ghost"}>
            <HeartIcon className="w-6 h-6 text-muted-foreground" />
          </Button>
        </div>
        <div className="px-2 overflow-hidden flex items-center justify-center ">
          <img
            src={item.image}
            alt=""
            className="max-h-[180px] max-sm:max-h-[120px]"
          />
        </div>

        <h1 className="text-sm font-semibold text-center line-clamp-3 mt-3 ">
          {item.title}
        </h1>
        <h2 className="text-2xl font-bold text-center  flex items-end justify-center">
          ${item.price}
        </h2>
        <div className="flex justify-center items-end py-4">
          <Button
            variant={"default"}
            className="w-full"
            onClick={(e) => handleclick(e)}
          >
            Add to Cart
          </Button>
        </div>
      </Link>
    );
  });
  return <>{createElement}</>;
}

export default ShowcaseProducts;
