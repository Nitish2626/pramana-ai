"use client";

import { X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";

const AppSidebar = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between gap-2 p-2">
              <Link href={""} className="flex items-center gap-3">
                <img
                  src={"https://github.com/shadcn.png"}
                  width={20}
                  height={20}
                  alt="logo"
                />
                <span className="text-sm font-medium">Pramana AI</span>
              </Link>

              <X className="w-5 h-5 md:hidden cursor-pointer" onClick={toggleSidebar} />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      <SidebarContent>
        <SidebarMenu className="p-2">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              {/* <Link
                href={item.url}
                className="flex items-center gap-2 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground"
                title={item.title}
              >
                <item.icon size={18} />
                <span>{item.title}</span>
              </Link> */}
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
