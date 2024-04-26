import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="mt-10 max-sm:mt-5 px-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
