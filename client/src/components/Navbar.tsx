import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Cart from "./Cart";
import { CartState, Product } from "@/lib/redux/types";
import { useSelector } from "react-redux";
import { NavProfileDropdown } from "./NavProfileDropdown";
import { FaBars } from "react-icons/fa";
import { IoBag, IoHeartOutline } from "react-icons/io5";
import Search from "./Search";

function Navbar({
  sethide,
}: {
  sethide?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [openCart, setOpenCart] = useState(false);
  const items = useSelector<CartState, Product[]>((state) => state.cart.items);
  const [data, setData] = useState<Product[]>(items);
  const [count, setCount] = useState(0);
  const [showHeader, setShowHeader] = useState(true); // For showing/hiding full header
  const [prevScrollPos, setPrevScrollPos] = useState(0); // To track previous scroll position
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    setData(items);
    setCount(items.length);
  }, [data, items]);

  const handleCart = () => {
    setOpenCart(!openCart);
  };

  // Scroll detection logic
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > prevScrollPos) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  return (
    <header
      className="fixed top-0 left-0 z-[100] w-full transition-transform duration-300 ease-in-out"
      style={{
        transform: showHeader
          ? "translateY(0)"
          : width > 768
          ? "translateY(0)"
          : "translateY(-46%)",
      }}
    >
      <div className="bg-white shadow-md px-4 max-sm:py-2 py-4 relative">
        <nav className="max-w-6xl mx-auto grid grid-cols-6 max-sm:grid-cols-2 gap-7 max-md:gap-2 items-center justify-between">
          <div className="flex items-center justify-start gap-1 max-md:col-span-2 max-sm:col-span-1">
            {width < 768 && sethide && (
              <Button
                variant={"outline"}
                size={"icon"}
                className="border-none"
                onClick={() => sethide((prev) => !prev)}
              >
                <FaBars size={18} className="text-gray-400" />
              </Button>
            )}
            <Link to="/" className="">
              <img
                src="/logo.png"
                alt=""
                className="max-w-32 max-sm:max-w-20"
              />
            </Link>
          </div>

          <div className="col-span-4 max-md:col-span-3 max-sm:hidden flex items-center relative">
            <Search />
          </div>

          <div className="flex justify-end items-center gap-[2px] max-sm:gap-3 text-base max-lg:text-sm">
            <Button
              onClick={() => (window.location.href = "/wishlist")}
              variant="ghost"
              size={"icon"}
              className="flex justify-center items-center"
            >
              <IoHeartOutline className="text-xl max-lg:text-lg max-md:text-base max-sm:w-6 max-sm:h-6" />
            </Button>
            <NavProfileDropdown />
            <Button
              onClick={handleCart}
              variant="ghost"
              size={"icon"}
              className="relative flex justify-center items-center"
            >
              <IoBag className="text-xl max-lg:text-lg max-md:text-base max-sm:w-6 max-sm:h-6" />
              {count > 0 && (
                <span className="absolute top-0 -right-[3px] bg-red-500 text-white rounded-full w-4 h-4 text-xs flex justify-center items-center">
                  {count}
                </span>
              )}
            </Button>
          </div>
        </nav>

        <div className="hidden max-sm:block">
          <div className="relative max-sm:flex max-sm:justify-center  mt-2 col-span-2">
            <Search />
          </div>
        </div>
        <Cart openCart={openCart} setOpenCart={setOpenCart} />
      </div>
    </header>
  );
}

export default Navbar;
