import Sidebar from "./Sidebar";
import { Toaster } from "../ui/toaster";
import { Outlet } from "react-router-dom";

function Dashboard() {
  const checkAdmin = JSON.parse(localStorage.getItem("user") || "{}");
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/signin";
  }
  if (!checkAdmin) {
    window.location.href = "/";
  }
  return (
    <>
      <main className="flex overflow-hidden">
        <Sidebar />
        <div className="w-full pt-4 px-3">
          <Outlet />
        </div>
        <Toaster />
      </main>
    </>
  );
}

export default Dashboard;
