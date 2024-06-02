import {
  DropdownMenuItem,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";

function SignOut() {
  return (
    <>
      <DropdownMenuItem
        onClick={() => {
          localStorage.clear();
          window.location.href = "/signin";
        }}
        className=" cursor-pointer"
      >
        Sign out
        <DropdownMenuShortcut>
          <LogOut width={20} height={20} />
        </DropdownMenuShortcut>
      </DropdownMenuItem>
    </>
  );
}

export default SignOut;
