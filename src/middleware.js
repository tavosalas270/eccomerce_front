import { NextResponse } from 'next/server'

export function middleware(request) {
    const token = request.cookies.get('token')
    if (token === undefined) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
}

export const config = {
    matcher: ['/dashboard', '/control'],
}