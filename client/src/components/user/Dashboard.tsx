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
        <div className="w-full  px-5  max-sm:px-2  mb-20 pt-10">
          <Outlet />
        </div>
        <Toaster />
      </main>
    </>
  );
}

export default Dashboard;
