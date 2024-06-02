import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import AdminNavbar from "./AdminNavbar";

function AdminLayout() {
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
