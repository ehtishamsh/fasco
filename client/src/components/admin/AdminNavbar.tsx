import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import UserNav from "./UserNav";

function AdminNavbar() {
  return (
    <div className="fixed top-0 left-0 right-0 supports-backdrop-blur:bg-background/60 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-16 flex items-center justify-between px-4">
        <div className="flex gap-2 justify-center items-center">
          <MobileNav />
          <Link to={"/admin"}>
            <img src="/logo.png" alt="" className="max-w-[100px]" />
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
        </div>
      </nav>
    </div>
  );
}

export default AdminNavbar;
