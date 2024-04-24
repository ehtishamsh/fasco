import { NavLink, Link } from "react-router-dom";
import { Button } from "./ui/button";

import { BsStar, BsSearch, BsPerson, BsBag } from "react-icons/bs";

function Navbar() {
  return (
    <header className="px-4 py-8">
      <nav className="max-w-6xl mx-auto  grid grid-cols-3 items-center justify-between">
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
            variant="ghost"
            className="px-2 flex justify-center items-center"
          >
            <BsBag size={20} />
          </Button>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
