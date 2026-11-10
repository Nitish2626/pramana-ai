"use client";

import { MessageSquareShare, X } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  useSidebar,
} from "../ui/sidebar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { showToast } from "@/lib/toast";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { F_LOGIN } from "../../../routes/appRoutes";
import Loader from "./Loader";

interface ConversationData {
  _id: string;
  title: string;
}

const AppSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  // console.log("pn", pathname);

  const { toggleSidebar } = useSidebar();

  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const conversationResponse = await axios.get("/api/get-conversation");
      // console.log("conv res", conversationResponse);

      if (conversationResponse.data.status === 401) {
        router.push(F_LOGIN);
      } else if (conversationResponse.data.status === 500) {
        showToast("error", conversationResponse.data.message);
        return;
      }

      setConversations(conversationResponse.data.data);
    } catch (error) {
      // console.log("F_GET_CONVERSATIONS ERROR", error);
      showToast("error", "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, [pathname]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between gap-2 p-2">
              <Link href="/" className="flex items-center gap-3">
                <img src={"/public/pramana_ai.png"} width={20} height={20} alt="logo" />
                <span className="text-sm font-medium">Pramana AI</span>
              </Link>

              <X
                className="w-5 h-5 md:hidden cursor-pointer"
                onClick={toggleSidebar}
              />
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarSeparator />

      {isLoading ? (
        <Loader />
      ) : (
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="p-2">
                <SidebarMenuItem className="h-full overflow-auto">
                  <SidebarMenuButton asChild data-active={pathname === "/"}>
                    <Link
                      href={`/`}
                      title="New Chat"
                      className="h-10 flex items-center font-semibold gap-2 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground"
                    >
                      <MessageSquareShare />
                      <span>New Chat</span>
                    </Link>
                  </SidebarMenuButton>

                  <SidebarGroupLabel className="mt-2">
                    Your Chats
                  </SidebarGroupLabel>
                  {conversations.map((conv) => {
                    const isActive = pathname === `/chat/${conv._id}`;

                    return (
                      <SidebarMenuButton
                        key={conv._id}
                        data-active={isActive}
                        asChild
                      >
                        <Link
                          href={`/chat/${conv._id}`}
                          title={conv.title}
                          className="h-10 text-ellipsis data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground"
                        >
                          <span>{conv.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    );
                  })}
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      )}
    </Sidebar>
  );
};

export default AppSidebar;
