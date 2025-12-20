import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    console.log("req middleware", req);
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const { pathname } = req.nextUrl;

        if (pathname.startsWith("/api/auth") || pathname.startsWith("/auth")) {
          return true;
        }

        return !!token;
      },
    },
  }
);

export const config={
    matcher:[""]
}
