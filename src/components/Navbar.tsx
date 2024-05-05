import { NavLink, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { BsStar, BsSearch, BsPerson, BsBag } from "react-icons/bs";
import Cart from "./Cart";
import { CartState, Product } from "@/lib/redux/types";
import { useSelector } from "react-redux";

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
    <header className=" fixed top-0 left-0 z-10 bg-white shadow-md w-full">
      <div className="px-4 py-8 relative">
        <nav className="max-w-6xl mx-auto  grid grid-cols-3  items-center justify-between">
          <Link to="/" className="flex items-center justify-start">
            <img src="/logo.png" alt="" className="max-w-32" />
          </Link>
          <div className="flex justify-center items-center gap-5 text-base">
            <NavLink
              to={"/"}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "underline underline-offset-8" : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to={"/shop"}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "underline underline-offset-8" : ""
              }
            >
              Shop
            </NavLink>
            <NavLink
              to={"/products"}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "underline underline-offset-8" : ""
              }
            >
              Products
            </NavLink>
            <NavLink
              to={"/pages"}
              className={({ isActive }: { isActive: boolean }) =>
                isActive ? "underline underline-offset-8" : ""
              }
            >
              Pages
            </NavLink>
          </div>
          <div className="flex justify-end items-center gap-1 text-base">
            <Button
              variant="ghost"
              className="px-2  flex justify-center items-center"
            >
              <BsSearch size={20} />
            </Button>
            <Button
              variant="ghost"
              className="px-2 flex justify-center items-center"
            >
              <BsPerson size={24} />
            </Button>
            <Button
              variant="ghost"
              className="px-2 flex justify-center items-center"
            >
              <BsStar size={20} />
            </Button>

            <Button
              onClick={handleCart}
              variant="ghost"
              className="px-2 relative flex justify-center items-center"
            >
              <BsBag size={20} />
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
