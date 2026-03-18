import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

interface FeaturedListing {
    mlsNumber: string;
    listPrice: string;
    images?: string[];
    address: { streetNumber: string; streetName: string; streetSuffix?: string; city: string; state: string };
    details: { numBedrooms?: number; numBathrooms?: number; sqft?: string; lotSize?: string };
}

function formatPrice(price: string | number): string {
    const n = typeof price === 'string' ? parseInt(price, 10) : price;
    if (n >= 1000000) return `$${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
    return `$${n.toLocaleString()}`;
}

// ─── Glassy Card Component ─────────────────────────────
function GlassCard({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    return (
        <div
            className={`rounded-2xl ${className}`}
            style={{
                border: '1px solid rgba(156, 163, 175, 0.25)',
                background: 'rgba(255, 255, 255, 0.06)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
                ...style,
            }}
        >
            {children}
        </div>
    );
}

function GlassCardLight({ children, className = '', hover = true, style }: { children: React.ReactNode; className?: string; hover?: boolean; style?: React.CSSProperties }) {
    return (
        <div
            className={`rounded-2xl border border-gray-200/60 transition-all ${hover ? 'hover:border-gray-300 hover:shadow-xl hover:-translate-y-1' : ''} ${className}`}
            style={{
                background: 'rgba(255, 255, 255, 0.65)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
                ...style,
            }}
        >
            {children}
        </div>
    );
}

// ─── Hero Section ───────────────────────────────────────
const heroTabs = ['Buy', 'Rent', 'Sell', 'CMA'];

function HeroSection({ featuredListings = [] }: { featuredListings?: FeaturedListing[] }) {
    const [activeTab, setActiveTab] = useState('Buy');
    const [currentSlide, setCurrentSlide] = useState(0);
    const count = featuredListings.length;

    const nextSlide = useCallback(() => {
        if (count > 0) setCurrentSlide((prev) => (prev + 1) % count);
    }, [count]);

    // Auto-slide every 5 seconds
    useEffect(() => {
        if (count <= 1) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [count, nextSlide]);
    return (
        <section className="relative w-full overflow-hidden">
            {/* Background Video / Image */}
            <img
                src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="British Columbia real estate"
                className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Gradient overlays */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(10, 15, 30, 0.75) 0%, rgba(10, 15, 30, 0.45) 50%, rgba(10, 15, 30, 0.65) 100%)' }} />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0" style={{ height: '200px', background: 'linear-gradient(to bottom, transparent 0%, rgba(249,250,251,0.4) 50%, rgb(249,250,251) 100%)' }} />

            {/* Floating glass decorations */}
            <div className="absolute top-20 right-20 h-64 w-64 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.15), transparent)', filter: 'blur(40px)' }} />
            <div className="absolute bottom-40 left-10 h-48 w-48 rounded-full opacity-15" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.1), transparent)', filter: 'blur(30px)' }} />

            <div className="relative flex flex-col" style={{ minHeight: '780px' }}>
                <div className="mx-auto flex flex-1 items-center px-4" style={{ maxWidth: '1296px', width: '100%' }}>
                    <div className="flex w-full items-center justify-between gap-12">
                        {/* Left: Content */}
                        <div style={{ maxWidth: '580px' }}>
                            <GlassCard className="mb-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5" style={{ borderRadius: '9999px' }}>
                                <div className="h-2 w-2 rounded-full bg-emerald-400" style={{ boxShadow: '0 0 8px rgba(52, 211, 153, 0.6)' }} />
                                <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '1.5px', color: 'rgba(255,255,255,0.9)' }}>
                                    SERVING BRITISH COLUMBIA
                                </span>
                            </GlassCard>

                            <h1 className="text-white" style={{ fontWeight: 800, fontSize: '54px', lineHeight: '64px', letterSpacing: '-0.5px' }}>
                                Re-Imagine Your
                                <br />
                                <span style={{ background: 'linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                    Property Selling
                                </span>
                                <br />
                                Experience
                            </h1>

                            <p className="mt-6" style={{ fontSize: '17px', lineHeight: '28px', fontWeight: 400, color: 'rgba(255,255,255,0.75)', maxWidth: '480px' }}>
                                We use <strong style={{ color: 'rgba(255,255,255,0.95)' }}>Live Virtual Tours</strong> to highlight property features and qualify buyers in <strong style={{ color: 'rgba(255,255,255,0.95)' }}>real-time</strong>, protecting your schedule and privacy.
                            </p>

                            {/* Glassy search bar */}
                            <GlassCard className="mt-8" style={{ padding: '6px' }}>
                                <div className="flex items-center gap-1 px-2 pb-2 pt-1">
                                    {heroTabs.map((tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className="relative rounded-lg px-4 py-1.5 text-sm font-medium transition-all"
                                            style={{
                                                color: activeTab === tab ? '#fff' : 'rgba(255,255,255,0.6)',
                                                backgroundColor: activeTab === tab ? 'rgba(255,255,255,0.15)' : 'transparent',
                                            }}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                                <div className="flex items-center rounded-xl bg-white shadow-lg" style={{ height: '52px' }}>
                                    <input
                                        type="text"
                                        placeholder="Address, City or Neighborhood in BC"
                                        className="h-full flex-1 rounded-l-xl border-0 bg-transparent pl-5 pr-2 focus:ring-0"
                                        style={{ fontSize: '15px', fontWeight: 400, color: '#1A1816' }}
                                    />
                                    <Link
                                        href="/map-search"
                                        className="flex items-center justify-center gap-2 rounded-r-xl bg-[#1A1816] text-white transition-colors hover:bg-[#2a2826]"
                                        style={{ width: '130px', height: '52px', fontSize: '14px', fontWeight: 600 }}
                                    >
                                        Search
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                                    </Link>
                                </div>
                            </GlassCard>

                            {/* Stats row */}
                            <div className="mt-8 flex gap-8">
                                {[
                                    { value: '2,800+', label: 'Active Listings' },
                                    { value: '1%', label: 'Listing Fee' },
                                    { value: 'BC', label: 'Province Wide' },
                                ].map((stat) => (
                                    <div key={stat.label}>
                                        <div style={{ fontSize: '24px', fontWeight: 800, color: '#fff' }}>{stat.value}</div>
                                        <div style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px' }}>{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Listing slider */}
                        {count > 0 && (
                            <div className="hidden lg:block" style={{ width: '380px' }}>
                                <div className="relative overflow-hidden">
                                    {/* Slides */}
                                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
                                        {featuredListings.map((fl) => {
                                            const img = fl.images?.[0] || '';
                                            const addr = `${fl.address.streetNumber} ${fl.address.streetName} ${fl.address.streetSuffix || ''}, ${fl.address.city}, ${fl.address.state}`.trim();
                                            return (
                                                <div key={fl.mlsNumber} className="w-full shrink-0">
                                                    <Link href={`/property/${fl.mlsNumber}`}>
                                                        <GlassCard className="overflow-hidden p-4">
                                                            <div className="overflow-hidden rounded-xl" style={{ height: '220px' }}>
                                                                <img src={img} alt={addr} className="h-full w-full object-cover" />
                                                            </div>
                                                            <div className="mt-4 px-1">
                                                                <div className="flex items-center justify-between">
                                                                    <span style={{ fontSize: '22px', fontWeight: 800, color: '#fff' }}>{formatPrice(fl.listPrice)}</span>
                                                                    <GlassCard className="rounded-full px-3 py-1" style={{ borderRadius: '9999px' }}>
                                                                        <span style={{ fontSize: '11px', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>Featured</span>
                                                                    </GlassCard>
                                                                </div>
                                                                <div className="mt-2 flex items-center gap-3" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>
                                                                    {fl.details.numBedrooms != null && <><span><strong style={{ color: 'rgba(255,255,255,0.9)' }}>{fl.details.numBedrooms}</strong> bd</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span></>}
                                                                    {fl.details.numBathrooms != null && <><span><strong style={{ color: 'rgba(255,255,255,0.9)' }}>{fl.details.numBathrooms}</strong> ba</span><span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span></>}
                                                                    {fl.details.sqft && <span><strong style={{ color: 'rgba(255,255,255,0.9)' }}>{Number(fl.details.sqft).toLocaleString()}</strong> sqft</span>}
                                                                    {fl.details.lotSize && <><span style={{ color: 'rgba(255,255,255,0.3)' }}>|</span><span><strong style={{ color: 'rgba(255,255,255,0.9)' }}>{Number(fl.details.lotSize).toLocaleString()}</strong> lot</span></>}
                                                                </div>
                                                                <p className="mt-1.5 truncate" style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>{addr}</p>
                                                                <p className="mt-1" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.35)' }}>MLS&reg; {fl.mlsNumber}</p>
                                                            </div>
                                                        </GlassCard>
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Dots */}
                                    {count > 1 && (
                                        <div className="mt-4 flex justify-center gap-2">
                                            {featuredListings.map((_, idx) => (
                                                <button
                                                    key={idx}
                                                    onClick={() => setCurrentSlide(idx)}
                                                    className="rounded-full transition-all"
                                                    style={{
                                                        width: currentSlide === idx ? '24px' : '8px',
                                                        height: '8px',
                                                        backgroundColor: currentSlide === idx ? '#fff' : 'rgba(255,255,255,0.35)',
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Process Section ────────────────────────────────────
const processSteps = [
    { step: '01', title: 'DIGITAL TWIN CREATION', description: 'We deploy specialists to scan your property, creating a high-fidelity 3D Tour that acts as an always-open house.' },
    { step: '02', title: 'STRATEGIC MARKETING', description: 'Your listing launches on Realtor.ca, REW.ca, and social channels across BC with premium photography.' },
    { step: '03', title: 'VIRTUAL SHOWINGS', description: 'Buyers tour your home virtually first, filtering out unserious inquiries and saving your time.' },
    { step: '04', title: 'QUALIFIED VISITS', description: 'By the time a buyer visits in person, they are vetted, interested, and ready to make a move.' },
    { step: '05', title: 'NEGOTIATION & CLOSE', description: 'Our experts handle all documentation and legalities, ensuring a smooth closing process.' },
];

function ProcessSection() {
    return (
        <section style={{ backgroundColor: '#f9fafb' }}>
            <div className="mx-auto px-4 py-20" style={{ maxWidth: '1280px' }}>
                <div className="mb-4 text-center">
                    <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', color: 'rgb(100,100,100)' }}>HOW IT WORKS</span>
                </div>
                <h2 className="mb-14 text-center" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: '#1A1816' }}>
                    Simple Process to Get it Sold
                </h2>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                    {processSteps.map((item, index) => (
                        <GlassCardLight key={item.step} className="relative flex flex-col items-center p-6 text-center">
                            <div className="mb-4 flex items-center justify-center rounded-full" style={{ width: '48px', height: '48px', backgroundColor: '#1A1816' }}>
                                <span className="text-white" style={{ fontWeight: 700, fontSize: '14px' }}>{item.step}</span>
                            </div>
                            <h3 className="mb-2" style={{ fontWeight: 700, fontSize: '13px', color: '#1A1816', letterSpacing: '0.5px' }}>{item.title}</h3>
                            <p style={{ fontSize: '13px', lineHeight: '20px', color: 'rgb(100,100,100)' }}>{item.description}</p>
                        </GlassCardLight>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── Why Sellers Choose Section ─────────────────────────
function WhySellersChooseSection() {
    const [listingPrice, setListingPrice] = useState(700000);
    const traditionalFee = Math.round(listingPrice * 0.025);
    const ecoFee = Math.round(listingPrice * 0.01);
    const savings = traditionalFee - ecoFee;

    const features = [
        { title: 'Fair & Transparent Pricing', description: 'Traditional fees are outdated. We offer a 1% listing fee without cutting corners.', icon: 'M12 6v12M9 9.5C9 8.12 10.12 7 11.5 7h1.38C14.04 7 15 7.96 15 9.12c0 .81-.46 1.55-1.19 1.91L12 12v1.5M12 17h.01' },
        { title: 'Premium Property Marketing', description: "We don't just list; we launch. High-end photography and strategic positioning.", icon: 'M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z' },
        { title: 'Immersive Virtual Experience', description: "Live virtual showings inside your home's 3D tour, generating serious interest.", icon: 'M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z' },
        { title: 'Data-Backed Negotiations', description: 'We use real-time market analytics to defend your asking price.', icon: 'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z' },
    ];

    return (
        <section className="relative overflow-hidden bg-white">
            {/* Subtle glass gradient background */}
            <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(245,245,244,1), transparent 70%), radial-gradient(ellipse at 70% 50%, rgba(245,245,244,0.8), transparent 70%)' }} />

            <div className="relative mx-auto px-4 py-20" style={{ maxWidth: '1280px' }}>
                <div className="mb-4 text-center">
                    <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', color: 'rgb(100,100,100)' }}>THE ECOLISTING ADVANTAGE</span>
                </div>
                <h2 className="mb-3 text-center" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: '#1A1816' }}>
                    Why Sellers Choose EcoListing?
                </h2>
                <p className="mx-auto mb-14 text-center" style={{ fontSize: '16px', lineHeight: '24px', color: 'rgb(100,100,100)', maxWidth: '520px' }}>
                    Save thousands in commission without sacrificing the quality of service you deserve.
                </p>

                <div className="flex items-stretch gap-10">
                    {/* Feature cards */}
                    <div className="grid flex-1 grid-cols-2 gap-5">
                        {features.map((f) => (
                            <GlassCardLight key={f.title} className="group flex flex-col p-7">
                                <div className="mb-5 flex items-center justify-center rounded-2xl border border-gray-200/60" style={{ width: '56px', height: '56px', background: 'rgba(245,245,244,0.8)', backdropFilter: 'blur(8px)' }}>
                                    <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}>
                                        <path d={f.icon} stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <h3 className="mb-2" style={{ fontWeight: 700, fontSize: '18px', color: '#1A1816' }}>{f.title}</h3>
                                <p style={{ fontSize: '15px', lineHeight: '23px', color: 'rgb(120,120,120)' }}>{f.description}</p>
                            </GlassCardLight>
                        ))}
                    </div>

                    {/* Calculator */}
                    <div className="shrink-0" style={{ width: '420px' }}>
                        <GlassCardLight className="flex h-full flex-col overflow-hidden" hover={false}>
                            <div className="flex flex-1 flex-col justify-between p-8">
                                <div className="mb-2 flex items-center justify-between">
                                    <span style={{ fontWeight: 600, fontSize: '13px', color: 'rgb(100,100,100)', letterSpacing: '1px', textTransform: 'uppercase' }}>Listing Price</span>
                                    <span style={{ fontWeight: 700, fontSize: '34px', color: '#1A1816' }}>${listingPrice.toLocaleString()}</span>
                                </div>
                                <input type="range" min={200000} max={2000000} step={10000} value={listingPrice} onChange={(e) => setListingPrice(Number(e.target.value))} className="mt-4 mb-2 w-full accent-[#1A1816]" style={{ height: '6px' }} />
                                <div className="mb-8 flex justify-between" style={{ fontSize: '13px', color: 'rgb(150,150,150)' }}><span>$200k</span><span>$2M+</span></div>

                                <div className="rounded-xl p-5" style={{ background: 'rgba(249,250,251,0.8)', backdropFilter: 'blur(8px)' }}>
                                    <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgba(229,229,229,0.6)' }}>
                                        <span style={{ fontSize: '15px', color: 'rgb(120,120,120)' }}>Traditional Fee (2.5%)</span>
                                        <span style={{ fontWeight: 700, fontSize: '16px', color: '#dc2626', textDecoration: 'line-through' }}>${traditionalFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex items-center gap-2">
                                            <svg viewBox="0 0 20 20" fill="#1A1816" style={{ width: '18px', height: '18px' }}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                            <span style={{ fontWeight: 600, fontSize: '15px', color: '#1A1816' }}>EcoListing Fee (1%)</span>
                                        </div>
                                        <span style={{ fontWeight: 700, fontSize: '16px', color: '#1A1816' }}>${ecoFee.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="mt-5 overflow-hidden rounded-xl" style={{ border: '2px solid #1A1816' }}>
                                    <div className="py-2" style={{ backgroundColor: '#1A1816' }}>
                                        <p className="text-center" style={{ fontWeight: 600, fontSize: '11px', color: 'rgba(255,255,255,0.7)', letterSpacing: '2px', textTransform: 'uppercase' }}>You Keep An Extra</p>
                                    </div>
                                    <div className="py-5 text-center" style={{ background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)' }}>
                                        <p style={{ fontWeight: 800, fontSize: '44px', lineHeight: '52px', color: '#1A1816' }}>${savings.toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center pb-7">
                                <a href="#" className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-800" style={{ width: '220px', height: '48px', backgroundColor: '#1A1816', fontWeight: 600, fontSize: '14px', color: '#fff', letterSpacing: '0.5px' }}>
                                    SEE FULL BREAKDOWN
                                </a>
                            </div>
                        </GlassCardLight>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Marketing Tools Section ────────────────────────────
const marketingFeatures = [
    { title: 'The Digital Twin', description: 'A 1:1 scale holographic model providing total transparency and building buyer confidence.', icon: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9', previewIcon: 'M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9', previewTitle: 'The Digital Twin', previewSub: 'Interactive 3D Viewing' },
    { title: 'Premium Virtual Staging', description: 'Digitally furnish empty spaces to showcase lifestyle potential.', icon: 'M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25', previewIcon: 'M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21zM10.5 8.25a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0z', previewTitle: 'Virtual Staging', previewSub: 'Digitally Furnished Spaces' },
    { title: 'Guided Narrative Tours', description: 'Agents use the virtual tour as a live presentation tool.', icon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6', previewIcon: 'M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6', previewTitle: 'Guided Tours', previewSub: 'Live Presentation Tool' },
    { title: 'Social & Paid Media', description: 'We leverage data to advertise your property everywhere for maximum exposure.', icon: 'M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z', previewIcon: 'M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811V8.69zM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061a1.125 1.125 0 01-1.683-.977V8.69z', previewTitle: 'Social & Paid Media', previewSub: 'Maximum Exposure Campaign' },
];

function MarketingToolsSection() {
    const [activeIdx, setActiveIdx] = useState(0);
    const active = marketingFeatures[activeIdx];

    return (
        <section style={{ backgroundColor: '#f9fafb' }}>
            <div className="mx-auto px-4 py-20" style={{ maxWidth: '1280px' }}>
                <div className="mb-4 text-center">
                    <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', color: 'rgb(100,100,100)' }}>MARKETING SUITE</span>
                </div>
                <h2 className="mb-3 text-center" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: '#1A1816' }}>
                    Industry-Leading Marketing Tools
                    <br />to Reach More Buyers
                </h2>
                <p className="mx-auto mb-16 text-center" style={{ fontSize: '16px', lineHeight: '24px', color: 'rgb(100,100,100)', maxWidth: '480px' }}>
                    Experience the future of property presentation.
                </p>

                <div className="flex items-stretch gap-10">
                    <div className="flex flex-1 flex-col gap-5">
                        {marketingFeatures.map((f, idx) => (
                            <div key={f.title} onMouseEnter={() => setActiveIdx(idx)}>
                                <GlassCardLight className={`group flex cursor-pointer items-start gap-5 p-6 ${activeIdx === idx ? '!border-[#1A1816]/30 !shadow-lg' : ''}`}>
                                    <div className="flex shrink-0 items-center justify-center rounded-2xl border border-gray-200/60 transition-transform group-hover:scale-105" style={{ width: '56px', height: '56px', background: activeIdx === idx ? 'rgba(26,24,22,0.05)' : 'rgba(245,245,244,0.8)', backdropFilter: 'blur(8px)' }}>
                                        <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}><path d={f.icon} stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </div>
                                    <div>
                                        <h3 className="mb-1" style={{ fontWeight: 700, fontSize: '18px', color: '#1A1816' }}>{f.title}</h3>
                                        <p style={{ fontSize: '15px', lineHeight: '23px', color: 'rgb(120,120,120)' }}>{f.description}</p>
                                    </div>
                                </GlassCardLight>
                            </div>
                        ))}
                    </div>

                    <div className="shrink-0" style={{ width: '480px' }}>
                        <GlassCardLight className="flex h-full flex-col overflow-hidden" hover={false}>
                            <div className="relative flex-1" style={{ minHeight: '320px', background: 'linear-gradient(135deg, rgba(245,245,244,0.9), rgba(255,255,255,0.6))' }}>
                                <div className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-300">
                                    <svg viewBox="0 0 24 24" fill="none" style={{ width: '64px', height: '64px', marginBottom: '16px' }}>
                                        <path d={active.previewIcon} stroke="#1A1816" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                                    </svg>
                                    <p style={{ fontWeight: 700, fontSize: '18px', color: '#1A1816' }}>{active.previewTitle}</p>
                                    <p style={{ fontSize: '14px', color: 'rgb(120,120,120)', marginTop: '4px' }}>{active.previewSub}</p>
                                </div>
                                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#1A1816 1px, transparent 1px), linear-gradient(90deg, #1A1816 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200/60 px-6 py-4">
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '15px', color: '#1A1816' }}>{active.previewTitle}</p>
                                    <p style={{ fontSize: '13px', color: 'rgb(120,120,120)' }}>Interactive Preview</p>
                                </div>
                                <a href="#" className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-800" style={{ width: '140px', height: '42px', backgroundColor: '#1A1816', fontWeight: 600, fontSize: '13px', color: '#fff' }}>
                                    Explore Tour
                                </a>
                            </div>
                        </GlassCardLight>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Property Showcase Section ──────────────────────────
function PropertyShowcaseSection() {
    const showcaseFeatures = [
        { title: 'Highlight features', description: 'Every single feature of the property is visually expressed to buyers.', icon: 'M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z' },
        { title: 'Immersive Buyer Tour', description: 'Buyers explore every corner of the property remotely.', icon: 'M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' },
        { title: 'Instant enquiries', description: 'It makes our job easier.', icon: 'M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z' },
    ];

    return (
        <section className="bg-white">
            <div className="mx-auto px-4 py-20" style={{ maxWidth: '1280px' }}>
                <div className="flex items-start gap-16">
                    <div className="shrink-0" style={{ maxWidth: '380px' }}>
                        <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', color: 'rgb(100,100,100)' }}>VIRTUAL EXPERIENCE</span>
                        <h2 className="mt-3" style={{ fontWeight: 700, fontSize: '42px', lineHeight: '50px', color: '#1A1816' }}>
                            The Property<br />Showcase
                        </h2>
                        <div className="mt-10 flex flex-col gap-6">
                            {showcaseFeatures.map((f) => (
                                <div key={f.title} className="flex items-start gap-4">
                                    <GlassCardLight className="flex shrink-0 items-center justify-center" style={{ width: '48px', height: '48px' }} hover={false}>
                                        <svg viewBox="0 0 24 24" fill="none" style={{ width: '24px', height: '24px' }}><path d={f.icon} stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                    </GlassCardLight>
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: '16px', color: '#1A1816' }}>{f.title}</h3>
                                        <p style={{ fontSize: '14px', lineHeight: '20px', color: 'rgb(120,120,120)' }}>{f.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="group relative overflow-hidden rounded-2xl shadow-lg" style={{ aspectRatio: '16/9', border: '1px solid rgba(0,0,0,0.06)' }}>
                            <img src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Property virtual tour" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-black/15 transition-colors group-hover:bg-black/25" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-center justify-center rounded-full shadow-lg transition-transform group-hover:scale-110" style={{ width: '80px', height: '80px', background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)' }}>
                                    <svg viewBox="0 0 24 24" fill="#1A1816" style={{ width: '32px', height: '32px', marginLeft: '3px' }}>
                                        <path d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Testimonials Section ───────────────────────────────
const testimonials = [
    { quote: 'EcoListing transformed how we sold our home. The digital twin technology showcased our property in a way photos simply couldn\'t.', initials: 'SJ', name: 'Sarah Jenkins', role: 'Home Seller \u2022 Vancouver, BC' },
    { quote: 'The transparency of the platform gave me total peace of mind. I could track every viewing and offer in real-time.', initials: 'MC', name: 'Michael Chen', role: 'Property Investor \u2022 Richmond, BC' },
    { quote: 'From the accurate valuation to the final closing, everything was seamless. The tools provided are truly industry-leading.', initials: 'ER', name: 'Elena Rodriguez', role: 'Home Seller \u2022 Surrey, BC' },
];

function TestimonialsSection() {
    return (
        <section style={{ backgroundColor: '#f9fafb' }}>
            <div className="mx-auto px-4 py-20" style={{ maxWidth: '1280px' }}>
                <div className="mb-4 text-center">
                    <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', color: 'rgb(100,100,100)' }}>TESTIMONIALS</span>
                </div>
                <h2 className="mb-3 text-center" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: '#1A1816' }}>
                    What clients have experienced?
                </h2>
                <p className="mx-auto mb-14 text-center" style={{ fontSize: '16px', lineHeight: '24px', color: 'rgb(100,100,100)', maxWidth: '580px' }}>
                    Hear from BC homeowners who have successfully sold with our platform.
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <GlassCardLight key={t.initials} className="flex flex-col justify-between p-8">
                            <div>
                                <svg viewBox="0 0 24 24" fill="none" style={{ width: '32px', height: '32px', marginBottom: '16px' }}>
                                    <path d="M7.5 8.25h-3a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 011.5 1.5v.75a3 3 0 01-3 3H3.75M16.5 8.25h-3a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 011.5 1.5v.75a3 3 0 01-3 3h-.75" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                                </svg>
                                <p style={{ fontSize: '15px', lineHeight: '24px', color: 'rgb(60,60,60)' }}>"{t.quote}"</p>
                            </div>
                            <div className="mt-8 flex items-center gap-4">
                                <div className="flex shrink-0 items-center justify-center rounded-full" style={{ width: '48px', height: '48px', backgroundColor: '#1A1816' }}>
                                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#fff' }}>{t.initials}</span>
                                </div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '15px', color: '#1A1816' }}>{t.name}</p>
                                    <p style={{ fontSize: '13px', color: 'rgb(120,120,120)' }}>{t.role}</p>
                                </div>
                            </div>
                        </GlassCardLight>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ─── CMA Section ────────────────────────────────────────
function CmaSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto px-4 py-20" style={{ maxWidth: '1280px' }}>
                <div className="flex items-center gap-16">
                    <div className="flex-1">
                        <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', color: 'rgb(100,100,100)' }}>FREE CMA REPORT</span>
                        <h2 className="mt-3" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: '#1A1816' }}>
                            Discover Your Home's<br />True Market Value
                        </h2>
                        <p className="mt-4" style={{ fontSize: '16px', lineHeight: '24px', color: 'rgb(120,120,120)', maxWidth: '460px' }}>
                            Get an accurate estimate by expert agent using latest market data and comparable sales across British Columbia.
                        </p>
                        <a href="#" className="mt-5 inline-block underline" style={{ fontWeight: 600, fontSize: '14px', color: '#1A1816' }}>See sample CMA report</a>

                        <GlassCardLight className="mt-8 flex items-center overflow-hidden" style={{ maxWidth: '460px', height: '52px' }} hover={false}>
                            <input type="text" placeholder="Enter property address in BC" className="h-full flex-1 border-0 bg-transparent pl-5 pr-2 focus:ring-0" style={{ fontSize: '15px', color: '#1A1816' }} />
                            <button className="mr-1 flex items-center justify-center gap-2 rounded-full text-white transition-colors hover:bg-gray-800" style={{ width: '180px', height: '44px', backgroundColor: '#1A1816', fontSize: '14px', fontWeight: 600 }}>
                                Get Agent CMA Report
                            </button>
                        </GlassCardLight>

                        <div className="mt-6 flex items-center gap-6">
                            {['Licensed REALTOR\u00AE', '100% Free Market Analysis', 'No sign-up required'].map((text) => (
                                <div key={text} className="flex items-center gap-2">
                                    <svg viewBox="0 0 20 20" fill="#1A1816" style={{ width: '16px', height: '16px' }}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" /></svg>
                                    <span style={{ fontWeight: 500, fontSize: '13px', color: 'rgb(100,100,100)' }}>{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="shrink-0" style={{ maxWidth: '480px' }}>
                        <img src="/images/true-market.png" alt="CMA Report preview" className="rounded-2xl shadow-lg" style={{ width: '100%', border: '1px solid rgba(0,0,0,0.06)' }} />
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Main Page ──────────────────────────────────────────
export default function WelcomeV2({ featuredListings = [] }: { featuredListings?: FeaturedListing[] }) {
    return (
        <>
            <Head title="British Columbia Real Estate - EcoListing.ca" />
            <div className="min-h-screen bg-gray-50">
                <Header />
                <HeroSection featuredListings={featuredListings} />
                <ProcessSection />
                <WhySellersChooseSection />
                <MarketingToolsSection />
                <PropertyShowcaseSection />
                <TestimonialsSection />
                <CmaSection />
                <Footer />
            </div>
        </>
    );
}
