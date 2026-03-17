import { Link, usePage, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import { useState, useRef, useEffect } from 'react';

// Global loading bar component
function useNavigationLoading() {
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        const startHandler = () => {
            setLoading(true);
            setProgress(20);
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 90) { clearInterval(interval); return 90; }
                    return prev + Math.random() * 15;
                });
            }, 200);
        };

        const finishHandler = () => {
            clearInterval(interval);
            setProgress(100);
            setTimeout(() => { setLoading(false); setProgress(0); }, 300);
        };

        router.on('start', startHandler);
        router.on('finish', finishHandler);

        return () => {
            router.on('start', () => {});
            router.on('finish', () => {});
            clearInterval(interval);
        };
    }, []);

    return { loading, progress };
}

const navLinks = [
    { label: 'Map Search', href: '/map-search' },
    { label: 'Research', href: '/research' },
    { label: 'CMA', href: '/cma' },
    { label: 'Market Analysis', href: '/market-analysis' },
];

export default function Header() {
    const { auth } = usePage<PageProps>().props;
    const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const { loading, progress } = useNavigationLoading();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isServicesActive = currentPath === '/listing-services';

    return (
        <nav
            className="relative w-full shrink-0 border-b border-gray-200 bg-white"
            style={{ height: '50px', zIndex: 10000 }}
        >
            {/* Loading progress bar */}
            {loading && (
                <div className="absolute bottom-0 left-0 right-0" style={{ height: '2px', zIndex: 10001 }}>
                    <div style={{ height: '100%', width: `${progress}%`, backgroundColor: '#1A1816', transition: 'width 0.2s ease' }} />
                </div>
            )}
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
                                    prefetch
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

                        {/* Listing Services Dropdown */}
                        <div className="relative flex h-full items-center" ref={dropdownRef}>
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex h-full items-center gap-1 px-3 transition-colors hover:text-green-600"
                                style={{
                                    fontSize: '14px',
                                    fontWeight: isServicesActive ? 600 : 500,
                                    color: '#1A1816',
                                    lineHeight: '50px',
                                    borderBottom: isServicesActive ? '3px solid #2563eb' : '3px solid transparent',
                                }}
                            >
                                Listing Services
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform" style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}><polyline points="6 9 12 15 18 9" /></svg>
                            </button>

                            {dropdownOpen && (
                                <div className="absolute left-0 top-full mt-0 overflow-hidden rounded-2xl border border-gray-200 bg-white py-2" style={{ width: '280px', boxShadow: '0 8px 30px rgba(0,0,0,0.1)', zIndex: 9999 }}>
                                    <Link
                                        href="/listing-services"
                                        prefetch
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50"
                                    >
                                        <div className="flex items-center justify-center rounded-xl" style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f4', flexShrink: 0 }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 2l2.09 6.26L20.6 9.27l-5 4.73L16.18 21 12 17.77 7.82 21l.59-6.97-5-4.73 6.51-1.01z" />
                                                <path d="M5 3l1 2" /><path d="M19 3l-1 2" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>Our Services</div>
                                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Complete listing package</div>
                                        </div>
                                    </Link>
                                    <Link
                                        href="/listing-services#how-we-sell"
                                        prefetch
                                        onClick={() => setDropdownOpen(false)}
                                        className="flex items-center gap-3 px-5 py-3 transition-colors hover:bg-gray-50"
                                    >
                                        <div className="flex items-center justify-center rounded-xl" style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f4', flexShrink: 0 }}>
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                                <polyline points="9 22 9 12 15 12 15 22" />
                                            </svg>
                                        </div>
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>How We Sell</div>
                                            <div style={{ fontSize: '12px', color: '#9ca3af' }}>Our unique process</div>
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div>
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
