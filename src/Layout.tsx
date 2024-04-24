import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <div className="mt-10 px-4">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
