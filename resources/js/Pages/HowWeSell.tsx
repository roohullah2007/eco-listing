import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

/* ─── Steps Data ─── */
const steps = [
    {
        num: '01',
        title: 'Determine Your Listing Price',
        subtitle: 'Data-Driven Market Valuation',
        description: 'Our agents consult with you to determine the optimal listing price by analyzing local market comparables through a Comparative Market Analysis (CMA). This establishes an accurate, data-driven baseline for your sale.',
        features: ['Personalized consultation', 'Comparative Market Analysis (CMA)', 'Goal setting & strategy', 'Preparation for photography'],
        image: '/images/01.jpeg',
        cta: { primary: 'Get Your Free Home Evaluation', secondary: 'Download Sample Report' },
    },
    {
        num: '02',
        title: 'Professional 3D Marketing',
        subtitle: 'Marketing That Reaches Buyers',
        description: "Our marketing team creates a high-fidelity 3D digital model and professional media assets to highlight your property's best features. We distribute your listing across all major platforms, allowing buyers to tour the property remotely.",
        features: ['Professional photography & videography', 'Listings on all real estate platforms', 'Social media & targeted ads', 'QR code yard signs'],
        image: '/images/02.jpeg',
    },
    {
        num: '03',
        title: 'Virtual Showings & Buyer Screening',
        subtitle: 'Smart Filtering for Qualified Buyers',
        description: 'We conduct live virtual showings to highlight key features and answer inquiries in real-time. This step gauges genuine interest and filters out unqualified leads before we schedule any physical visits, ensuring only serious buyers enter your home.',
        features: ['24/7 virtual showings', 'Buyer pre-qualification', 'Real-time inquiry management', 'Buyer behavior insights'],
        image: '/images/03.jpeg',
    },
    {
        num: '04',
        title: 'In-Person Walkthroughs',
        subtitle: 'Professional Showings That Convert',
        description: 'For interested buyers ready to proceed, our agents host professional in-person viewings. This allows buyers to verify that the property matches their virtual experience while we manage scheduling and presentation to ensure a safe, organized process.',
        features: ['Showing scheduling', 'Professional presentation', 'Safety protocols maintained', 'Buyer feedback collection'],
        image: '/images/04.jpeg',
    },
    {
        num: '05',
        title: 'Offers, Negotiations & Closing',
        subtitle: 'Securing the Best Price & Terms',
        description: 'We review offers alongside you, using market data to negotiate favorable price and contract terms. Our team handles all documentation and legalities to ensure a transparent, compliant, and successful closing.',
        features: ['Strategic offer evaluation', 'Expert negotiation tactics', 'Complete legal compliance', 'Smooth closing process'],
        image: '/images/05.jpeg',
    },
];

const stats = [
    { value: '87%', label: 'MORE BUYERS' },
    { value: '45', label: 'AVG. DAYS TO SELL' },
    { value: '32%', label: 'FASTER SELLING' },
    { value: '4-9%', label: 'HIGHER PRICE' },
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
export default function HowWeSell() {
    return (
        <>
            <Head title="How We Sell - EcoListing.ca" />
            <Header />

            {/* ═══ Hero Section ═══ */}
            <section className="relative overflow-hidden" style={{ backgroundColor: '#1A1816' }}>
                {/* Background image overlay */}
                <div className="absolute inset-0" style={{ backgroundImage: 'url(/images/01.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.25 }} />
                <div className="relative mx-auto px-4" style={{ maxWidth: '1280px', paddingTop: '80px', paddingBottom: '100px' }}>
                    <h1 style={{ fontSize: '52px', fontWeight: 800, color: '#ffffff', lineHeight: '1.1', marginBottom: '20px', maxWidth: '650px' }}>
                        Your Journey to a{' '}
                        <span style={{ color: '#9ca3af' }}>Successful Sale</span>
                    </h1>
                    <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.6)', lineHeight: '28px', maxWidth: '600px' }}>
                        From the first consultation to the final closing, our services provide every tool needed for a successful sale, allowing you to simply sit back and relax.
                    </p>
                </div>

                {/* Stats bar - overlapping */}
                <div className="relative mx-auto px-4" style={{ maxWidth: '1280px', marginBottom: '-52px' }}>
                    <div className="grid grid-cols-4 overflow-hidden rounded-2xl bg-white" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
                        {stats.map((stat, i) => (
                            <div key={i} className="flex flex-col items-center justify-center py-8" style={{ borderRight: i < 3 ? '1px solid #f0f0ef' : 'none' }}>
                                <div style={{ fontSize: '40px', fontWeight: 800, color: '#1A1816', lineHeight: '1' }}>{stat.value}</div>
                                <div className="mt-2 uppercase tracking-widest" style={{ fontSize: '11px', fontWeight: 600, color: '#9ca3af', letterSpacing: '1.5px' }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Spacer for overlapping stats */}
            <div style={{ height: '52px', backgroundColor: '#ffffff' }} />

            {/* ═══ Steps ═══ */}
            {steps.map((step, i) => {
                const isEven = i % 2 === 1;
                return (
                    <section key={step.num} className="bg-white" style={{ paddingTop: i === 0 ? '48px' : '80px', paddingBottom: '80px' }}>
                        <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                            <div className={`grid items-center gap-16 lg:grid-cols-2 ${isEven ? '' : ''}`}>
                                {/* Content side */}
                                <div className={isEven ? 'order-2' : 'order-1'}>
                                    {/* Step number with line */}
                                    <div className="flex items-center gap-3" style={{ marginBottom: '24px' }}>
                                        <span style={{ fontSize: '72px', fontWeight: 800, color: '#f0f0ef', lineHeight: '1' }}>{step.num}</span>
                                        <div style={{ width: '48px', height: '3px', backgroundColor: '#1A1816', borderRadius: '2px' }} />
                                    </div>

                                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.15', marginBottom: '8px' }}>
                                        {step.title}
                                    </h2>
                                    <p style={{ fontSize: '15px', fontWeight: 600, color: '#6b7280', marginBottom: '20px' }}>
                                        {step.subtitle}
                                    </p>
                                    <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '26px', marginBottom: '32px' }}>
                                        {step.description}
                                    </p>

                                    {/* Key Features */}
                                    <div style={{ marginBottom: '32px' }}>
                                        <p className="uppercase tracking-widest" style={{ fontSize: '11px', fontWeight: 700, color: '#1A1816', letterSpacing: '1.5px', marginBottom: '16px' }}>
                                            Key Features
                                        </p>
                                        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                            {step.features.map((feat) => (
                                                <div key={feat} className="flex items-center gap-3">
                                                    <CheckCircle />
                                                    <span style={{ fontSize: '14px', color: '#4b5563', fontWeight: 500 }}>{feat}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTAs (only for step 01) */}
                                    {step.cta && (
                                        <div className="flex flex-col gap-3" style={{ maxWidth: '360px' }}>
                                            <a href="/cma" className="flex items-center justify-center rounded-xl text-white uppercase tracking-wider transition-opacity hover:opacity-90" style={{ backgroundColor: '#1A1816', height: '52px', fontSize: '13px', fontWeight: 700, letterSpacing: '1px' }}>
                                                {step.cta.primary}
                                            </a>
                                            <a href="#" className="flex items-center justify-center gap-2 rounded-xl border-2 uppercase tracking-wider transition-colors hover:bg-gray-50" style={{ borderColor: '#1A1816', height: '52px', fontSize: '13px', fontWeight: 700, color: '#1A1816', letterSpacing: '1px' }}>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
                                                </svg>
                                                {step.cta.secondary}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                {/* Image side */}
                                <div className={isEven ? 'order-1' : 'order-2'}>
                                    <div className="overflow-hidden rounded-2xl" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
                                        <img
                                            src={step.image}
                                            alt={step.title}
                                            className="h-auto w-full object-cover"
                                            style={{ maxHeight: '480px' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                );
            })}

            {/* ═══ Discover CMA Section ═══ */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    {/* Title */}
                    <h2 className="text-center" style={{ fontSize: '44px', fontWeight: 800, color: '#1A1816', lineHeight: '1.15', marginBottom: '20px' }}>
                        Discover Your Home's <span style={{ borderBottom: '3px solid #1A1816' }}>True Market Value</span>
                    </h2>

                    <div className="grid items-center gap-16 lg:grid-cols-2" style={{ marginTop: '40px' }}>
                        {/* Left: Content */}
                        <div>
                            <p style={{ fontSize: '16px', lineHeight: '26px', color: '#6b7280', marginBottom: '24px' }}>
                                Get an accurate estimate by expert agent using latest market data and Comparable sales.
                            </p>

                            {/* See sample CMA report link */}
                            <a href="/cma" className="mb-6 inline-flex items-center gap-2 uppercase tracking-wider transition-opacity hover:opacity-80" style={{ fontSize: '12px', fontWeight: 700, color: '#1A1816', letterSpacing: '1px' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" />
                                </svg>
                                See Sample CMA Report
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                            </a>

                            {/* CMA Input */}
                            <div className="mt-4 flex items-center overflow-hidden rounded-full border border-gray-300 bg-white" style={{ maxWidth: '520px', height: '56px' }}>
                                <div className="flex items-center justify-center" style={{ width: '52px', flexShrink: 0 }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                        <polyline points="9 22 9 12 15 12 15 22" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="Enter property address" className="h-full flex-1 border-0 bg-transparent pr-2 focus:outline-none focus:ring-0" style={{ fontSize: '14px', color: '#1A1816' }} />
                                <button className="mr-1 flex items-center justify-center gap-2 rounded-full text-white uppercase tracking-wider transition-colors hover:bg-gray-800" style={{ height: '46px', paddingLeft: '24px', paddingRight: '24px', backgroundColor: '#1A1816', fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px', flexShrink: 0 }}>
                                    Get Agent CMA Report
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2">
                                {[
                                    { icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', text: 'Licensed REALTOR\u00AE' },
                                    { icon: 'M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6', text: '100% Free Market Analysis' },
                                    { icon: 'M13 10V3L4 14h7v7l9-11h-7z', text: 'No sign-up required' },
                                ].map((badge) => (
                                    <div key={badge.text} className="flex items-center gap-1.5">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={badge.icon} /></svg>
                                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>{badge.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Discover Image */}
                        <div className="flex justify-center">
                            <div className="overflow-hidden rounded-2xl" style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.08)' }}>
                                <img
                                    src="/images/discover-img.png"
                                    alt="Discover your home's true market value"
                                    className="h-auto w-full object-cover"
                                    style={{ maxHeight: '420px' }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
