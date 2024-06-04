import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

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
      <main className="flex overflow-hidden">
        <Sidebar />
        <div className="w-full pt-16">
          <Outlet />
        </div>
      </main>
    </>
  );
}

export default AdminLayout;
