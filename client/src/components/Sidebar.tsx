import { FaCircleChevronRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { User } from "@/lib/redux/types";
import { FaUserCircle } from "react-icons/fa";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import { Separator } from "./ui/separator";

function MobileNav({
  hide,
  sethide,
}: {
  hide: boolean;
  sethide: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userData: User = JSON.parse(localStorage.getItem("user") || "{}");

  const menuVariants = {
    open: {
      opacity: 1,
      x: 0,
      transition: { stiffness: 100, damping: 20 },
    },
    closed: {
      opacity: 0,
      x: "-100%",
      transition: { stiffness: 100, damping: 20 },
    },
  };

  return (
    <motion.div
      className="fixed z-[9999] top-0 left-0 w-full h-screen  bg-white shadow-lg"
      initial="closed"
      animate={hide ? "open" : "closed"}
      variants={menuVariants}
    >
      <Button
        variant="ghost"
        className="absolute top-6 right-4"
        onClick={() => sethide(!hide)}
      >
        <X />
      </Button>
      <div className="p-6 mt-14 overflow-y-scroll max-h-[100svh]">
        {/* User Avatar and Info */}
        <div className="flex flex-col gap-4  bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-2 items-center justify-center  mb-8">
          <FaUserCircle
            className="text-5xl 
        text-gray-50"
          />
          {userData.firstname !== undefined ? (
            <>
              <div className="flex flex-col gap-1 justify-center items-center">
                <p className="text-xl max-sm:text-lg  text-white">
                  {userData.firstname + " " + userData.lastname}
                </p>
                <p className="text-sm text-white">{userData.email}</p>
              </div>
            </>
          ) : (
            <>
              <p className="text-xl max-sm:text-lg font-semibold  text-white">
                Guest
              </p>
            </>
          )}
        </div>

        {/* Account Links */}
        {userData.firstname !== undefined ? (
          <div className="space-y-4 ">
            {[
              { label: "My Profile", link: "/profile" },
              { label: "Dashboard", link: "/dashboard" },
              { label: "My Orders", link: "/orders" },
              { label: "My Reviews", link: "/reviews" },
              { label: "Wishlist", link: "/wishlist" },
            ].map((item) => (
              <Link
                reloadDocument
                to={item.link}
                key={item.label}
                className="flex last-of-type:border-0 items-center justify-between text-lg max-sm:text-sm border-b pb-1 border-border  text-gray-800 hover:text-yellow-600 transition-colors"
              >
                {item.label}
                <FaCircleChevronRight className="text-yellow-600" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-4 ">
            {[
              { label: "Sign in", link: "/signin" },
              { label: "Sign up", link: "/signup" },
            ].map((item) => (
              <Link
                reloadDocument
                to={item.link}
                key={item.label}
                className="flex last-of-type:border-0 items-center justify-between text-lg max-sm:text-sm border-b pb-1 border-border  text-gray-800 hover:text-yellow-600 transition-colors"
              >
                {item.label}
                <FaCircleChevronRight className="text-yellow-600" />
              </Link>
            ))}
          </div>
        )}

        <div className="my-3">
          <Separator />
        </div>

        {/* General Links */}
        <div className="space-y-4">
          {[
            { label: "Sale", link: "/discount" },
            { label: "About Us", link: "/about" },
            { label: "Help", link: "/help" },
            { label: "Contact Us", link: "/contact" },
          ].map((item) => (
            <Link
              reloadDocument
              to={item.link}
              key={item.label}
              className="flex items-center justify-between text-lg max-sm:text-sm text-gray-800 hover:text-yellow-600 transition-colors"
            >
              {item.label}
              <FaCircleChevronRight className="text-yellow-600" />
            </Link>
          ))}
        </div>

        {userData.firstname !== undefined && (
          <div className="flex flex-col gap-4 mt-8  bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg p-2 items-center justify-center  mb-8">
            <Link to="/signout" className="w-full text-white text-center">
              Sign Out
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default MobileNav;
