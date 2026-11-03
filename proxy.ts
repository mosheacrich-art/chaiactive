import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing, SITE_URL } from "./i18n/routing";

const intl = createMiddleware(routing);

export function proxy(request: NextRequest) {
  // Production traffic on *.vercel.app goes to the real domain (permanent 308).
  // Preview deployments also live on *.vercel.app, so they are left alone.
  const host = request.headers.get("host") ?? "";
  if (host.endsWith(".vercel.app") && process.env.VERCEL_ENV === "production") {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, SITE_URL);
    return NextResponse.redirect(target, 308);
  }
  return intl(request);
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"],
};
