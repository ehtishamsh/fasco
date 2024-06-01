import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { BsSearch, BsBag } from "react-icons/bs";
import Cart from "./Cart";
import { CartState, Product } from "@/lib/redux/types";
import { useSelector } from "react-redux";
import { Input } from "./ui/input";
import { HeartIcon } from "@radix-ui/react-icons";
import { NavProfileDropdown } from "./NavProfileDropdown";

function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const items = useSelector<CartState, Product[]>((state) => state.cart.items);

  const [data, setData] = useState<Product[]>(items);
  const [count, setCount] = useState(0);
  useEffect(() => {
    setData(items);
    setCount(items.length);
  }, [data, items]);
  const handleCart = () => {
    setOpenCart(!openCart);
  };
  return (
    <header className=" fixed top-0 left-0 z-[9999] bg-white shadow-md w-full">
      <div className="px-4 py-4 relative">
        <nav className="max-w-6xl mx-auto  grid grid-cols-6 gap-7 max-md:gap-2 items-center justify-between">
          <Link to="/" className="flex items-center justify-start">
            <img src="/logo.png" alt="" className="max-w-32" />
          </Link>
          <div className="col-span-2 flex items-center relative">
            <Input type="text" className="py-5 " placeholder="Search" />
            <Button
              variant={"outline"}
              size={"icon"}
              className="border-none absolute right-1 py-1"
            >
              <BsSearch size={18} className=" text-gray-400" />
            </Button>
          </div>
          <div className="flex  w-full justify-evenly items-center gap-3 max-md:gap-1 max-md:text-sm text-base col-span-2">
            <NavLink
              to={"/"}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "text-black" : "text-gray-400"
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "text-black" : "text-gray-400"
              }
            >
              About
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "text-black" : "text-gray-400"
              }
            >
              Contact Us
            </NavLink>
            <NavLink
              to={"/blog"}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "text-black" : "text-gray-400"
              }
            >
              Blog
            </NavLink>
          </div>
          <div className="flex justify-end items-center gap-[2px] text-base max-lg:text-sm">
            <Button
              variant="ghost"
              size={"icon"}
              className="flex justify-center items-center"
            >
              <HeartIcon className="w-6 h-6  max-lg:w-5 max-lg:h-5 max-md:w-4 max-md:h-4 max-sm:w-3 max-sm:h-3" />
            </Button>
            <NavProfileDropdown />

            <Button
              onClick={handleCart}
              variant="ghost"
              size={"icon"}
              className="relative flex justify-center items-center"
            >
              <BsBag className="text-xl  max-lg:text-lg max-md:text-base" />
              {count > 0 && (
                <span className="absolute  top-0 -right-[3px] bg-red-500 text-white rounded-full w-4 h-4  text-xs flex justify-center items-center">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </nav>
        <Cart openCart={openCart} setOpenCart={setOpenCart} />
      </div>
    </header>
  );
}

export default Navbar;
