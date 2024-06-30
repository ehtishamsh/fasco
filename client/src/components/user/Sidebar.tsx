import { AvatarIcon, DashboardIcon } from "@radix-ui/react-icons";
import { Boxes, Notebook, User2Icon } from "lucide-react";
import { GoChecklist } from "react-icons/go";
import NavLinkItem from "../admin/NavlinkItem";
import { FaAddressBook } from "react-icons/fa";
import { User } from "@/lib/redux/types";

function Sidebar() {
  const userData: User = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <nav className="relative  border-r lg:block w-72  max-md:hidden ">
      <div className="space-y-4 py-2">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <div className="p-2 flex justify-center flex-col gap-2 items-center">
              <AvatarIcon className="w-20 h-20 text-muted-foreground" />
              <h1 className="text-lg max-sm:text-base">
                Hello,{userData.firstname + " " + userData.lastname}
              </h1>
            </div>
            <nav className="grid items-start">
              <NavLinkItem
                to="/dashboard"
                Icon={DashboardIcon}
                label="Dashboard"
              />
              <NavLinkItem to="/orders" Icon={GoChecklist} label="Orders" />
              <NavLinkItem to="/address" Icon={FaAddressBook} label="Address" />
              <NavLinkItem to="/admin/users" Icon={User2Icon} label="Users" />
              <NavLinkItem
                to="/admin/categories"
                Icon={Boxes}
                label="Categories"
              />
              <NavLinkItem to="/admin/brands" Icon={Notebook} label="Brands" />
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
