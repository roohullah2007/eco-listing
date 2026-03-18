import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

/* ─── Steps Data ─── */
const steps = [
    {
        num: '01',
        title: 'Determine Your Budget',
        description: 'Understanding your financial position is the foundation of a successful home purchase.',
        bullets: ['Mortgage pre-approval', 'Down payment planning', 'Closing costs overview', 'Monthly expense calculator'],
        accent: { stat: '$480K', label: 'Avg. first-time buyer budget in BC' },
    },
    {
        num: '02',
        title: 'Find the Right Property',
        description: 'With thousands of listings available, knowing what to look for saves time and stress.',
        bullets: ['Define your must-haves', 'Research neighborhoods', 'Use our map search tool', 'Attend open houses'],
        accent: { stat: '12K+', label: 'Active listings across British Columbia' },
    },
    {
        num: '03',
        title: 'Make an Offer',
        description: 'Crafting a competitive offer requires understanding the market and negotiation strategies.',
        bullets: ['Understanding market value', 'Offer conditions & subjects', 'Deposit requirements', 'Negotiation tips'],
        accent: { stat: '97%', label: 'Of our clients secure their first-choice home' },
    },
    {
        num: '04',
        title: 'Due Diligence',
        description: 'Protecting your investment through proper inspections and research before closing.',
        bullets: ['Home inspection essentials', 'Title search & insurance', 'Property disclosure review', 'Strata document review'],
        accent: { stat: '5–10', label: 'Business days typical subject removal period' },
    },
    {
        num: '05',
        title: 'Close & Move In',
        description: 'The final steps from accepted offer to getting the keys to your new home.',
        bullets: ['Finalizing your mortgage', 'Lawyer & notary process', 'Property transfer tax in BC', 'Moving day checklist'],
        accent: { stat: '30', label: 'Days average from accepted offer to possession' },
    },
];

/* ─── Helpful Tools Data ─── */
const tools = [
    {
        title: 'Map Search',
        href: '/map-search',
        description: 'Browse listings on an interactive map',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
        ),
    },
    {
        title: 'Value Estimate',
        href: '/value-estimate',
        description: 'Check property values in your area',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
    {
        title: 'Market Analysis',
        href: '/market-analysis',
        description: 'Understand local market trends',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
            </svg>
        ),
    },
];

/* ─── Check Icon ─── */
function CheckCircle() {
    return (
        <div className="flex shrink-0 items-center justify-center rounded-full" style={{ width: '22px', height: '22px', border: '1.5px solid #d1d5db' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
    );
}

/* ─── Page ─── */
export default function BuyerGuide() {
    return (
        <>
            <Head title="Buyer's Guide - EcoListing.ca" />
            <Header />

            {/* ═══ Hero Section ═══ */}
            <section style={{ backgroundColor: '#1A1816', paddingTop: '80px', paddingBottom: '100px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <p className="uppercase tracking-widest" style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', letterSpacing: '2px', marginBottom: '20px' }}>
                        For Buyers
                    </p>
                    <h1 style={{ fontSize: '44px', fontWeight: 800, color: '#ffffff', lineHeight: '1.15', marginBottom: '20px', maxWidth: '650px' }}>
                        Buyer's Guide to BC Real Estate
                    </h1>
                    <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.55)', lineHeight: '28px', maxWidth: '560px' }}>
                        Navigate the home buying process with confidence. From budgeting to closing, we walk you through every step of purchasing property in British Columbia.
                    </p>
                </div>
            </section>

            {/* ═══ Guide Steps ═══ */}
            {steps.map((step, i) => {
                const isOdd = i % 2 === 0; // 0-indexed: steps 01,03,05 are odd-numbered
                return (
                    <section key={step.num} className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                        <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                            <div className="grid items-center gap-16 lg:grid-cols-2">
                                {/* Content side */}
                                <div className={isOdd ? 'order-1' : 'order-2'}>
                                    {/* Step number with line */}
                                    <div className="flex items-center gap-3" style={{ marginBottom: '24px' }}>
                                        <span style={{ fontSize: '72px', fontWeight: 800, color: '#f0f0ef', lineHeight: '1' }}>{step.num}</span>
                                        <div style={{ width: '48px', height: '3px', backgroundColor: '#1A1816', borderRadius: '2px' }} />
                                    </div>

                                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.15', marginBottom: '12px' }}>
                                        {step.title}
                                    </h2>
                                    <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '26px', marginBottom: '32px' }}>
                                        {step.description}
                                    </p>

                                    {/* Bullet points */}
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                        {step.bullets.map((bullet) => (
                                            <div key={bullet} className="flex items-center gap-3">
                                                <CheckCircle />
                                                <span style={{ fontSize: '14px', color: '#4b5563', fontWeight: 500 }}>{bullet}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Dark accent card */}
                                <div className={isOdd ? 'order-2' : 'order-1'}>
                                    <div className="relative flex flex-col items-center justify-center overflow-hidden rounded-2xl" style={{ backgroundColor: '#1A1816', minHeight: '360px', padding: '48px' }}>
                                        {/* Large background number */}
                                        <span className="pointer-events-none select-none" style={{ fontSize: '120px', fontWeight: 800, color: 'rgba(255,255,255,0.1)', lineHeight: '1', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                                            {step.num}
                                        </span>
                                        {/* Stat/quote */}
                                        <div className="relative z-10 text-center">
                                            <div style={{ fontSize: '48px', fontWeight: 800, color: '#ffffff', lineHeight: '1', marginBottom: '12px' }}>
                                                {step.accent.stat}
                                            </div>
                                            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)', lineHeight: '22px', maxWidth: '240px' }}>
                                                {step.accent.label}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* ═══ Helpful Tools ═══ */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <h2 className="text-center" style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.15', marginBottom: '48px' }}>
                        Helpful Tools
                    </h2>

                    <div className="grid gap-8 md:grid-cols-3">
                        {tools.map((tool) => (
                            <Link
                                key={tool.title}
                                href={tool.href}
                                className="group flex flex-col rounded-2xl bg-white p-8 transition-shadow hover:shadow-lg"
                                style={{ border: '1px solid #f0f0ef' }}
                            >
                                {/* Icon */}
                                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl" style={{ backgroundColor: '#f5f5f4' }}>
                                    {tool.icon}
                                </div>

                                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816', marginBottom: '8px' }}>
                                    {tool.title}
                                </h3>
                                <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '22px', marginBottom: '20px' }}>
                                    {tool.description}
                                </p>

                                {/* Arrow */}
                                <div className="mt-auto flex items-center gap-1 transition-transform group-hover:translate-x-1" style={{ color: '#1A1816' }}>
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                        <polyline points="12 5 19 12 12 19" />
                                    </svg>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ CTA Section ═══ */}
            <section style={{ backgroundColor: '#1A1816', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '640px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', lineHeight: '1.15', marginBottom: '16px' }}>
                        Ready to Find Your Dream Home?
                    </h2>
                    <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.5)', lineHeight: '26px', marginBottom: '36px' }}>
                        Start your home search today or speak with one of our experienced agents for personalized guidance.
                    </p>
                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Link
                            href="/map-search"
                            className="flex items-center justify-center rounded-xl uppercase tracking-wider transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#ffffff', color: '#1A1816', height: '52px', paddingLeft: '32px', paddingRight: '32px', fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}
                        >
                            Search Properties
                        </Link>
                        <Link
                            href="/cma"
                            className="flex items-center justify-center rounded-xl uppercase tracking-wider transition-colors hover:bg-white/10"
                            style={{ border: '2px solid rgba(255,255,255,0.3)', color: '#ffffff', height: '52px', paddingLeft: '32px', paddingRight: '32px', fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}
                        >
                            Book A Consultation
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
