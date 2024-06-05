import { DashboardIcon } from "@radix-ui/react-icons";
import { Box, Boxes, Notebook, User2Icon } from "lucide-react";
import NavlinkItem from "./NavlinkItem";
import { GoChecklist } from "react-icons/go";

function Sidebar() {
  return (
    <nav className="relative h-screen border-r pt-16 lg:block w-72  max-md:hidden">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <nav className="grid items-start">
              <NavlinkItem to="/admin" Icon={DashboardIcon} label="Dashboard" />
              <NavlinkItem
                to="/admin/orders"
                Icon={GoChecklist}
                label="Orders"
              />
              <NavlinkItem to="/admin/products" Icon={Box} label="Products" />
              <NavlinkItem to="/admin/users" Icon={User2Icon} label="Users" />
              <NavlinkItem
                to="/admin/categories"
                Icon={Boxes}
                label="Categories"
              />
              <NavlinkItem to="/admin/brands" Icon={Notebook} label="Brands" />
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
