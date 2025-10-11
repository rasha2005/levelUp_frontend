import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode';

const publicPaths = [
    '/user/login',
    '/user/signup',
    '/instructor/signup',
    '/instructor/login',
    '/instructor/forgot-password',
    '/instructor/password_otp',
    '/instructor/new_password',
    '/signup',
    '/login',
    '/instructor/otp',
    '/user/otp',
    '/user/forgot-password',
    '/user/password_otp',
    '/user/new_password',
    '/admin/login',
    '/'
  ];
 
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isHomePage = request.nextUrl.pathname === "/user/home";

  const isPublicPath = publicPaths.includes(path);


  

  const token = request.cookies.get('authToken')?.value ||
  request.cookies.get('refreshToken')?.value ||
  '';

 
  

if(isPublicPath && token ) {
    try{
        const decodedToken = jwtDecode<{email :string ; role:string}>(token);
        if(decodedToken.role === "User"){
            return NextResponse.redirect(new URL('/user/home', request.url));
        }else if(decodedToken.role === "Instructor"){
            return NextResponse.redirect(new URL('/instructor', request.url));
        }else if(decodedToken.role === "Admin") {
          return NextResponse.redirect(new URL('/admin' , request.url));
        }
    }catch(err) {
        console.log(err)
      }
  }
  if (path.startsWith('/admin') && !isPublicPath && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
}

  if (!isPublicPath && !token && path !== "/user/paymentSuccess") {
    return NextResponse.redirect(new URL('/login', request.url));
}

if (!isPublicPath && token) {
  try {
    const decodedToken = jwtDecode<{email :string ; role:string}>(token);
    const role = decodedToken.role;
    if (role === "User" &&  !path.startsWith("/user")) {
      return NextResponse.redirect(new URL("/user/home", request.url));
    }
    if (  role === "Instructor" && !path.startsWith("/instructor")) {
      return NextResponse.redirect(new URL("/instructor", request.url));
    }
    if (role === "Admin" && !path.startsWith("/admin")) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

}
 

export const config = {
  matcher: [
    '/instructor/:path*',
    '/instructor/signup',
    '/signup',
    '/login',
    '/admin/:path*',
    '/user/:path*'
    
]
}