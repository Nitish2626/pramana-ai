import AppNavbar from "@/components/custom/AppNavbar";
import AppSidebar from "@/components/custom/AppSidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <AppNavbar />
          <div>{children}</div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
}
