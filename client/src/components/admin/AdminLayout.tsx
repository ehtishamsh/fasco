import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";
import { Toaster } from "../ui/toaster";

function AdminLayout() {
  const checkAdmin = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/signin";
  }
  if (checkAdmin.role !== "admin") {
    window.location.href = "/";
  }
  return (
    <>
      <AdminNavbar />
      <main className="flex">
        <Sidebar />
        <div className="w-full py-16">
          <Outlet />
        </div>
        <Toaster />
      </main>
    </>
  );
}

export default AdminLayout;
