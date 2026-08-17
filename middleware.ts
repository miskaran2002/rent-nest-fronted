import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// সার্ভারলেস এজ (Edge)-এ রান করার জন্য লাইটওয়েট ডিকোড হেল্পার
function decodeJWTPayload(token: string) {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = atob(base64);
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // ১. কুকি থেকে রেন্টনেস্ট টোকেনটি রিড করা
  const token = request.cookies.get('rentnest_token')?.value;

  // রাউট গ্রুপ আইডেন্টিফাই করা
  const isAdminRoute = pathname.startsWith('/admin-dashboard');
  const isLandlordRoute = pathname.startsWith('/landlord-dashboard');
  const isTenantRoute = pathname.startsWith('/tenant-dashboard');
  const isProfileRoute = pathname.startsWith('/profile');
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');

  // কেস ১: ইউজার লগইন করা নেই (No Token)
  if (!token) {
    if (isAdminRoute || isLandlordRoute || isTenantRoute || isProfileRoute) {
      const loginUrl = new URL('/login', request.url);
      // ইউজার যে পেজে ঢুকতে চেয়েছিল তার ইউআরএল রেফারেন্স হিসেবে পাস করা (UX Improvement)
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // কেস ২: ইউজার লগইন করা আছে, টোকেন ডিকোড করা
  const decodedUser = decodeJWTPayload(token);

  // টোকেন করাপ্টেড বা মেয়াদোত্তীর্ণ হলে লগআউট করানো
  if (!decodedUser) {
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('rentnest_token');
    return response;
  }

  const { role } = decodedUser;

  // ৩. গেস্ট রাউট প্রটেকশন (লগইন থাকা অবস্থায় কেউ যেন /login বা /register-এ যেতে না পারে)
  if (isAuthRoute) {
    return redirectToDashboard(role, request);
  }

  // ৪. রোল-বেসড ড্যাশবোর্ড প্রটেকশন (অনধিকার প্রবেশ রোধ লজিক)
  if (isAdminRoute && role !== 'ADMIN') {
    return redirectToDashboard(role, request); // অ্যাডমিন না হলে তার নিজের রোল ড্যাশবোর্ডে ফেরত পাঠানো
  }

  if (isLandlordRoute && role !== 'LANDLORD') {
    return redirectToDashboard(role, request); // ল্যান্ডলর্ড না হলে তার নিজের রোল ড্যাশবোর্ডে ফেরত পাঠানো
  }

  if (isTenantRoute && role !== 'TENANT') {
    return redirectToDashboard(role, request); // টেন্যান্ট না হলে তার নিজের রোল ড্যাশবোর্ডে ফেরত পাঠানো
  }

  return NextResponse.next();
}

// রোল অনুযায়ী স্বয়ংক্রিয়ভাবে সঠিক ড্যাশবোর্ডে রিডাইরেক্ট করার হেল্পার
function redirectToDashboard(role: string, request: NextRequest) {
  if (role === 'ADMIN') {
    return NextResponse.redirect(new URL('/admin-dashboard', request.url));
  } else if (role === 'LANDLORD') {
    return NextResponse.redirect(new URL('/landlord-dashboard', request.url));
  } else {
    return NextResponse.redirect(new URL('/tenant-dashboard', request.url));
  }
}

// মিডলওয়্যার কনফিগারেশন ম্যাচিং ফিল্টার
export const config = {
  matcher: [
    '/login',
    '/register',
    '/profile/:path*',
    '/admin-dashboard/:path*',
    '/landlord-dashboard/:path*',
    '/tenant-dashboard/:path*',
  ],
};