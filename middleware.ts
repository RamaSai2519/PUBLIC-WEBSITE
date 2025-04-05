import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = new URL(request.url);
    const refCode = url.pathname.split('/af/')[1];

    if (refCode) {
        const redirectTo = `https://www.sukoonunlimited.com/?utm_source=${refCode}`;
        return NextResponse.redirect(redirectTo);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/af/:refCode*', // This will match any path under /af/ and redirect accordingly
};
