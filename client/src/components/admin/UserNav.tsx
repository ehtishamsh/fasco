import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SignOut from "../signout/SignOut";

export default function UserNav() {
  const getToken = localStorage.getItem("token");
  if (getToken) {
    const getUserData = JSON.parse(localStorage.getItem("user") || "{}");
    const session = { user: getUserData };
    console.log(session);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="relative h-10 w-10 bg-muted flex items-center justify-center text-lg rounded-full"
          >
            {session?.user?.username?.split("")[0]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user?.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SignOut />
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
}
