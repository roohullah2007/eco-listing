import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function ValueEstimate() {
    const [heroAddress, setHeroAddress] = useState('');
    const [ctaAddress, setCtaAddress] = useState('');

    return (
        <>
            <Head title="Value Estimate - What's Your Home Worth?" />
            <Header />

            {/* Section 1 - Hero */}
            <section style={{ backgroundColor: '#1A1816', paddingTop: '120px', paddingBottom: '100px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '800px' }}>
                    <h1
                        style={{
                            fontSize: '52px',
                            fontWeight: 800,
                            color: '#ffffff',
                            lineHeight: '1.1',
                            marginBottom: '20px',
                        }}
                    >
                        What's Your Home Worth?
                    </h1>
                    <p
                        style={{
                            fontSize: '18px',
                            lineHeight: '28px',
                            color: '#94a3b8',
                            marginBottom: '40px',
                            maxWidth: '560px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        Get a free, instant estimate based on recent sales and market data in your area.
                    </p>

                    {/* Address input bar */}
                    <div
                        className="mx-auto flex items-center gap-3 rounded-full border border-gray-700 bg-white"
                        style={{ maxWidth: '600px', padding: '6px 6px 6px 20px' }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#9ca3af"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0 }}
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <input
                            type="text"
                            value={heroAddress}
                            onChange={(e) => setHeroAddress(e.target.value)}
                            placeholder="Enter your home address..."
                            className="flex-1 border-none outline-none"
                            style={{ fontSize: '15px', color: '#1A1816', background: 'transparent' }}
                        />
                        <button
                            type="button"
                            className="rounded-full text-white transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: '#1A1816',
                                height: '44px',
                                paddingLeft: '28px',
                                paddingRight: '28px',
                                fontSize: '15px',
                                fontWeight: 600,
                                flexShrink: 0,
                            }}
                        >
                            Get Estimate
                        </button>
                    </div>
                </div>
            </section>

            {/* Section 2 - How It Works */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <p
                            className="uppercase tracking-widest"
                            style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#6b7280',
                                letterSpacing: '2px',
                                marginBottom: '16px',
                            }}
                        >
                            How It Works
                        </p>
                        <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.2' }}>
                            Three simple steps to your estimate
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Step 1 */}
                        <div
                            className="rounded-2xl border border-gray-200 bg-white p-8 text-center"
                            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                        >
                            <div
                                className="mx-auto mb-5 flex items-center justify-center rounded-2xl border border-gray-200"
                                style={{ width: '64px', height: '64px', backgroundColor: '#f5f5f4' }}
                            >
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#1A1816"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#9ca3af', marginBottom: '8px' }}>
                                01
                            </p>
                            <h3
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    color: '#1A1816',
                                    marginBottom: '12px',
                                }}
                            >
                                Enter Your Address
                            </h3>
                            <p style={{ fontSize: '15px', lineHeight: '24px', color: '#6b7280' }}>
                                Start by entering your property address to pull local market data.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div
                            className="rounded-2xl border border-gray-200 bg-white p-8 text-center"
                            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                        >
                            <div
                                className="mx-auto mb-5 flex items-center justify-center rounded-2xl border border-gray-200"
                                style={{ width: '64px', height: '64px', backgroundColor: '#f5f5f4' }}
                            >
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#1A1816"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <line x1="18" y1="20" x2="18" y2="10" />
                                    <line x1="12" y1="20" x2="12" y2="4" />
                                    <line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                            </div>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#9ca3af', marginBottom: '8px' }}>
                                02
                            </p>
                            <h3
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    color: '#1A1816',
                                    marginBottom: '12px',
                                }}
                            >
                                We Analyze the Market
                            </h3>
                            <p style={{ fontSize: '15px', lineHeight: '24px', color: '#6b7280' }}>
                                Our system compares recent sales, active listings, and market trends in your area.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div
                            className="rounded-2xl border border-gray-200 bg-white p-8 text-center"
                            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                        >
                            <div
                                className="mx-auto mb-5 flex items-center justify-center rounded-2xl border border-gray-200"
                                style={{ width: '64px', height: '64px', backgroundColor: '#f5f5f4' }}
                            >
                                <svg
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#1A1816"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            </div>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#9ca3af', marginBottom: '8px' }}>
                                03
                            </p>
                            <h3
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    color: '#1A1816',
                                    marginBottom: '12px',
                                }}
                            >
                                Get Your Report
                            </h3>
                            <p style={{ fontSize: '15px', lineHeight: '24px', color: '#6b7280' }}>
                                Receive a detailed valuation report with comparable sales and pricing insights.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 3 - Why Get an Estimate */}
            <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto flex items-center gap-16 px-4" style={{ maxWidth: '1280px' }}>
                    {/* Left side - Content */}
                    <div style={{ width: '55%' }}>
                        <p
                            className="uppercase tracking-widest"
                            style={{
                                fontSize: '12px',
                                fontWeight: 600,
                                color: '#6b7280',
                                letterSpacing: '2px',
                                marginBottom: '16px',
                            }}
                        >
                            Why Get an Estimate
                        </p>
                        <h2
                            style={{
                                fontSize: '36px',
                                fontWeight: 800,
                                color: '#1A1816',
                                lineHeight: '1.2',
                                marginBottom: '20px',
                            }}
                        >
                            Make Informed Decisions
                        </h2>
                        <p
                            style={{
                                fontSize: '17px',
                                lineHeight: '28px',
                                color: '#6b7280',
                                marginBottom: '32px',
                                maxWidth: '520px',
                            }}
                        >
                            Whether you're thinking about selling, refinancing, or simply curious about your home's
                            current value, an accurate estimate is the foundation of every smart real estate decision.
                            Our data-driven approach gives you the confidence to move forward.
                        </p>

                        <div className="flex flex-col gap-4">
                            {[
                                'Based on real MLS data',
                                'Updated with latest sales',
                                'Neighborhood-level accuracy',
                                'Professional agent review available',
                            ].map((item) => (
                                <div key={item} className="flex items-center gap-3">
                                    <div
                                        className="flex items-center justify-center rounded-full"
                                        style={{
                                            width: '24px',
                                            height: '24px',
                                            backgroundColor: '#f5f5f4',
                                            flexShrink: 0,
                                        }}
                                    >
                                        <svg
                                            width="14"
                                            height="14"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="#1A1816"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    </div>
                                    <span style={{ fontSize: '16px', fontWeight: 500, color: '#1A1816' }}>
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Image */}
                    <div style={{ width: '45%' }}>
                        <img
                            src="/images/discover-img.png"
                            alt="Home valuation insights"
                            className="rounded-2xl"
                            style={{
                                width: '100%',
                                height: '460px',
                                objectFit: 'cover',
                                boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                            }}
                        />
                    </div>
                </div>
            </section>

            {/* Section 4 - CTA with Address Bar */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '800px' }}>
                    <h2
                        style={{
                            fontSize: '36px',
                            fontWeight: 800,
                            color: '#1A1816',
                            lineHeight: '1.2',
                            marginBottom: '16px',
                        }}
                    >
                        Ready for a Professional Valuation?
                    </h2>
                    <p
                        style={{
                            fontSize: '17px',
                            lineHeight: '28px',
                            color: '#6b7280',
                            marginBottom: '36px',
                            maxWidth: '580px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        Go beyond the estimate. Get a full Comparative Market Analysis report prepared by a licensed
                        agent with deep local expertise.
                    </p>

                    {/* Address input bar */}
                    <div
                        className="mx-auto flex items-center gap-3 rounded-full border border-gray-200 bg-white"
                        style={{
                            maxWidth: '600px',
                            padding: '6px 6px 6px 20px',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                        }}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#9ca3af"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{ flexShrink: 0 }}
                        >
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                        <input
                            type="text"
                            value={ctaAddress}
                            onChange={(e) => setCtaAddress(e.target.value)}
                            placeholder="Enter your home address..."
                            className="flex-1 border-none outline-none"
                            style={{ fontSize: '15px', color: '#1A1816', background: 'transparent' }}
                        />
                        <button
                            type="button"
                            className="rounded-full text-white transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: '#1A1816',
                                height: '44px',
                                paddingLeft: '28px',
                                paddingRight: '28px',
                                fontSize: '15px',
                                fontWeight: 600,
                                flexShrink: 0,
                            }}
                        >
                            Get Estimate
                        </button>
                    </div>

                    {/* Trust badges */}
                    <div
                        className="mx-auto mt-10 flex items-center justify-center gap-10"
                        style={{ maxWidth: '600px' }}
                    >
                        {[
                            {
                                icon: (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1A1816"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                ),
                                label: 'Licensed REALTOR\u00AE',
                            },
                            {
                                icon: (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1A1816"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                ),
                                label: '100% Free',
                            },
                            {
                                icon: (
                                    <svg
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="#1A1816"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <line x1="20" y1="8" x2="20" y2="14" />
                                        <line x1="23" y1="11" x2="17" y2="11" />
                                    </svg>
                                ),
                                label: 'No sign-up required',
                            },
                        ].map((badge) => (
                            <div key={badge.label} className="flex items-center gap-2">
                                {badge.icon}
                                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>
                                    {badge.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 5 - Dark CTA Banner */}
            <section style={{ backgroundColor: '#1A1816', paddingTop: '64px', paddingBottom: '64px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '1280px' }}>
                    <h2
                        style={{
                            fontSize: '36px',
                            fontWeight: 800,
                            color: '#ffffff',
                            lineHeight: '1.2',
                            marginBottom: '16px',
                        }}
                    >
                        Still have questions?
                    </h2>
                    <p style={{ fontSize: '17px', color: '#94a3b8', marginBottom: '32px' }}>
                        Our team is ready to help you understand your home's value and next steps.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center rounded-xl transition-opacity hover:opacity-90"
                            style={{
                                backgroundColor: '#ffffff',
                                color: '#1A1816',
                                height: '48px',
                                paddingLeft: '32px',
                                paddingRight: '32px',
                                fontSize: '15px',
                                fontWeight: 600,
                            }}
                        >
                            Schedule A Call
                        </a>
                        <a
                            href="/listing-services"
                            className="inline-flex items-center justify-center rounded-xl border border-white text-white transition-opacity hover:opacity-80"
                            style={{
                                height: '48px',
                                paddingLeft: '32px',
                                paddingRight: '32px',
                                fontSize: '15px',
                                fontWeight: 600,
                            }}
                        >
                            View Our Services
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
