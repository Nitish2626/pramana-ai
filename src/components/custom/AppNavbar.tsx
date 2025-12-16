import { LogOut, Settings, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";

const AppNavbar = () => {
  return (
    <nav className="w-full flex items-center justify-between sticky top-0 px-2 py-2 z-50 bg-background">
      <SidebarTrigger className="cursor-pointer" />

      {/* Search */}
      {/* <SearchModal /> */}

      {/* Avatar */}
      <DropdownMenu>
        <DropdownMenuTrigger className="cursor-pointer">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-40">
          <DropdownMenuLabel>
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="w-full flex flex-col justify-center">
                <span>John Doe</span>
                <span className="text-gray-700 text-sm font-normal">Admin</span>
              </div>
            </div>
          </DropdownMenuLabel>
          
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer py-2 font-semibold">
            <User />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer py-2 font-semibold">
            <Settings />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" className="cursor-pointer py-2 font-semibold">
            <LogOut />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default AppNavbar;
