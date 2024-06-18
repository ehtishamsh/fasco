import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import CatesTable from "./BrandTable";
import { BreadCrumbAdmin } from "../BreadCrumAdmin";

function ManageBrands() {
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
        <BreadCrumbAdmin paths={["Admin"]} end={"Brands"} />
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Brands</h1>
            <span className="text-sm text-muted-foreground">
              Manage the brands.
            </span>
          </div>
          <Link
            to={"/admin/brands/new"}
            className="flex items-center gap-5 bg-foreground max-sm:text-sm text-white border-placeholder-default border px-3 py-2 rounded-lg"
          >
            <Plus className="w-5 h-5 max-sm:w-4 max-sm:h-4" /> Add
          </Link>
        </div>
        <DropdownMenuSeparator />
        <CatesTable />
        <DropdownMenuSeparator />
      </div>
    </div>
  );
}

export default ManageBrands;
