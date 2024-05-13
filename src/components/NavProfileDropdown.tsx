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

export function NavProfileDropdown() {
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
          <DropdownMenuItem
            className=" cursor-pointer"
            onClick={() => (window.location.href = "/sign-in")}
          >
            Sign in
            <DropdownMenuShortcut>
              <BiLogIn size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className=" cursor-pointer"
            onClick={() => (window.location.href = "/sign-up")}
          >
            Sign up
            <DropdownMenuShortcut>
              <BiLogIn size={20} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
