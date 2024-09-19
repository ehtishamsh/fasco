import { AvatarIcon, DashboardIcon } from "@radix-ui/react-icons";
import { GoChecklist } from "react-icons/go";

import { FaAddressBook } from "react-icons/fa";
import { User } from "@/lib/redux/types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MdReviews } from "react-icons/md";
import { X } from "lucide-react";
import NavLinkItem from "./admin/NavlinkItem";
import { Button } from "./ui/button";

function Sidebar({
  hide,
  sethide,
}: {
  hide: boolean;
  sethide: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const userData: User = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <motion.div
      className={` ${"fixed  max-sm:block hidden z-[99999] right-0 top-0 bg-white h-screen pt-9"}`}
      initial={{ opacity: 0 }}
      animate={{
        opacity: hide ? 0 : 1,
        x: hide ? -100 : 0,
        width: hide ? 0 : "100%",
      }}
      exit={{ width: 0, display: "none" }}
    >
      <nav className="relative h-full border-r  lg:block w-full max-sm:px-7">
        <Button
          variant={"link"}
          onClick={() => sethide(!hide)}
          className="absolute hidden max-sm:block right-5 top-0"
        >
          <X />
        </Button>
        <div className="space-y-4 py-2">
          <div className="px-3 py-2">
            <div className="space-y-1">
              <div className="p-2 flex justify-center flex-col gap-2 items-center">
                <AvatarIcon className="w-20 h-20 text-muted-foreground" />
                <h1 className="text-base max-sm:text-sm">
                  Hello, {userData.firstname + " " + userData.lastname}
                </h1>
                <Link
                  to="/profile"
                  className="text-sm max-sm:text-xs bg-yellow-200 rounded-lg py-1 px-2"
                >
                  View Profile
                </Link>
              </div>
              <nav className="grid items-start">
                <NavLinkItem
                  to="/dashboard"
                  Icon={DashboardIcon}
                  label="Dashboard"
                />
                <NavLinkItem to="/orders" Icon={GoChecklist} label="Orders" />
                <NavLinkItem
                  to="/address"
                  Icon={FaAddressBook}
                  label="Address"
                />
                <NavLinkItem to="/reviews" Icon={MdReviews} label="Reviews" />
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}

export default Sidebar;
