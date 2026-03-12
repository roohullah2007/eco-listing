import { Head } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const tabs = ['Local Trends', 'Sold Data', 'Comparables', 'Track Home Value', 'Why EcoListing?'];

/* ─── SVG placeholder icons ─── */

function ChartIcon() {
    return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
    );
}

function MapPinIcon() {
    return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}

function ScaleIcon() {
    return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="3" x2="12" y2="21" />
            <polyline points="8 7 4 15" />
            <polyline points="16 7 20 15" />
            <path d="M4 15a4 4 0 0 0 8 0" />
            <path d="M12 15a4 4 0 0 0 8 0" />
            <line x1="4" y1="7" x2="20" y2="7" />
        </svg>
    );
}

function HomeIcon() {
    return (
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    );
}

/* ─── Placeholder image box ─── */

function PlaceholderImage({ children, bg = '#f5f5f4' }: { children: React.ReactNode; bg?: string }) {
    return (
        <div
            className="flex items-center justify-center rounded-2xl"
            style={{ backgroundColor: bg, height: '400px', width: '100%' }}
        >
            <div
                className="flex items-center justify-center rounded-2xl border border-gray-200"
                style={{ width: '120px', height: '120px', backgroundColor: '#fff' }}
            >
                {children}
            </div>
        </div>
    );
}

/* ─── Section wrapper ─── */

function SectionWrapper({ bg = '#ffffff', children }: { bg?: string; children: React.ReactNode }) {
    return (
        <section style={{ backgroundColor: bg }}>
            <div className="mx-auto px-4" style={{ maxWidth: '1280px', paddingTop: '96px', paddingBottom: '96px' }}>
                {children}
            </div>
        </section>
    );
}

/* ─── Feature cards for Section 6 ─── */

const features = [
    {
        title: 'Maximum Exposure',
        description: 'Your home is listed on all major platforms — MLS, Realtor.ca, Zillow, and dozens of partner sites — ensuring every buyer sees your property.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="2" y1="12" x2="22" y2="12" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
    },
    {
        title: 'Professional Photos',
        description: 'High-quality photography, videography, and immersive virtual tours that make your listing stand out and attract more qualified buyers.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
            </svg>
        ),
    },
    {
        title: 'Expert Negotiation',
        description: 'Dedicated agents handle every offer, counteroffer, and closing detail — ensuring you get the best possible outcome on your sale.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        ),
    },
    {
        title: 'Transparent Fees',
        description: 'Clear, competitive pricing with no hidden costs. You know exactly what you\'re paying for — and exactly what you\'re saving.',
        icon: (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
        ),
    },
];

/* ─── Page ─── */

export default function Research() {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <>
            <Head title="Research Tools - EcoListing.ca" />
            <Header />

            {/* ───────── Section 1: Hero / Tools Overview ───────── */}
            <section className="w-full bg-white">
                <div className="mx-auto px-4" style={{ maxWidth: '1280px', paddingTop: '72px', paddingBottom: '72px' }}>
                    {/* Tab pills */}
                    <div className="mb-12 flex flex-wrap items-center gap-3">
                        {tabs.map((tab, i) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(i)}
                                className="transition-all"
                                style={{
                                    padding: '10px 24px',
                                    borderRadius: '9999px',
                                    fontSize: '14px',
                                    fontWeight: 600,
                                    border: i === activeTab ? '1.5px solid #1A1816' : '1.5px solid #d4d4d4',
                                    backgroundColor: i === activeTab ? '#1A1816' : '#ffffff',
                                    color: i === activeTab ? '#ffffff' : '#1A1816',
                                    cursor: 'pointer',
                                }}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Main heading */}
                    <h1 style={{ fontSize: '48px', fontWeight: 700, lineHeight: '56px', color: '#1A1816', maxWidth: '700px' }}>
                        Don't trust opinions — trust data
                    </h1>

                    <p className="mt-6" style={{ fontSize: '18px', lineHeight: '28px', color: '#52525b', maxWidth: '760px' }}>
                        Whether you're a buyer or a seller, it is important to understand the value of your property or asset. With latest data in your hands, now you are armed with all the information you need to make informed decisions.
                    </p>

                    <p className="mt-4" style={{ fontSize: '16px', lineHeight: '26px', color: '#71717a', maxWidth: '760px' }}>
                        Explore tools that provide you the complete picture of your local market, your property comparables and recent sold in your area.
                    </p>
                </div>
            </section>

            {/* ───────── Section 2: Market Data ───────── */}
            <SectionWrapper bg="#fafaf9">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left: content */}
                    <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#1A1816', textTransform: 'uppercase' as const }}>
                            Market Data
                        </span>
                        <h2 className="mt-4" style={{ fontSize: '36px', fontWeight: 700, lineHeight: '44px', color: '#1A1816' }}>
                            Market Data gives you the community-level data you need
                        </h2>
                        <p className="mt-6" style={{ fontSize: '16px', lineHeight: '26px', color: '#52525b' }}>
                            Understand neighbourhood trends before making a move. Our Market Data tool aggregates the latest community-level statistics including median prices, days on market, price-per-square-foot, and inventory levels.
                        </p>
                        <p className="mt-4" style={{ fontSize: '16px', lineHeight: '26px', color: '#71717a' }}>
                            Track month-over-month changes to see where values are heading and identify the best time to buy or sell in your area.
                        </p>
                        <button
                            className="mt-8 transition-colors hover:bg-[#2a2826]"
                            style={{ backgroundColor: '#1A1816', color: '#ffffff', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '12px' }}
                        >
                            Explore Market Data
                        </button>
                    </div>
                    {/* Right: placeholder */}
                    <PlaceholderImage>
                        <ChartIcon />
                    </PlaceholderImage>
                </div>
            </SectionWrapper>

            {/* ───────── Section 3: Sold Data ───────── */}
            <SectionWrapper bg="#ffffff">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left: placeholder */}
                    <PlaceholderImage>
                        <MapPinIcon />
                    </PlaceholderImage>
                    {/* Right: content */}
                    <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#1A1816', textTransform: 'uppercase' as const }}>
                            Sold Data
                        </span>
                        <h2 className="mt-4" style={{ fontSize: '36px', fontWeight: 700, lineHeight: '44px', color: '#1A1816' }}>
                            Sold Data gives you transparent pricing — essential for every homeowner
                        </h2>
                        <p className="mt-6" style={{ fontSize: '16px', lineHeight: '26px', color: '#52525b' }}>
                            Access actual sold prices for properties in your area. Unlike list prices, sold data reveals what buyers are truly willing to pay — giving you the real picture of market value.
                        </p>
                        <p className="mt-4" style={{ fontSize: '16px', lineHeight: '26px', color: '#71717a' }}>
                            Filter by property type, neighbourhood, and date range to find the most relevant comparisons. See how long homes sat on the market and how final prices compared to asking prices.
                        </p>
                        <p className="mt-4" style={{ fontSize: '16px', lineHeight: '26px', color: '#71717a' }}>
                            Whether you're preparing to list your home or evaluating a purchase, transparent sold data is the foundation of a smart real estate decision.
                        </p>
                        <button
                            className="mt-8 transition-colors hover:bg-[#2a2826]"
                            style={{ backgroundColor: '#1A1816', color: '#ffffff', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '12px' }}
                        >
                            Dive into Sold Data
                        </button>
                    </div>
                </div>
            </SectionWrapper>

            {/* ───────── Section 4: Comparables Tool ───────── */}
            <SectionWrapper bg="#f5f5f4">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left: content */}
                    <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#1A1816', textTransform: 'uppercase' as const }}>
                            Comparables
                        </span>
                        <h2 className="mt-4" style={{ fontSize: '36px', fontWeight: 700, lineHeight: '44px', color: '#1A1816' }}>
                            Arm yourself with comparables data
                        </h2>
                        <p className="mt-6" style={{ fontSize: '16px', lineHeight: '26px', color: '#52525b' }}>
                            Our patent-pending comparables tool goes beyond simple proximity matching. It uses multi-variable analysis — lot size, square footage, upgrades, age, and neighbourhood dynamics — to assign each comparable a match score.
                        </p>
                        <p className="mt-4" style={{ fontSize: '16px', lineHeight: '26px', color: '#71717a' }}>
                            See how your property stacks up against similar homes that recently sold, are currently listed, or were taken off the market. Use these insights to price confidently or negotiate from a position of strength.
                        </p>
                        <button
                            className="mt-8 transition-colors hover:bg-[#2a2826]"
                            style={{ backgroundColor: '#1A1816', color: '#ffffff', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '12px' }}
                        >
                            Find your Comparables
                        </button>
                    </div>
                    {/* Right: placeholder */}
                    <PlaceholderImage bg="#e8e8e8">
                        <ScaleIcon />
                    </PlaceholderImage>
                </div>
            </SectionWrapper>

            {/* ───────── Section 5: Track Home Value ───────── */}
            <SectionWrapper bg="#ffffff">
                <div className="grid items-center gap-16 lg:grid-cols-2">
                    {/* Left: placeholder */}
                    <PlaceholderImage>
                        <HomeIcon />
                    </PlaceholderImage>
                    {/* Right: content */}
                    <div>
                        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#1A1816', textTransform: 'uppercase' as const }}>
                            Home Value
                        </span>
                        <h2 className="mt-4" style={{ fontSize: '36px', fontWeight: 700, lineHeight: '44px', color: '#1A1816' }}>
                            Track Your Home Value
                        </h2>
                        <p className="mt-6" style={{ fontSize: '16px', lineHeight: '26px', color: '#52525b' }}>
                            Register your home and get a personalised dashboard that tracks your property's estimated value over time. See how market shifts, neighbourhood sales, and seasonal trends affect what your home is worth.
                        </p>
                        <p className="mt-4" style={{ fontSize: '16px', lineHeight: '26px', color: '#71717a' }}>
                            Receive monthly updates, compare your home against recent sales, and know exactly where you stand — whether you plan to sell this year or in five.
                        </p>
                        <button
                            className="mt-8 transition-colors hover:bg-[#2a2826]"
                            style={{ backgroundColor: '#1A1816', color: '#ffffff', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '12px' }}
                        >
                            Add your Home
                        </button>
                    </div>
                </div>
            </SectionWrapper>

            {/* ───────── Section 6: Why List With EcoListing ───────── */}
            <SectionWrapper bg="#fafaf9">
                <div className="text-center">
                    <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#1A1816', textTransform: 'uppercase' as const }}>
                        Why EcoListing
                    </span>
                    <h2 className="mx-auto mt-4" style={{ fontSize: '36px', fontWeight: 700, lineHeight: '44px', color: '#1A1816', maxWidth: '600px' }}>
                        Data-driven insights meet expert service
                    </h2>
                </div>

                <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {features.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                            style={{ padding: '32px 24px' }}
                        >
                            <div
                                className="mb-5 flex items-center justify-center rounded-2xl border border-gray-200"
                                style={{ width: '56px', height: '56px', backgroundColor: '#f5f5f4' }}
                            >
                                {f.icon}
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#1A1816', lineHeight: '24px' }}>
                                {f.title}
                            </h3>
                            <p className="mt-3" style={{ fontSize: '14px', lineHeight: '22px', color: '#71717a' }}>
                                {f.description}
                            </p>
                        </div>
                    ))}
                </div>
            </SectionWrapper>

            {/* ───────── Section 7: Selling Tools CTA ───────── */}
            <section style={{ backgroundColor: '#1A1816' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px', paddingTop: '96px', paddingBottom: '96px' }}>
                    <div className="mx-auto text-center" style={{ maxWidth: '680px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#a3a3a3', textTransform: 'uppercase' as const }}>
                            Selling Tools
                        </span>
                        <h2 className="mt-4" style={{ fontSize: '36px', fontWeight: 700, lineHeight: '44px', color: '#ffffff' }}>
                            My EcoListing Overview
                        </h2>
                        <p className="mt-6" style={{ fontSize: '16px', lineHeight: '26px', color: '#a3a3a3' }}>
                            Ready to sell smarter? Access your personalised seller dashboard, track listing performance, manage showings, and connect with your dedicated agent — all in one place.
                        </p>
                        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                            <button
                                className="transition-colors hover:bg-gray-100"
                                style={{ backgroundColor: '#ffffff', color: '#1A1816', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '9999px' }}
                            >
                                List My Property
                            </button>
                            <button
                                className="transition-colors hover:bg-white/10"
                                style={{ border: '1.5px solid rgba(255,255,255,0.3)', backgroundColor: 'transparent', color: '#ffffff', fontSize: '15px', fontWeight: 600, padding: '14px 32px', borderRadius: '9999px' }}
                            >
                                Book Agent Consultation
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
