import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { BiLogIn } from "react-icons/bi";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import { DashboardIcon } from "@radix-ui/react-icons";
import { GoSignOut } from "react-icons/go";
import { IoPersonOutline } from "react-icons/io5";

export function NavProfileDropdown() {
  const checkLogin = localStorage.getItem("token");
  const checkUser = JSON.parse(localStorage.getItem("user") || "{}");
  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size={"icon"}
          className="flex justify-center items-center"
        >
          <IoPersonOutline className="text-xl max-lg:text-lg  max-md:text-base  max-sm:w-6 max-sm:h-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-36 max-sm:w-28">
        <DropdownMenuLabel>Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {!checkLogin ? (
            <>
              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={() => (window.location.href = "/signin")}
              >
                Sign in
                <DropdownMenuShortcut>
                  <BiLogIn size={20} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={() => (window.location.href = "/signup")}
              >
                Sign up
                <DropdownMenuShortcut>
                  <BiLogIn size={20} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          ) : (
            <>
              {checkUser?.role === "admin" && (
                <DropdownMenuItem
                  className=" cursor-pointer"
                  onClick={() => (window.location.href = "/admin")}
                >
                  Admin
                  <DropdownMenuShortcut>
                    <UserCircle />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Account
                <DropdownMenuShortcut>
                  <DashboardIcon />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className=" cursor-pointer"
                onClick={handleSignOut}
              >
                Sign out
                <DropdownMenuShortcut>
                  <GoSignOut />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
