import React from "react";
import { BiX } from "react-icons/bi";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

function Cart({
  setOpenCart,
  openCart,
}: {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
  openCart: boolean;
}) {
  return (
    <div className="absolute backdrop-brightness-50 backdrop-blur-sm h-screen flex justify-end top-0 right-0 left-0 bottom-0 z-50">
      <div className="max-w-[30%] w-full bg-background">
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
        <div className="mt-8 px-5 py-2">
          <div>
            <div className="grid grid-cols-4 gap-4 p-2 rounded-md  transition-all duration-300">
              <div className="col-span-1 flex justify-center items-center">
                <img src="/oneplus.png" alt="" className="max-h-[120px]" />
              </div>
              <div className="col-span-3  flex justify-between">
                <div>
                  <Link to={"/"} className="text-xl font-semibold underline">
                    OnePlus 9
                  </Link>
                  <p className="text-sm text-gray-500 mt-3">
                    1 x <span className="font-semibold text-black">$200</span>
                  </p>
                </div>
                <div className="">
                  <Button variant={"ghost"} size={"icon"}>
                    <BiX className="text-3xl text-gray-500" />
                  </Button>
                </div>
              </div>
            </div>
            <Separator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
