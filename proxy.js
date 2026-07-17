// proxy.js (at root level)
import { withAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export default withAuth(
    async function proxy(req) {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        const isAuth = !!token;
        const { pathname } = req.nextUrl;
        const normalizedRole = token?.role ? String(token.role).toLowerCase() : undefined;
        const sanitizeAllowed = (sections) => {
            if (!Array.isArray(sections)) return [];
            return sections
                .map((section) => (typeof section === 'string' ? section.trim() : ''))
                .filter(Boolean);
        };
        const userAllowedSections = sanitizeAllowed(token?.allowedAdminSections);

        // Define route groups and pages
        const isAuthPage = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password");
        const isAdminRoute = pathname.startsWith("/admin");
        const isPublisherRoute = pathname.startsWith("/publisher");
        const isDashboardRoute = pathname.startsWith("/dashboard");
        const isProtected = isAdminRoute || isPublisherRoute || isDashboardRoute;
        const isVerifyPendingPage = pathname.startsWith("/verify-pending");
        const isEmailVerifyPage = pathname.startsWith("/verify-email");

        const url = req.nextUrl.clone();
        const ROLE_ADMIN_ACCESS = {
            admin: ['*'],
            'social media manager': ['/admin/publishers', '/admin/reporting'],
            'data entry': ['/admin/merchants', '/admin/networks'],
        };

        const getDefaultRedirectForRole = (role) => {
            if (!role) return "/dashboard";
            const normalized = role.toLowerCase();
            if (normalized === 'admin') return '/admin';
            if (normalized === 'publisher') return '/publisher';
            const allowed = ROLE_ADMIN_ACCESS[normalized];
            if (Array.isArray(allowed) && allowed.length > 0) {
                return allowed[0];
            }
            return '/dashboard';
        };
        const mergeAllowedPrefixes = (role, userSections) => {
            if (userSections && userSections.length) {
                if (userSections.includes('*')) {
                    return ['*'];
                }
                return userSections;
            }
            return ROLE_ADMIN_ACCESS[role] || [];
        };

        // --- CASE 1: USER IS AUTHENTICATED ---
        if (isAuth) {
            const isVerified = token.emailVerified;
            const userRole = normalizedRole;

            // 1.1: If user is NOT verified
            if (!isVerified) {
                // Redirect any request to the verify-pending page, unless they are already
                // on it or are trying to access the verification link from their email.
                if (!isVerifyPendingPage && !isEmailVerifyPage) {
                    url.pathname = "/verify-pending";
                    return NextResponse.redirect(url);
                }
            }
            // 1.2: If user IS verified
            else {
                // If a verified user is on an auth page or the pending page,
                // redirect them to their correct dashboard.
                if (isAuthPage || isVerifyPendingPage) {
                    if (userRole === 'admin') {
                        url.pathname = "/admin";
                    } else if (userRole === 'publisher') {
                        url.pathname = "/publisher";
                    } else {
                        url.pathname = "/dashboard"; // Default dashboard
                    }
                    return NextResponse.redirect(url);
                }

                // 1.3: Role-based access control for verified users.
                // If a non-admin tries to access an admin route, redirect them.
                if (isAdminRoute) {
                    const allowedPrefixes = mergeAllowedPrefixes(userRole, userAllowedSections);
                    if (!allowedPrefixes.includes('*')) {
                        const isAllowed = allowedPrefixes.some((prefix) => pathname.startsWith(prefix));
                        if (!isAllowed) {
                            url.pathname = getDefaultRedirectForRole(userRole);
                            return NextResponse.redirect(url);
                        }
                    }
                }
            }
        }
        // --- CASE 2: USER IS NOT AUTHENTICATED ---
        else {
            // If an unauthenticated user tries to access any protected route,
            // redirect them to the login page.
            if (isProtected) {
                url.pathname = "/login";
                url.searchParams.set("callbackUrl", pathname); // Save the page they were trying to access
                return NextResponse.redirect(url);
            }
        }

        // If none of the above conditions are met, allow the request to proceed.
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: () => true,
        },
    }
);

export const config = {
    matcher: [
        "/admin/:path*",
        "/dashboard/:path*",
        "/publisher/:path*",
        "/login",
        "/register",
        "/forgot-password",
        "/verify-pending",
        "/verify-email",
    ],
};
