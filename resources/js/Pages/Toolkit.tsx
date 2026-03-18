import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

/* ─── Tools Data ─── */
const tools = [
    {
        title: 'Property Value Estimator',
        description: 'Get an instant estimate of your property\'s market value based on recent comparable sales, market trends, and neighborhood data.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
            </svg>
        ),
        href: '/cma',
        cta: 'Get Estimate',
    },
    {
        title: 'Map Search',
        description: 'Search for properties on an interactive map. Draw custom areas, filter by price, beds, baths, and more to find your perfect home.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
            </svg>
        ),
        href: '/map-search',
        cta: 'Search Map',
    },
    {
        title: 'Market Analysis',
        description: 'Explore real-time market statistics, active and sold listings, price trends, and days on market for any city in British Columbia.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
        href: '/market-analysis',
        cta: 'View Analysis',
    },
    {
        title: 'CMA Report',
        description: 'Request a detailed Comparative Market Analysis from a licensed REALTOR. Understand exactly what your property is worth with professional data.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
            </svg>
        ),
        href: '/cma',
        cta: 'Get CMA Report',
    },
    {
        title: 'Research Centre',
        description: 'Access real estate news, market reports, neighborhood guides, and expert insights to make informed decisions about buying or selling.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
        ),
        href: '/research',
        cta: 'Explore Research',
    },
    {
        title: 'Listing Services',
        description: 'View our complete flat-fee listing package. Everything from professional photography to agent-led showings and full transaction support.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.09 6.26L20.6 9.27l-5 4.73L16.18 21 12 17.77 7.82 21l.59-6.97-5-4.73 6.51-1.01z" />
            </svg>
        ),
        href: '/listing-services',
        cta: 'View Services',
    },
];

const quickActions = [
    { label: 'Get a Free Home Evaluation', description: 'Find out what your property is worth', href: '/cma', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z' },
    { label: 'Search Properties', description: 'Browse MLS listings on an interactive map', href: '/map-search', icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z' },
    { label: 'Book a Consultation', description: 'Speak with a licensed agent today', href: '#', icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z' },
];

export default function Toolkit() {
    return (
        <>
            <Head title="Toolkit - EcoListing.ca" />
            <Header />

            {/* ═══ Hero ═══ */}
            <section className="bg-white" style={{ paddingTop: '64px', paddingBottom: '48px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="text-center" style={{ maxWidth: '680px', margin: '0 auto' }}>
                        <p className="uppercase tracking-widest" style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '2px', marginBottom: '16px' }}>
                            Toolkit
                        </p>
                        <h1 style={{ fontSize: '44px', fontWeight: 800, color: '#1A1816', lineHeight: '1.1', marginBottom: '16px' }}>
                            Everything you need,{' '}
                            <span style={{ color: '#9ca3af' }}>in one place.</span>
                        </h1>
                        <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: '28px' }}>
                            Free tools and resources to help you buy, sell, and understand the real estate market in British Columbia.
                        </p>
                    </div>
                </div>
            </section>

            {/* ═══ Quick Actions ═══ */}
            <section className="bg-white" style={{ paddingBottom: '64px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="grid gap-4 md:grid-cols-3">
                        {quickActions.map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className="group flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300"
                                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                            >
                                <div className="flex shrink-0 items-center justify-center rounded-xl transition-colors group-hover:bg-gray-100" style={{ width: '52px', height: '52px', backgroundColor: '#f5f5f4' }}>
                                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d={action.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '15px', fontWeight: 700, color: '#1A1816' }}>{action.label}</div>
                                    <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '2px' }}>{action.description}</div>
                                </div>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto shrink-0 transition-colors group-hover:stroke-gray-600"><polyline points="9 18 15 12 9 6" /></svg>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Tools Grid ═══ */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#1A1816', lineHeight: '1.2' }}>
                            Explore Our Tools
                        </h2>
                        <p className="mt-3" style={{ fontSize: '15px', color: '#6b7280' }}>
                            Each tool is built to give you a competitive edge in BC's real estate market.
                        </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {tools.map((tool) => (
                            <div
                                key={tool.title}
                                className="group flex flex-col rounded-2xl border border-gray-200 bg-white transition-all hover:border-gray-300"
                                style={{ padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                            >
                                <div className="flex items-center justify-center rounded-xl" style={{ width: '56px', height: '56px', backgroundColor: '#f5f5f4', marginBottom: '20px', color: '#1A1816' }}>
                                    {tool.icon}
                                </div>
                                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1A1816', marginBottom: '8px' }}>
                                    {tool.title}
                                </h3>
                                <p className="flex-1" style={{ fontSize: '14px', color: '#6b7280', lineHeight: '22px', marginBottom: '24px' }}>
                                    {tool.description}
                                </p>
                                <Link
                                    href={tool.href}
                                    className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
                                    style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}
                                >
                                    {tool.cta}
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Stats Section ═══ */}
            <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: '#1A1816' }}>
                        <div className="grid grid-cols-2 lg:grid-cols-4">
                            {[
                                { value: '10,000+', label: 'Active Listings', desc: 'Searchable on our platform' },
                                { value: '50+', label: 'Cities Covered', desc: 'Across British Columbia' },
                                { value: '24/7', label: 'Virtual Tours', desc: 'Available anytime' },
                                { value: '100%', label: 'Free Tools', desc: 'No sign-up required' },
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col items-center justify-center p-8 text-center" style={{ borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                                    <div style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', lineHeight: '1' }}>{stat.value}</div>
                                    <div className="mt-2" style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>{stat.label}</div>
                                    <div className="mt-1" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{stat.desc}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ CTA ═══ */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '64px', paddingBottom: '64px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#1A1816', lineHeight: '1.2', marginBottom: '12px' }}>
                        Ready to get started?
                    </h2>
                    <p style={{ fontSize: '15px', color: '#6b7280', marginBottom: '28px' }}>
                        Whether you're buying or selling, our tools and expert agents are here to help you every step of the way.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link
                            href="/listing-services"
                            className="inline-flex items-center justify-center rounded-xl text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#1A1816', height: '48px', paddingLeft: '28px', paddingRight: '28px', fontSize: '14px', fontWeight: 600 }}
                        >
                            View Listing Services
                        </Link>
                        <Link
                            href="/map-search"
                            className="inline-flex items-center justify-center rounded-xl border-2 transition-colors hover:bg-gray-50"
                            style={{ borderColor: '#1A1816', height: '48px', paddingLeft: '28px', paddingRight: '28px', fontSize: '14px', fontWeight: 600, color: '#1A1816' }}
                        >
                            Search Properties
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
