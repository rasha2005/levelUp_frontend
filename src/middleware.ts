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
    '/admin/login',
    '/'
  ];
 
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  console.log("path" , path);
  const isHomePage = request.nextUrl.pathname === "/user/home";

  const isPublicPath = publicPaths.includes(path);
  console.log("ispublicpath" , isPublicPath);

  

  const token = request.cookies.get('authToken')?.value || '';
  console.log("token" , request.cookies)
 
  


if(isPublicPath && token ) {
    try{
        const decodedToken = jwtDecode<{email :string ; role:string}>(token);
        console.log("decodedToekn.role" , decodedToken.role);
        if(decodedToken.role === "User"){
            return NextResponse.redirect(new URL('/user/home', request.url));
        }else if(decodedToken.role === "Instructor"){
          console.log("krrr");
            return NextResponse.redirect(new URL('/instructor', request.url));
        }else if(decodedToken.role === "Admin") {
          return NextResponse.redirect(new URL('/admin' , request.url));
        }
    }catch(err) {
        console.log(err)
      }
  }
  
  if (path.startsWith('/admin') && !isPublicPath && !token) {
    console.log("nooooooooooooooo");
    console.log("Redirecting to /admin/login");
    return NextResponse.redirect(new URL('/admin/login', request.url));
}

  if (!isPublicPath && !token && path !== "/user/paymentSuccess") {
    console.log("kkkkk" , token);
    return NextResponse.redirect(new URL('/login', request.url));
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