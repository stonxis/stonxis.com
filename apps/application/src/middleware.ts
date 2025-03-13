import { NextRequest, NextResponse } from "next/server";
import { getUrl } from "./lib/get-Url";

export function middleware(request: NextRequest) {
    const token = request.cookies.get('authjs.session-token');
    const pathname = request.nextUrl.pathname;

    if (token && pathname === '/login') {
        return NextResponse.redirect(new URL(getUrl('/'), request.url));
    }

    if (!token && pathname !== '/login') {
        return NextResponse.redirect(new URL(getUrl('/login'), request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
