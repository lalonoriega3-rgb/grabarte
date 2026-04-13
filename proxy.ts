import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin page (not API routes — those check auth themselves)
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    const authHeader = req.headers.get("authorization");
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      // No password set — deny all access
      return new NextResponse("Admin access not configured", { status: 503 });
    }

    if (!authHeader) {
      // Return 401 with WWW-Authenticate to trigger browser's native auth dialog
      return new NextResponse("Authentication required", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Grabarte Admin"',
        },
      });
    }

    try {
      const [scheme, encoded] = authHeader.split(" ");
      if (scheme !== "Basic") throw new Error("Invalid scheme");
      const decoded = Buffer.from(encoded, "base64").toString("utf-8");
      const [, password] = decoded.split(":");
      if (password !== adminPassword) throw new Error("Wrong password");
    } catch {
      return new NextResponse("Invalid credentials", {
        status: 401,
        headers: {
          "WWW-Authenticate": 'Basic realm="Grabarte Admin"',
        },
      });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
