import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';

const publicPaths = [
    '/user/login',
    '/user/signup',
    '/instructor/signup',
    '/instructor/login',
    '/signup',
    '/login',
    '/instructor/otp',
    '/user/otp',
    '/admin/login'
  ];
 
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("path" , path);

  const isPublicPath = publicPaths.includes(path);
  console.log("ispublicpath" , isPublicPath);

  const token = request.cookies.get('authToken')?.value || '';
  console.log("token" , token);

  if(isPublicPath && token) {
    try{
        const decodedToken = jwtDecode<{email :string ; role:string}>(token);
        console.log("decodedToekn.role" , decodedToken.role);
        if(decodedToken.role === "User"){
            return NextResponse.redirect(new URL('/user/home', request.url));
        }else if(decodedToken.role === "instructor"){
            return NextResponse.redirect(new URL('/instructor/dashboard', request.url));
        }else if(decodedToken.role === "Admin") {
          return NextResponse.redirect(new URL('/admin/dashboard' , request.url));
        }
    }catch(err) {
        console.log(err)
      }
  }
  // if(!token) {
  //   console.log("kkkkkkkk")
  //   return NextResponse.redirect(new URL('/signup', request.url));
  // }
  if (path.startsWith('/admin') && !isPublicPath && !token) {
    console.log("nooooooooooooooo");
    console.log("Redirecting to /admin/login");
    return NextResponse.redirect(new URL('/admin/login', request.url));
}

  if (!isPublicPath && !token ) {
    console.log("kkkkk");
    return NextResponse.redirect(new URL('/login', request.url));
}

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/instructor/login',
    '/instructor/otp',
    '/instructor/signup',
    '/signup',
    '/login',
    '/admin/:path*',
    '/user/:path*'
    
]
}