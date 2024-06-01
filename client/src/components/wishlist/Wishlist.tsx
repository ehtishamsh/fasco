import { useDispatch, useSelector } from "react-redux";
import { BreadCrum } from "../BreadCrum";
import { Product, WishlistState } from "@/lib/redux/types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FormatText } from "../FormatText";
import { BiX } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { removewishlist } from "@/lib/redux/Wishlist";

function Wishlist() {
  const wishlistData = useSelector<WishlistState, Product[]>(
    (state) => state?.wishlist.items
  );

  const dispatch = useDispatch();
  const [data, setData] = useState<Product[]>(wishlistData);
  useEffect(() => {
    setData(wishlistData);
  }, [wishlistData]);
  const mapProducts = data?.map((item) => {
    return (
      <div
        className={`p-3 ${
          item?.stock && item?.stock > 0 ? "" : "opacity-50 grayscale"
        } grid grid-cols-7 border border-border rounded-md`}
      >
        <img
          src={item.thumbnail}
          alt={item.title}
          className="h-24 w-24 object-cover"
        />
        <div className="col-span-3 flex flex-col justify-center">
          <p className="text-xs text-gray-500">{item.brand}</p>
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
            className="text-sm font-semibold line-clamp-2"
          >
            {item.title}
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <p className="text-sm text-yellow-600 font-semibold ">
            ${Number(item.price)}
          </p>
        </div>

        <div className="flex justify-center items-center">
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
            className="rounded-full bg-yellow-300 hover:bg-yellow-400 p-1.5"
          >
            <BsEye className="text-2xl text-yellow-800" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Button
            onClick={() => dispatch(removewishlist(item))}
            variant={"ghost"}
            size={"icon"}
            className="rounded-full bg-yellow-300 hover:bg-yellow-400"
          >
            <BiX className="text-2xl text-yellow-800" />
          </Button>
        </div>
      </div>
    );
  });
  return (
    <div className="max-w-6xl mx-auto px-3">
      <BreadCrum />
      <div className="mt-10 max-sm:mt-5">
        {data.length > 0 ? (
          <div>
            <h1 className="text-3xl font-semibold text-center mb-10">
              My Wishlist
            </h1>
            <div className="grid grid-cols-1 gap-7">{mapProducts}</div>
          </div>
        ) : (
          <div className="flex justify-center w-full h-fit flex-col items-center mb-36">
            <img
              src="/empty_wishlist.png"
              alt=""
              className="max-w-72 object-cover max-sm:max-w-32"
            />
            <h1 className="text-3xl text-gray-400 font-semibold mt-8 text-center w-full max-sm:text-xl mb-4 max-sm:mb-2">
              Your Wishlist is Empty!
            </h1>
            <Button
              variant={"default"}
              size={"lg"}
              onClick={() => (window.location.href = "/")}
            >
              Shop Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
