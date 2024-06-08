import { NextRequest, NextResponse } from "next/server"
import authConfig from "./shared/auth/auth.config"
import NextAuth from "next-auth"
 

const { auth } = NextAuth(authConfig)
export default auth(async function middleware(req: NextRequest) {
   const session = await auth()
   switch (req.nextUrl.pathname) {
      case "/sign-in":
         if (session?.user) {
            return NextResponse.redirect(new URL("/", req.url))
         }
         break
      case "/profile": 
         if (!session) {
            console.log(req.nextUrl.pathname === "/profile")
            return NextResponse.redirect(new URL("/", req.url))
         }
         break
   }
})