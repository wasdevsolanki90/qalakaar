import { NextRequest, NextResponse } from 'next/server'
 
export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value
  let url = request.nextUrl
  // console.log(request.nextUrl.pathname)
  if (!session && url.pathname.startsWith('/api/checkout')) {
    // console.log("Requested URL", url)
    console.log("Requested NextURL", url.pathname)
    url.pathname = '/login';
    return Response.redirect(url)
  }
  
  return NextResponse.next();
}
 
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
}