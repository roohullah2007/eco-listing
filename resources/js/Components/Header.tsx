import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';

const navLinks = [
    { label: 'Map Search', href: '/map-search' },
    { label: 'Research', href: '#' },
    { label: 'CMA', href: '#' },
    { label: 'Market Analysis', href: '#' },
    { label: 'Listing Services', href: '#' },
];

export default function Header() {
    const { auth } = usePage<PageProps>().props;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

    return (
        <nav
            className="w-full shrink-0 border-b border-gray-200 bg-white"
            style={{ height: '50px' }}
        >
            <div className="mx-auto flex h-full items-center justify-between transition-all duration-500 ease-in-out" style={{ maxWidth: currentPath === '/map-search' ? '1408px' : '1280px' }}>
                {/* Left: Logo + Nav Links */}
                <div className="flex h-full items-center">
                    <Link
                        href="/"
                        className="mr-6 flex shrink-0 items-center"
                    >
                        <img
                            src="/images/ecolisting-logo.webp"
                            alt="EcoListing.ca"
                            style={{ width: '162px', height: '46px', objectFit: 'contain' }}
                        />
                    </Link>

                    <div className="hidden h-full items-center gap-0 lg:flex">
                        {navLinks.map((item) => {
                            const isActive = currentPath === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className="flex h-full items-center px-3 transition-colors hover:text-green-600"
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: isActive ? 600 : 500,
                                        color: '#1A1816',
                                        lineHeight: '50px',
                                        borderBottom: isActive ? '3px solid #2563eb' : '3px solid transparent',
                                    }}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Right: Toolkit + Phone + Login */}
                <div className="flex h-full items-center gap-3">
                    {/* Toolkit dropdown */}
                    <a
                        href="#"
                        className="flex h-full items-center gap-1 px-3 transition-colors hover:text-green-600"
                        style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            color: 'rgb(26, 24, 22)',
                            lineHeight: '50px',
                        }}
                    >
                        Toolkit
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                    </a>

                    {/* Phone icon */}
                    <a href="tel:" className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-100" style={{ width: '36px', height: '36px' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                    </a>

                    {/* Login button */}
                    {auth.user ? (
                        <Link
                            href={route('dashboard')}
                            className="flex items-center gap-2 rounded-full border border-gray-300 px-5 transition-colors hover:bg-gray-50"
                            style={{ height: '38px', fontSize: '13px', fontWeight: 600, color: '#1A1816', letterSpacing: '0.5px' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            DASHBOARD
                        </Link>
                    ) : (
                        <Link
                            href={route('login')}
                            className="flex items-center gap-2 rounded-full border border-gray-300 px-5 transition-colors hover:bg-gray-50"
                            style={{ height: '38px', fontSize: '13px', fontWeight: 600, color: '#1A1816', letterSpacing: '0.5px' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            LOGIN
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
