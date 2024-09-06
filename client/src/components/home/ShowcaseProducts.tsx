import { HeartIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartState, Product as Data, Product } from "@/lib/redux/types";
import { useToast } from "../ui/use-toast";
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
  console.log(productData);
  const createElement = productData?.map((item) => {
    return (
      <div className="relative h-full">
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
            typeof item.category === "string" &&
            item.category &&
            FormatText({ category: item.category, toLowerCase: true })
          }${
            typeof item.brand === "string" &&
            item.brand &&
            "/" + FormatText({ title: item.brand, toLowerCase: true })
          }${
            item.title &&
            "/" + FormatText({ title: item.title, toLowerCase: true })
          }`}
          reloadDocument
          className={`grid grid-row-6 ${
            item?.stock && item?.stock > 0 ? "" : "opacity-50 bg-gray-200"
          }  border border-border px-4 h-full   max-sm:px-2 hover:shadow-lg transition-all  duration-300`}
          key={item.id}
        >
          <div className="flex items-center justify-end py-4 max-sm:py-2">
            <Button
              variant={"ghost"}
              className="max-sm:text-xs max-sm:p-1 !bg-transparent"
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
              <HeartIcon className="w-6 h-6 text-muted-foreground hover:text-red-500" />
            </Button>
          </div>
          <div className="px-2 flex items-center justify-center  ">
            <img
              src={`http://localhost:4000${item.cover}`}
              alt=""
              className=" hover:scale-110 object-cover max-h-[200px]  max-sm:max-h-[120px] transition-all duration-300"
            />
          </div>

          <h1 className="text-sm max-sm:text-xs font-semibold text-center line-clamp-3 mt-2">
            {item.title}
          </h1>
          <div className="flex justify-center items-center mt-2">
            {[...Array(5)].map((_, index) => {
              const ratingValue = index + 1;

              return (
                <svg
                  key={index}
                  className={`cursor-pointer w-5 h-5 ${
                    ratingValue <= (item?.rating || 0)
                      ? "text-yellow-500"
                      : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M9.049 2.927a.75.75 0 011.902 0l1.03 3.17a.75.75 0 00.708.515h3.346c.658 0 .936.84.404 1.196l-2.707 1.83a.75.75 0 00-.272.832l1.03 3.17c.21.646-.54 1.185-1.104.832l-2.707-1.83a.75.75 0 00-.884 0l-2.707 1.83c-.564.353-1.314-.186-1.104-.832l1.03-3.17a.75.75 0 00-.272-.832L3.51 7.808c-.532-.356-.254-1.196.404-1.196h3.346a.75.75 0 00.708-.515l1.03-3.17z" />
                </svg>
              );
            })}
            <span className="text-gray-500 text-xs">
              ({item?.totalReviews})
            </span>
          </div>
          {Number(item.discounted) > 0 ? (
            <div className="flex justify-center items-center gap-2">
              <s className="text-lg font-semibold text-center max-sm:text-base  flex items-end justify-center pb-4 mt-2">
                ${item.price}
              </s>
              <span className="text-lg font-semibold italic text-red-500 text-center max-sm:text-base  flex items-end justify-center pb-4 mt-2">
                ${item.discounted}
              </span>
            </div>
          ) : (
            <h2 className="text-lg font-semibold text-center max-sm:text-base  flex items-end justify-center pb-4 mt-2">
              ${item.price}
            </h2>
          )}
        </Link>
      </div>
    );
  });
  return <>{createElement}</>;
}

export default ShowcaseProducts;
