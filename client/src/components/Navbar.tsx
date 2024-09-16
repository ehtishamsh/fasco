import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import Cart from "./Cart";
import { CartState, Product } from "@/lib/redux/types";
import { useSelector } from "react-redux";
import { NavProfileDropdown } from "./NavProfileDropdown";
import { FaBars } from "react-icons/fa";
import { IoBag, IoHeartOutline } from "react-icons/io5";
import { Search } from "lucide-react";

function Navbar({
  sethide,
}: {
  sethide?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
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
    <header className=" fixed top-0 left-0 z-[100] bg-white shadow-md w-full">
      <div className="px-4 py-4 relative">
        <nav className="max-w-6xl mx-auto  grid grid-cols-6 gap-7 max-md:gap-2 items-center justify-between">
          <div className="flex items-center justify-start gap-1 max-md:col-span-2">
            {sethide && (
              <Button
                variant={"outline"}
                size={"icon"}
                className="border-none"
                onClick={() => sethide((prev) => !prev)}
              >
                <FaBars size={18} className=" text-gray-400" />
              </Button>
            )}
            <Link to="/" className="">
              <img src="/logo.png" alt="" className="max-w-32" />
            </Link>
          </div>

          <div className="col-span-4 max-md:col-span-3 flex items-center relative">
            <Search />
          </div>

          <div className="flex justify-end items-center gap-[2px] text-base max-lg:text-sm">
            <Button
              onClick={() => (window.location.href = "/wishlist")}
              variant="ghost"
              size={"icon"}
              className="flex justify-center items-center"
            >
              <IoHeartOutline className="text-xl  max-lg:text-lg max-md:text-base" />
            </Button>
            <NavProfileDropdown />

            <Button
              onClick={handleCart}
              variant="ghost"
              size={"icon"}
              className="relative flex justify-center items-center"
            >
              <IoBag className="text-xl  max-lg:text-lg max-md:text-base" />
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
