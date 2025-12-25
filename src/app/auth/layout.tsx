import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // console.log("session", session);

  if(session){
    redirect("/");
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      {children}
    </div>
  );
}
