import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function AdminLayout() {
  return (
    <>
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
