import { createRouteMatcher } from "@clerk/nextjs/server";
import type { NextRequest } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

export const clerkMiddlewareConfig = {
  beforeAuth: (req: NextRequest) => {
    const isAdmin = req.headers.get("host")?.startsWith("admin.");
    const pathname = req.nextUrl.pathname;

    if (isAdmin && pathname === "/") {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return Response.redirect(url);
    }

    if (isAdmin && !isAdminRoute(req)) {
      return new Response("No autorizado", { status: 403 });
    }

    return undefined; // <- ✔️ NECESARIO
  },
  publicRoutes: ["/admin/login"],
};
