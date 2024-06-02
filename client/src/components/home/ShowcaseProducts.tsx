import { HeartIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../../lib/redux/cartSlice";
import { CartState, Product as Data, Product } from "@/lib/redux/types";
import { useToast } from "../ui/use-toast";
import { FaStar } from "react-icons/fa6";
import { addwishlist } from "@/lib/redux/Wishlist";
import { FormatText } from "../FormatText";

function ShowcaseProducts({ products }: { products: Data[] }) {
  const dispatch = useDispatch();
  const [productData, setProductData] = useState<Data[]>(products || []);
  const items = useSelector<CartState, Product[]>((state) => state.cart.items);
  const [data, setData] = useState<Product[]>(items);
  useEffect(() => {
    setData(items);
  }, [data, items]);
  useEffect(() => {
    setProductData(products);
  }, [products]);
  const { toast } = useToast();

  function handleClick(e: React.MouseEvent<HTMLButtonElement>, id: number) {
    e.preventDefault();
    e.stopPropagation();
    const checkifexits = items.findIndex((i) => i.id === id);
    const filterProduct = productData.filter((item) => item.id === id);
    if (checkifexits !== -1) {
      dispatch(add(filterProduct[0]));
      toast({
        title: "Prodcuct Already in cart",
        description: "Quantity increased",
        variant: "success",
      });
    } else if (filterProduct) {
      dispatch(add(filterProduct[0]));
      toast({
        title: "Product Added",
        description: "Product added to cart",
        variant: "success",
      });
    }
  }

  const createElement = productData?.map((item) => {
    return (
      <div className="relative">
        {item?.stock && item?.stock > 0 ? (
          ""
        ) : (
          <>
            <span className=" text-base top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-gray-50  z-10 absolute bg-red-400 px-2 py-1 rounded-full ">
              Out of Stock
            </span>
          </>
        )}
        <Link
          to={`/${
            item.category &&
            FormatText({ category: item.category, toLowerCase: true })
          }${
            item.brand &&
            "/" + FormatText({ title: item.brand, toLowerCase: true })
          }${
            item.title &&
            "/" + FormatText({ title: item.title, toLowerCase: true })
          }`}
          reloadDocument
          className={`grid grid-row-6 ${
            item?.stock && item?.stock > 0 ? "" : "opacity-50 bg-gray-200"
          }  border border-border px-4  max-sm:px-2 hover:shadow-lg transition-all duration-300`}
          key={item.id}
        >
          <div className="flex items-center justify-end py-4 max-sm:py-2">
            <Button
              variant={"ghost"}
              className="max-sm:text-xs max-sm:p-1"
              onClick={(e: any) => {
                e.preventDefault();
                dispatch(addwishlist(item));
                toast({
                  title: "Product Added",
                  description: "Product added to wishlist",
                  variant: "success",
                });
              }}
            >
              <HeartIcon className="w-6 h-6 text-muted-foreground" />
            </Button>
          </div>
          <div className="px-2 overflow-hidden flex items-center justify-center h-[180px]  ">
            <img
              src={item.thumbnail}
              alt=""
              className=" object-cover max-sm:max-h-[120px]"
            />
          </div>

          <h1 className="text-sm max-sm:text-xs font-semibold text-center line-clamp-3 mt-3 ">
            {item.title}
          </h1>
          <h2 className="text-xl font-semibold text-center max-sm:text-base  flex items-end justify-center">
            ${item.price}
          </h2>
          <div className="flex justify-center gap-2 mt-4 items-center">
            {item.rating > 1 && item.rating < 2 ? (
              <>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
              </>
            ) : item.rating > 2 && item.rating < 3 ? (
              <>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
              </>
            ) : item.rating > 3 && item.rating < 4 ? (
              <>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
              </>
            ) : item.rating > 4 && item.rating < 5 ? (
              <>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-gray-400/80" />
                </span>
              </>
            ) : item.rating === 5 ? (
              <>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
                <span>
                  <FaStar className="w-3 h-3 text-yellow-400/80" />
                </span>
              </>
            ) : null}
          </div>
          <div className="flex justify-center items-end py-4 max-sm:py-2">
            <Button
              variant={"default"}
              className="w-full max-sm:text-xs max-sm:py-1"
              onClick={(e) => handleClick(e, item.id)}
            >
              Add to Cart
            </Button>
          </div>
        </Link>
      </div>
    );
  });
  return <>{createElement}</>;
}

export default ShowcaseProducts;
