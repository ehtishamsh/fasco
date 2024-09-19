import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { useState } from "react";
import Sidebar from "./components/Sidebar";

function Layout() {
  //@ts-ignore
  const [hide, setHide] = useState(false);
  return (
    <>
      <Navbar sethide={setHide} />
      <Sidebar hide={hide} sethide={setHide} />
      <div className="mt-28 max-sm:mt-24">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </>
  );
}

export default Layout;
