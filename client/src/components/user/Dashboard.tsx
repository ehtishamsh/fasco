import Sidebar from "./Sidebar";
import { Toaster } from "../ui/toaster";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import { useState } from "react";

function Dashboard() {
  const checkAdmin = JSON.parse(localStorage.getItem("user") || "{}");
  const [hide, setHide] = useState(false);
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/signin";
  }
  if (!checkAdmin) {
    window.location.href = "/";
  }

  return (
    <>
      <Navbar hide={hide} sethide={setHide} />
      <main className="flex overflow-hidden">
        <Sidebar hide={hide} />
        <div className="w-full  px-5  max-sm:px-2  mb-20 pt-10">
          <Outlet />
        </div>
        <Toaster />
      </main>
    </>
  );
}

export default Dashboard;
