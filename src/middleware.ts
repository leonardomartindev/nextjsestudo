import { type NextRequest, NextResponse } from "next/server";
import { decrypt } from './lib/session'
import { cookies } from 'next/headers'

const formRoutes = ['/login', '/signup']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname;
    const isFormRoutes = formRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)

    if (isFormRoutes && session) {
        return NextResponse.redirect(new URL('/', req.nextUrl));
    }

    if(isFormRoutes && session) {
        return NextResponse.redirect(new URL('/', req.nextUrl))
    }
    return NextResponse.next();

}