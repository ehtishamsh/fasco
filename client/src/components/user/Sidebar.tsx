import { AvatarIcon, DashboardIcon } from "@radix-ui/react-icons";
import { Boxes, Notebook, User2Icon } from "lucide-react";
import { GoChecklist } from "react-icons/go";
import NavLinkItem from "../admin/NavlinkItem";
import { FaAddressBook } from "react-icons/fa";
import { User } from "@/lib/redux/types";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Sidebar({ hide }: { hide: boolean }) {
  const userData: User = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: hide ? 0 : 1,
        x: hide ? -100 : 0,
        width: hide ? 0 : 200,
      }}
      exit={{ width: 0 }}
    >
      <nav className="relative border-r lg:block max-md:hidden ">
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
                <NavLinkItem to="/admin/users" Icon={User2Icon} label="Users" />
                <NavLinkItem
                  to="/admin/categories"
                  Icon={Boxes}
                  label="Categories"
                />
                <NavLinkItem
                  to="/admin/brands"
                  Icon={Notebook}
                  label="Brands"
                />
              </nav>
            </div>
          </div>
        </div>
      </nav>
    </motion.div>
  );
}

export default Sidebar;
