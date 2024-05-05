import React, { useEffect } from "react";
import { BiX } from "react-icons/bi";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import { Product } from "@/lib/redux/types";
import { useDispatch, useSelector } from "react-redux";
import { remove } from "@/lib/redux/cartSlice";
import { motion } from "framer-motion";
type CartState = {
  cart: {
    items: Product[];
  };
};
function Cart({
  setOpenCart,
  openCart,
}: {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  openCart: boolean;
}) {
  const cartItems = useSelector<CartState, Product[]>(
    (state) => state?.cart?.items
  );
  const [data, setData] = React.useState<Product[]>(cartItems);
  const dispatch = useDispatch();
  useEffect(() => {
    setData(cartItems);
  }, [data, cartItems]);
  const mapData = data?.map((item, i) => {
    return (
      <div key={i}>
        <div className="grid grid-cols-4 gap-4 p-2 rounded-md  transition-all duration-300">
          <div className="col-span-1 flex justify-center items-center">
            <img src={item.thumbnail} alt="" className="max-h-[120px]" />
          </div>
          <div className="col-span-3  flex justify-between">
            <div>
              <Link
                to={`${item.category}/${item.id}`}
                className="text-xl font-semibold underline"
              >
                {item.title}
              </Link>
              <p className="text-sm text-gray-500 mt-3">
                {item.quantity || 1} x
                <span className="font-semibold text-black">${item.price}</span>
              </p>
            </div>
            <div className="">
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => dispatch(remove(item))}
              >
                <BiX className="text-3xl text-gray-500" />
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
      transition={{ duration: 0.4 }}
      className="absolute w-full backdrop-brightness-50 overflow-hidden backdrop-blur-sm h-svh  top-0 right-0 left-0 bottom-0 z-50"
    >
      <div className="w-full h-full flex justify-end">
        <motion.div
          animate={{ x: openCart ? "0%" : "100%" }}
          transition={{ duration: 0.4, type: "tween" }}
          className="max-w-[30%] w-full bg-background h-full"
        >
          <div className="p-4 flex justify-center items-center relative w-full">
            <Button
              variant={"outline"}
              onClick={() => setOpenCart(!openCart)}
              size={"icon"}
              className="absolute top-4 left-5"
            >
              <BiX className="text-4xl" />
            </Button>
            <h1 className="text-3xl font-normal">YOUR BAG</h1>
          </div>
          <Separator />
          <div className="mt-8 px-5 py-2">{mapData}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Cart;
