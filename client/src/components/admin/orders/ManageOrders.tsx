import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import OrdersTable from "./OrdersTable";
import { BreadCrumbAdmin } from "../BreadCrumAdmin";

function ManageOrders() {
  const session = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  if (session.role !== "admin") {
    window.location.href = "/";
  }
  if (!token) {
    window.location.href = "/signin";
  }
  return (
    <div className="px-2 max-w-6xl">
      <div className="mt-8 px-5 max-sm:px-0 flex flex-col gap-5 w-full">
        <BreadCrumbAdmin paths={["Admin"]} end={"Orders"} />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight max-sm:text-xl">
              Orders
            </h1>
            <span className="text-sm text-muted-foreground">
              Manage the Orders.
            </span>
          </div>
        </div>
        <DropdownMenuSeparator />
        <OrdersTable />
        <DropdownMenuSeparator />
      </div>
    </div>
  );
}

export default ManageOrders;
