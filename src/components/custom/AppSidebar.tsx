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
import { useEffect, useState } from "react";
import { showToast } from "@/lib/toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { F_LOGIN } from "../../../routes/appRoutes";
import Loader from "./Loader";

interface ConversationData {
  _id: string;
  title: string;
}

const AppSidebar = () => {
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const [conversations, setConversations] = useState<ConversationData[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchConversations = async () => {
    try {
      setIsLoading(true);
      const conversationResponse = await axios.get("/api/get-conversation");
      console.log("conv res", conversationResponse);

      if (conversationResponse.data.status === 401) {
        router.push(F_LOGIN);
      } else if (conversationResponse.data.status === 500) {
        showToast("error", conversationResponse.data.message);
        return;
      }

      setConversations(conversationResponse.data.data);
    } catch (error) {
      console.log("F_GET_CONVERSATIONS ERROR", error);
      showToast("error", "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations();
  }, []);

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
          <SidebarMenu className="p-2">
            {conversations.map((conv) => (
              <SidebarMenuItem
                key={conv._id}
                className="data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground"
              >
                <SidebarMenuButton asChild>
                  <Link
                    href={`/chat/${conv._id}`}
                    title={conv.title}
                  >
                    <span>{conv.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      )}
    </Sidebar>
  );
};

export default AppSidebar;
