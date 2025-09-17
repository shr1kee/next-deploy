import {getToken} from "next-auth/jwt";
import {NextRequest, NextResponse} from "next/server";


export async function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;
    const token = await getToken({req: request, secret: process.env.AUTH_SECRET});

    const protectedRoutes = ["/films", "/films/new", "/films/:path*", "/actors"]

    if (protectedRoutes.some((route) => pathname.startsWith(route.replace(":path*", "")))) {
        if (!token) {
            const url = new URL("/error", request.url);
            url.searchParams.set("message", "Недостаточно прав")
            return NextResponse.redirect(url);
        }
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/actors", "/films", "/films/new", "/films/:path*"]
}