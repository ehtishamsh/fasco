import { DashboardIcon } from "@radix-ui/react-icons";
import { Notebook, Tags, User2Icon } from "lucide-react";
import { Link, useParams } from "react-router-dom";

function Sidebar() {
  const path = useParams();
  return (
    <nav className="relative h-screen border-r pt-16 lg:block w-72  max-md:hidden">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <h2 className="mb-2 px-4 text-xl font-semibold tracking-tight">
              Overview
            </h2>
            <nav className="grid items-start">
              <Link to={"/admin"} className="mt-5">
                <span
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    path.admin === "/admin" ? "bg-accent" : ""
                  } transparent`}
                >
                  <DashboardIcon className="mr-2 h-4 w-4" />
                  <span>Dashboard</span>
                </span>
              </Link>
              <Link to={"/admin/tags"} className="mt-5">
                <span
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    path.tags === "/admin/tags" ? "bg-accent" : ""
                  } transparent`}
                >
                  <Tags className="mr-2 h-4 w-4" />
                  <span>Tags</span>
                </span>
              </Link>
              <Link to={"/admin/users"} className="mt-5">
                <span
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    path.users === "/admin/users" ? "bg-accent" : ""
                  } transparent`}
                >
                  <User2Icon className="mr-2 h-4 w-4" />
                  <span>Users</span>
                </span>
              </Link>
              <Link to={"/admin/blogs"} className="mt-5">
                <span
                  className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground ${
                    path.blogs === "/admin/blogs" ? "bg-accent" : ""
                  } transparent`}
                >
                  <Notebook className="mr-2 h-4 w-4" />
                  <span>Blogs</span>
                </span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
