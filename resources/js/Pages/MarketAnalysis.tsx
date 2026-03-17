import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

interface Listing {
    mlsNumber: string;
    listPrice: string;
    listDate: string;
    type: string;
    status: string;
    address: {
        area: string;
        city: string;
        neighborhood: string;
        streetNumber: string;
        streetName: string;
        streetSuffix: string;
        unitNumber: string | null;
        zip: string;
        state: string;
    };
    details: {
        numBedrooms: number | null;
        numBathrooms: number | null;
        sqft: string;
        propertyType: string;
        style: string;
    };
    images: string[];
    daysOnMarket: number;
    soldPrice?: string;
    soldDate?: string;
}

interface Props {
    activeListings: Listing[];
    soldListings: Listing[];
    stats: {
        activeCount: number;
        soldCount: number;
        avgPrice: number;
        avgDom: number;
    };
    selectedCity: string;
}

function formatPrice(price: string | number): string {
    const num = typeof price === 'string' ? parseInt(price, 10) : price;
    if (isNaN(num)) return '$0';
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}k`;
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(num);
}

function formatPriceFull(price: string | number): string {
    const num = typeof price === 'string' ? parseInt(price, 10) : price;
    if (isNaN(num)) return '$0';
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(num);
}

function formatAddress(address: Listing['address']): string {
    const parts = [address?.streetNumber, address?.streetName, address?.streetSuffix].filter(Boolean);
    let street = parts.join(' ');
    if (address?.unitNumber) street = `#${address.unitNumber} - ${street}`;
    return street;
}

const bcCities = [
    'Vancouver', 'Surrey', 'Burnaby', 'Richmond', 'Langley',
    'Coquitlam', 'Delta', 'Chilliwack', 'Abbotsford', 'Kelowna',
    'Victoria', 'Nanaimo', 'Kamloops', 'Squamish', 'Whistler',
];

const fraserValley = ['Fraser Valley', 'Squamish', 'Sunshine Coast', 'Vancouver - West', 'Vancouver - East', 'Richmond'];
const metroVancouver = ['Metro Vancouver', 'Burnaby', 'Coquitlam', 'Delta', 'Langley', 'Surrey'];

/* ─── Login Required Overlay ─── */
function LoginOverlay() {
    return (
        <div className="absolute inset-0 z-10 flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(2px)' }}>
            <Link href="/login" className="flex items-center gap-2 rounded-xl px-6 py-3 text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#1A1816', fontSize: '13px', fontWeight: 700, letterSpacing: '0.5px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                LOGIN REQUIRED
            </Link>
        </div>
    );
}

/* ─── Fake SVG Chart Placeholders ─── */
function BarLineChart() {
    return (
        <svg viewBox="0 0 700 280" className="w-full" style={{ opacity: 0.35 }}>
            {/* Bars */}
            {[40, 55, 45, 50, 42, 48, 58, 52, 60, 55, 38, 56].map((h, i) => (
                <rect key={i} x={30 + i * 55} y={280 - h * 4} width="30" height={h * 4} rx="3" fill="#f5c77e" />
            ))}
            {/* Line */}
            <polyline points="45,140 100,125 155,135 210,120 265,130 320,118 375,115 430,122 485,108 540,112 595,140 650,115" fill="none" stroke="#6ba3d6" strokeWidth="2.5" />
            {/* Dots */}
            {[[45,140],[100,125],[155,135],[210,120],[265,130],[320,118],[375,115],[430,122],[485,108],[540,112],[595,140],[650,115]].map(([cx,cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill="#6ba3d6" />
            ))}
        </svg>
    );
}

function AreaChart({ color1 = '#fde5c5', color2 = '#e8f5e9', stroke1 = '#f5a623', stroke2 = '#66bb6a' }: { color1?: string; color2?: string; stroke1?: string; stroke2?: string }) {
    return (
        <svg viewBox="0 0 700 250" className="w-full" style={{ opacity: 0.35 }}>
            <defs>
                <linearGradient id={`ag1-${color1}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color1} stopOpacity="0.6" /><stop offset="100%" stopColor={color1} stopOpacity="0.05" /></linearGradient>
                <linearGradient id={`ag2-${color2}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color2} stopOpacity="0.6" /><stop offset="100%" stopColor={color2} stopOpacity="0.05" /></linearGradient>
            </defs>
            <path d={`M0,120 C60,110 120,100 180,95 C240,90 300,105 360,95 C420,85 480,100 540,90 C600,80 660,75 700,80 L700,250 L0,250Z`} fill={`url(#ag1-${color1})`} />
            <path d={`M0,120 C60,110 120,100 180,95 C240,90 300,105 360,95 C420,85 480,100 540,90 C600,80 660,75 700,80`} fill="none" stroke={stroke1} strokeWidth="2" />
            <path d={`M0,200 C60,195 120,198 180,192 C240,188 300,195 360,190 C420,185 480,192 540,188 C600,182 660,180 700,178 L700,250 L0,250Z`} fill={`url(#ag2-${color2})`} />
            <path d={`M0,200 C60,195 120,198 180,192 C240,188 300,195 360,190 C420,185 480,192 540,188 C600,182 660,180 700,178`} fill="none" stroke={stroke2} strokeWidth="2" />
        </svg>
    );
}

function BarChart() {
    const bars = [15, 30, 55, 80, 72, 60, 48, 20];
    return (
        <svg viewBox="0 0 700 250" className="w-full" style={{ opacity: 0.35 }}>
            {bars.map((h, i) => (
                <rect key={i} x={40 + i * 82} y={250 - h * 2.8} width="50" height={h * 2.8} rx="4" fill="#f5c77e" />
            ))}
        </svg>
    );
}

function LineChart() {
    return (
        <svg viewBox="0 0 700 250" className="w-full" style={{ opacity: 0.35 }}>
            <polyline points="30,160 90,155 150,162 210,150 270,158 330,148 390,145 450,152 510,140 570,148 630,135 690,130" fill="none" stroke="#6ba3d6" strokeWidth="2.5" />
            {[[30,160],[90,155],[150,162],[210,150],[270,158],[330,148],[390,145],[450,152],[510,140],[570,148],[630,135],[690,130]].map(([cx,cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill="#6ba3d6" />
            ))}
            <line x1="30" y1="170" x2="690" y2="170" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="6,4" style={{ opacity: 0.5 }} />
        </svg>
    );
}

function DonutChart() {
    return (
        <svg viewBox="0 0 200 200" className="mx-auto" style={{ width: '180px', height: '180px', opacity: 0.4 }}>
            {/* Donut segments */}
            <circle cx="100" cy="100" r="70" fill="none" stroke="#a8c8e8" strokeWidth="30" strokeDasharray="110 330" strokeDashoffset="0" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#f5a0c0" strokeWidth="30" strokeDasharray="100 340" strokeDashoffset="-110" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#f5c77e" strokeWidth="30" strokeDasharray="60 380" strokeDashoffset="-210" />
            <circle cx="100" cy="100" r="70" fill="none" stroke="#b8d8a8" strokeWidth="30" strokeDasharray="70 370" strokeDashoffset="-270" />
        </svg>
    );
}

/* ─── Chart Card Component ─── */
function ChartCard({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-white" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
            <div className="p-6 pb-2">
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#1A1816' }}>{title}</h3>
                {subtitle && <p className="mt-1" style={{ fontSize: '12px', color: '#9ca3af', lineHeight: '18px' }}>{subtitle}</p>}
            </div>
            <div className="relative px-4 pb-6" style={{ minHeight: '240px' }}>
                {children}
                <LoginOverlay />
            </div>
        </div>
    );
}

export default function MarketAnalysis({ activeListings, soldListings, stats, selectedCity }: Props) {
    const [city, setCity] = useState(selectedCity || 'Vancouver');

    const handleCityChange = (newCity: string) => {
        setCity(newCity);
        window.location.href = `/market-analysis?city=${encodeURIComponent(newCity)}`;
    };

    const absorptionRate = stats.activeCount > 0 ? stats.soldCount / stats.activeCount : 0;
    const marketType = absorptionRate > 0.2 ? "Seller's Market" : absorptionRate > 0.15 ? 'Balanced' : "Buyer's Market";
    const balancePercent = absorptionRate > 0.2 ? 85 : absorptionRate > 0.15 ? 50 : 20;
    const monthsOfInventory = stats.soldCount > 0 ? Math.round(stats.activeCount / stats.soldCount) : 0;

    return (
        <>
            <Head title={`${city} Market Analysis - EcoListing.ca`} />
            <Header />

            {/* ─── Sticky Filter Bar ─── */}
            <div className="sticky top-0 z-30 border-b border-gray-200 bg-white">
                <div className="mx-auto flex items-center justify-between px-4" style={{ maxWidth: '1280px', height: '56px' }}>
                    <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#1A1816' }}>Market Insights</h2>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5 rounded-full border border-gray-200 px-3" style={{ height: '36px' }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            <select
                                value={city}
                                onChange={(e) => handleCityChange(e.target.value)}
                                className="appearance-none border-0 bg-transparent pr-4 outline-none"
                                style={{ fontSize: '13px', fontWeight: 600, color: '#1A1816' }}
                            >
                                {bcCities.map((c) => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                        <select className="appearance-none rounded-full border border-gray-200 bg-white px-4 outline-none" style={{ height: '36px', fontSize: '13px', fontWeight: 600, color: '#3b82f6' }}>
                            <option>All Types</option>
                            <option>Detached</option>
                            <option>Condo</option>
                            <option>Townhouse</option>
                        </select>
                        <select className="appearance-none rounded-full border border-gray-200 bg-white px-4 outline-none" style={{ height: '36px', fontSize: '13px', fontWeight: 600, color: '#3b82f6' }}>
                            <option>Last Year</option>
                            <option>Last 6 Months</option>
                            <option>Last 3 Months</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* ─── Main Content ─── */}
            <div style={{ backgroundColor: '#f8f8f8' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px', paddingTop: '32px', paddingBottom: '48px' }}>
                    <div className="flex gap-8">

                        {/* ═══ LEFT COLUMN ═══ */}
                        <div className="min-w-0 flex-1">

                            {/* Hero Banner */}
                            <div className="relative overflow-hidden rounded-2xl" style={{ height: '280px', background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' }}>
                                {/* Map texture overlay */}
                                <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'400\' height=\'300\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M50,150 Q100,50 200,120 T350,100\' fill=\'none\' stroke=\'%23475569\' stroke-width=\'1\'/%3E%3Cpath d=\'M0,200 Q80,140 180,180 T380,160\' fill=\'none\' stroke=\'%23475569\' stroke-width=\'0.8\'/%3E%3Cpath d=\'M30,80 Q120,30 220,70 T400,50\' fill=\'none\' stroke=\'%23475569\' stroke-width=\'0.6\'/%3E%3Ccircle cx=\'150\' cy=\'130\' r=\'3\' fill=\'%23475569\'/%3E%3Ccircle cx=\'250\' cy=\'100\' r=\'2\' fill=\'%23475569\'/%3E%3Ccircle cx=\'100\' cy=\'170\' r=\'2.5\' fill=\'%23475569\'/%3E%3C/svg%3E")', backgroundSize: 'cover', opacity: 0.4 }} />
                                <div className="relative flex h-full flex-col items-center justify-center text-center">
                                    <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2' }}>
                                        {city} Housing Market Report
                                    </h1>
                                    <div className="mt-4 rounded-full border border-white/30 bg-white/10 px-5 py-1.5" style={{ fontSize: '13px', color: '#ffffff', backdropFilter: 'blur(8px)' }}>
                                        Updated {new Date().toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })}
                                    </div>
                                </div>
                            </div>

                            {/* Market Balance */}
                            <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                <div className="flex items-center justify-between mb-3">
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#1A1816' }}>Market Balance</span>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#3b82f6' }}>{marketType}</span>
                                </div>
                                <div className="relative h-3 overflow-hidden rounded-full" style={{ background: 'linear-gradient(90deg, #22c55e 0%, #a3e635 25%, #facc15 50%, #f97316 75%, #ef4444 100%)' }}>
                                    <div className="absolute top-0 h-full" style={{ left: `${balancePercent}%`, width: '3px', backgroundColor: '#1A1816', borderRadius: '2px', transform: 'translateX(-50%)' }} />
                                </div>
                                <div className="mt-2 flex items-center justify-between" style={{ fontSize: '11px', color: '#9ca3af' }}>
                                    <span>Buyer's Market</span>
                                    <span>Balanced</span>
                                    <span>Seller's Market</span>
                                </div>
                            </div>

                            {/* Stats Row */}
                            <div className="mt-6 grid grid-cols-4 gap-4">
                                <div className="rounded-2xl border border-gray-200 bg-white p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <div className="uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#9ca3af', marginBottom: '6px' }}>Active Listings</div>
                                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#1A1816', lineHeight: '1' }}>{stats.activeCount.toLocaleString()}</div>
                                </div>
                                <div className="rounded-2xl border border-gray-200 bg-white p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <div className="uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#9ca3af', marginBottom: '6px' }}>Sold Listings</div>
                                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#1A1816', lineHeight: '1' }}>{stats.soldCount.toLocaleString()}</div>
                                </div>
                                <div className="rounded-2xl border border-gray-200 bg-white p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <div className="uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#9ca3af', marginBottom: '6px' }}>Avg. Price</div>
                                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#1A1816', lineHeight: '1' }}>{formatPrice(stats.avgPrice)}</div>
                                </div>
                                <div className="rounded-2xl border border-gray-200 bg-white p-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                                    <div className="uppercase" style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '1px', color: '#9ca3af', marginBottom: '6px' }}>Avg DOM</div>
                                    <div className="flex items-baseline gap-1.5">
                                        <span style={{ fontSize: '28px', fontWeight: 800, color: '#1A1816', lineHeight: '1' }}>{stats.avgDom}</span>
                                        <span style={{ fontSize: '12px', color: '#9ca3af' }}>Days</span>
                                    </div>
                                </div>
                            </div>

                            {/* ─── Chart Cards ─── */}
                            <div className="mt-6">
                                <ChartCard title="Median Sold Price & Average Days On Market" subtitle="Property Days on Market does not reset when the property is delisted and quickly re-listed.">
                                    <BarLineChart />
                                    <div className="mt-2 flex items-center justify-center gap-6" style={{ fontSize: '12px', color: '#9ca3af' }}>
                                        <span className="flex items-center gap-1.5"><span className="inline-block rounded-full" style={{ width: '8px', height: '8px', backgroundColor: '#6ba3d6' }} />Median Price</span>
                                        <span className="flex items-center gap-1.5"><span className="inline-block rounded-full" style={{ width: '8px', height: '8px', backgroundColor: '#f5c77e' }} />Days on Market</span>
                                    </div>
                                </ChartCard>
                            </div>

                            <div className="mt-6">
                                <ChartCard title="Popularity Score & Sold Listings" subtitle="The Popularity Score is a measure of online activity.">
                                    <BarLineChart />
                                </ChartCard>
                            </div>

                            <div className="mt-6">
                                <ChartCard title="Sold, Active & New Listings">
                                    <AreaChart color1="#fde5c5" color2="#e8f5e9" stroke1="#f5a623" stroke2="#66bb6a" />
                                </ChartCard>
                            </div>

                            <div className="mt-6">
                                <ChartCard title="Sold Price Distribution (Last 6 Months)">
                                    <BarChart />
                                </ChartCard>
                            </div>

                            <div className="mt-6">
                                <ChartCard title="Market Temperature (Absorption Rate)" subtitle="Absorption rate indicates how fast homes are selling.">
                                    <LineChart />
                                </ChartCard>
                            </div>

                            <div className="mt-6">
                                <ChartCard title="Median Rental Price">
                                    <AreaChart color1="#dbeafe" color2="#dbeafe" stroke1="#6ba3d6" stroke2="#6ba3d6" />
                                </ChartCard>
                            </div>

                            <div className="mt-6">
                                <ChartCard title="Property Type Distribution">
                                    <div className="flex items-center justify-center" style={{ minHeight: '220px' }}>
                                        <DonutChart />
                                    </div>
                                </ChartCard>
                            </div>
                        </div>

                        {/* ═══ RIGHT SIDEBAR ═══ */}
                        <div className="shrink-0" style={{ width: '380px' }}>
                            <div className="sticky" style={{ top: '72px' }}>

                                {/* Months of Inventory — Dark Card */}
                                <div className="overflow-hidden rounded-2xl" style={{ backgroundColor: '#1A1816', padding: '28px' }}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#ffffff' }}>Months of Inventory</span>
                                    </div>
                                    <div style={{ fontSize: '64px', fontWeight: 800, color: '#ffffff', lineHeight: '1' }}>{monthsOfInventory}</div>
                                    <div className="mt-2" style={{ fontSize: '13px', color: '#94a3b8' }}>Months to sell all current listings.</div>
                                </div>

                                {/* Days on Market — White Card */}
                                <div className="mt-4 rounded-2xl border border-gray-200 bg-white" style={{ padding: '28px' }}>
                                    <div className="flex items-center gap-2 mb-4">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>
                                        <span style={{ fontSize: '15px', fontWeight: 700, color: '#1A1816' }}>Days on Market</span>
                                    </div>
                                    <div style={{ fontSize: '64px', fontWeight: 800, color: '#1A1816', lineHeight: '1' }}>{stats.avgDom}</div>
                                    <div className="mt-2" style={{ fontSize: '13px', color: '#9ca3af' }}>Avg days on market before sold.</div>
                                </div>

                                {/* Sign In CTA */}
                                <div className="mt-4 flex items-center gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg>
                                    <div>
                                        <div style={{ fontSize: '13px', fontWeight: 600, color: '#1A1816' }}>To receive daily updates, please sign in.</div>
                                        <Link href="/login" className="uppercase" style={{ fontSize: '12px', fontWeight: 800, color: '#3b82f6', letterSpacing: '0.5px' }}>Sign In Now</Link>
                                    </div>
                                </div>

                                {/* Contact Agent Form */}
                                <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6">
                                    <h3 style={{ fontSize: '17px', fontWeight: 700, color: '#1A1816', marginBottom: '16px' }}>Contact EcoListing Agent</h3>
                                    <div className="flex flex-col gap-3">
                                        <input type="text" placeholder="Your Name *" className="w-full border-0 border-b border-gray-200 px-0 pb-3 outline-none focus:border-gray-400" style={{ fontSize: '14px', color: '#1A1816' }} />
                                        <input type="text" placeholder="Your Phone Number *" className="w-full border-0 border-b border-gray-200 px-0 pb-3 outline-none focus:border-gray-400" style={{ fontSize: '14px', color: '#1A1816' }} />
                                        <input type="email" placeholder="Your Email Address *" className="w-full border-0 border-b border-gray-200 px-0 pb-3 outline-none focus:border-gray-400" style={{ fontSize: '14px', color: '#1A1816' }} />
                                        <textarea rows={3} className="w-full resize-none border-0 border-b border-gray-200 px-0 pb-3 outline-none focus:border-gray-400" style={{ fontSize: '14px', color: '#1A1816' }} defaultValue={`I am interested in properties in ${city}, All Communities. Please contact me.`} />
                                    </div>
                                    <div className="mt-3 flex items-start gap-2">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                        <p style={{ fontSize: '11px', color: '#9ca3af', lineHeight: '16px' }}>By submitting this form, I understand EcoListing will share my information with registered real estate professionals.</p>
                                    </div>
                                    <button className="mt-4 w-full rounded-xl text-white uppercase transition-opacity hover:opacity-90" style={{ backgroundColor: '#1A1816', height: '48px', fontSize: '13px', fontWeight: 800, letterSpacing: '1px' }}>
                                        Contact Agent
                                    </button>
                                </div>

                                {/* We're Hiring Banner */}
                                <div className="mt-4 rounded-2xl border-2 border-dashed border-blue-300 p-5 text-center">
                                    <span className="uppercase" style={{ fontSize: '13px', fontWeight: 800, color: '#3b82f6', letterSpacing: '1px' }}>We're Hiring! Join our team</span>
                                </div>

                                {/* City Links */}
                                <div className="mt-4 rounded-2xl border border-gray-200 bg-white p-6">
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                                        <div>
                                            {fraserValley.map((c, i) => (
                                                <button key={c} onClick={() => i > 0 ? handleCityChange(c) : undefined} className={`block w-full text-left transition-colors hover:text-gray-900 ${i === 0 ? 'mb-2' : ''}`} style={{ fontSize: i === 0 ? '13px' : '13px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#3b82f6' : '#6b7280', paddingTop: '2px', paddingBottom: '2px' }}>
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                        <div>
                                            {metroVancouver.map((c, i) => (
                                                <button key={c} onClick={() => i > 0 ? handleCityChange(c) : undefined} className={`block w-full text-left transition-colors hover:text-gray-900 ${i === 0 ? 'mb-2' : ''}`} style={{ fontSize: i === 0 ? '13px' : '13px', fontWeight: i === 0 ? 700 : 400, color: i === 0 ? '#3b82f6' : '#6b7280', paddingTop: '2px', paddingBottom: '2px' }}>
                                                    {c}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Just Sold Section ─── */}
            {soldListings.length > 0 && (
                <section className="bg-white" style={{ paddingTop: '56px', paddingBottom: '56px' }}>
                    <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1A1816' }}>Just Sold</h2>
                            <Link href={`/map-search?city=${encodeURIComponent(city)}`} className="transition-colors hover:text-gray-600" style={{ fontSize: '14px', fontWeight: 600, color: '#3b82f6' }}>See More</Link>
                        </div>
                        <div className="grid grid-cols-4 gap-5">
                            {soldListings.slice(0, 4).map((listing) => (
                                <Link key={listing.mlsNumber} href={`/property/${listing.mlsNumber}`} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
                                    <div className="relative" style={{ height: '180px' }}>
                                        <img src={listing.images[0]} alt={formatAddress(listing.address)} className="h-full w-full object-cover" />
                                        <div className="absolute left-3 top-3 rounded-lg px-2.5 py-1" style={{ fontSize: '11px', fontWeight: 700, color: 'white', backgroundColor: '#ef4444' }}>Just Sold</div>
                                        <LoginOverlay />
                                    </div>
                                    <div className="p-4">
                                        <div className="truncate" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>{formatAddress(listing.address)}</div>
                                        <div className="mt-1" style={{ fontSize: '12px', color: '#6b7280' }}>{listing.address.city} &bull; {listing.details?.propertyType || 'Residential'}</div>
                                        <div className="mt-2 flex items-center gap-2" style={{ fontSize: '12px', color: '#9ca3af' }}>
                                            {listing.details?.numBedrooms != null && <span>{listing.details.numBedrooms}</span>}
                                            {listing.details?.numBathrooms != null && <span>{listing.details.numBathrooms}</span>}
                                            {listing.details?.sqft && <span>{listing.details.sqft} sqft</span>}
                                        </div>
                                        <div className="mt-1" style={{ fontSize: '11px', color: '#9ca3af' }}>Listed by EcoListing Realty</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── Newly Listed Section ─── */}
            {activeListings.length > 0 && (
                <section style={{ backgroundColor: '#fafaf9', paddingTop: '56px', paddingBottom: '56px' }}>
                    <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#1A1816' }}>Newly Listed</h2>
                            <Link href={`/map-search?city=${encodeURIComponent(city)}`} className="transition-colors hover:text-gray-600" style={{ fontSize: '14px', fontWeight: 600, color: '#3b82f6' }}>See More</Link>
                        </div>
                        <div className="grid grid-cols-4 gap-5">
                            {activeListings.slice(0, 4).map((listing) => (
                                <Link key={listing.mlsNumber} href={`/property/${listing.mlsNumber}`} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
                                    <div className="relative" style={{ height: '180px' }}>
                                        <img src={listing.images[0]} alt={formatAddress(listing.address)} className="h-full w-full object-cover" />
                                        <div className="absolute left-3 top-3 rounded-lg px-2.5 py-1" style={{ fontSize: '11px', fontWeight: 700, color: 'white', backgroundColor: '#16a34a' }}>For Sale</div>
                                        <div className="absolute right-3 bottom-3 rounded-lg px-2.5 py-1" style={{ fontSize: '13px', fontWeight: 700, color: 'white', backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>{formatPriceFull(listing.listPrice)}</div>
                                    </div>
                                    <div className="p-4">
                                        <div className="truncate" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>{formatAddress(listing.address)}</div>
                                        <div className="mt-1" style={{ fontSize: '12px', color: '#6b7280' }}>{listing.address.city} &bull; {listing.details?.propertyType || 'Residential'}</div>
                                        <div className="mt-2 flex items-center gap-2" style={{ fontSize: '12px', color: '#9ca3af' }}>
                                            {listing.details?.numBedrooms != null && <span>{listing.details.numBedrooms}</span>}
                                            {listing.details?.numBathrooms != null && <span>{listing.details.numBathrooms}</span>}
                                            {listing.details?.sqft && <span>{listing.details.sqft} sqft</span>}
                                        </div>
                                        <div className="mt-1" style={{ fontSize: '11px', color: '#9ca3af' }}>Listed by EcoListing Realty</div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <Footer />
        </>
    );
}
