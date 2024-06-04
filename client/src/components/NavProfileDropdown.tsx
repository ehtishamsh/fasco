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
import { BsPerson } from "react-icons/bs";
import { UserCircle } from "lucide-react";
import { DashboardIcon } from "@radix-ui/react-icons";
import { GoSignOut } from "react-icons/go";

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
          <BsPerson className="text-2xl max-lg:text-xl  max-md:text-lg" />
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
              {checkUser?.role && (
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
                Dashboard
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
