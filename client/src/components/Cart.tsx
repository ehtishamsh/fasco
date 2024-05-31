import React, { useEffect, useState } from "react";
import { BiX } from "react-icons/bi";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link, useLocation } from "react-router-dom";
import { CartState, Product } from "@/lib/redux/types";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "@/lib/redux/cartSlice";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";
import { FormatText } from "./FormatText";

function Cart({
  setOpenCart,
  openCart,
}: {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  openCart: boolean;
}) {
  const checktoken = localStorage.getItem("token");
  const cartItems = useSelector<CartState, Product[]>(
    (state) => state?.cart?.items
  );
  const [data, setData] = useState<Product[]>(cartItems);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    setOpenCart(false);
  }, [location.pathname]);
  const { toast } = useToast();
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setData(cartItems);
    setTotal(() => {
      let sum = 0;
      cartItems.forEach((item) => {
        sum += Number(item.price) * (item?.quantity || 1);
      });
      return sum;
    });
  }, [data, cartItems]);
  function handleRemove(item: Product) {
    dispatch(remove(item));
    toast({
      title: "Product removed",
      description: "Product removed from cart",
      variant: "destructive",
    });
  }
  const mapData = data?.map((item, i) => {
    return (
      <div key={i}>
        <div className="grid grid-cols-4 gap-4 p-2 rounded-md mb-5 bg-gray-100  transition-all duration-300">
          <div className="col-span-1 flex justify-center items-center">
            <img src={item.thumbnail} alt="" className="max-h-[120px]" />
          </div>
          <div className="col-span-3  flex justify-between">
            <div>
              <p className="text-sm text-gray-500">{item.brand}</p>
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
                className="text-base font-semibold line-clamp-1"
              >
                {item.quantity || 1} x {item.title}
              </Link>
              <p className="text-sm text-yellow-600 font-semibold mt-3">
                ${item.price}
              </p>
            </div>
            <div className="">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => handleRemove(item)}
                className="rounded-full bg-yellow-300 hover:bg-yellow-400"
              >
                <BiX className="text-2xl text-yellow-800" />
              </Button>
            </div>
          </div>
        </div>
        <Separator />
      </div>
    );
  });
  return (
    <motion.div
      initial={{ opacity: 0, display: "none" }}
      animate={{
        opacity: openCart ? 1 : 0,
        display: openCart ? "block" : "none",
        transitionEnd: {
          display: openCart ? "block" : "none",
        },
      }}
      exit={{ opacity: 0, display: "none" }}
      transition={{ duration: 0.3 }}
      className="absolute w-full backdrop-brightness-50 overflow-hidden backdrop-blur-sm h-svh  top-0 right-0 left-0 bottom-0 z-50"
    >
      <div className="w-full h-full flex justify-end ">
        <motion.div
          animate={{ x: openCart ? "0%" : "100%" }}
          transition={{ duration: 0.3, type: "tween" }}
          className="max-w-[30%] max-lg:max-w-[50%] max:md:max-w-[60%] max-sm:max-w-[100%] w-full bg-background h-full bg-gray-200"
        >
          <div className="p-4 flex justify-center items-center relative w-full bg-white">
            <h1 className="text-3xl font-normal">YOUR BAG</h1>
            <Button
              variant={"outline"}
              onClick={() => setOpenCart(!openCart)}
              size={"icon"}
              className="absolute top-4 right-5"
            >
              <BiX className="text-4xl" />
            </Button>
          </div>
          <Separator />
          {data && data.length > 0 ? (
            <>
              <div className="mt-8 px-5 py-2 max-h-[59vh] overflow-y-auto">
                {mapData}
              </div>
              <div className="absolute bottom-0  left-0 right-0 px-5 py-5 bg-white">
                <div className="flex justify-between items-center">
                  <h1 className="text-base font-semibold">Subtotal</h1>
                  <h1 className="text-base font-semibold">${total}</h1>
                </div>
                <Separator />
                <div className="flex justify-center items-center flex-col gap-4 mt-4">
                  <Link to="/cart" className="w-full">
                    <Button className="w-full" variant={"outline"} size={"lg"}>
                      View Cart
                    </Button>
                  </Link>
                  {checktoken ? (
                    <Link to="/checkout" className="w-full">
                      <Button className="w-full" size={"lg"}>
                        Checkout
                      </Button>
                    </Link>
                  ) : (
                    <Link to="/signin" className="w-full">
                      <Button className="w-full" size={"lg"}>
                        Sign in to checkout
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col justify-center items-center h-full px-10">
              <img src="/cart_empty.png" alt="" />
              <p className="text-center text-gray-500 font-medium mt-5">
                No Items in cart
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Cart;
