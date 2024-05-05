import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="mt-40 max-sm:mt-5">
        <Outlet />
      </div>
      <Toaster />
      <Footer />
    </>
  );
}

export default Layout;
