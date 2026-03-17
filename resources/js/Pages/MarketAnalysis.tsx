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

export default function MarketAnalysis({ activeListings, soldListings, stats, selectedCity }: Props) {
    const [city, setCity] = useState(selectedCity || 'Vancouver');
    const [propertyType, setPropertyType] = useState('All Types');

    const handleCityChange = (newCity: string) => {
        setCity(newCity);
        window.location.href = `/market-analysis?city=${encodeURIComponent(newCity)}`;
    };

    // Market balance calculation
    const absorptionRate = stats.activeCount > 0 ? stats.soldCount / stats.activeCount : 0;
    const marketType = absorptionRate > 0.2 ? "Seller's Market" : absorptionRate > 0.15 ? 'Balanced' : "Buyer's Market";
    const balancePercent = absorptionRate > 0.2 ? 85 : absorptionRate > 0.15 ? 50 : 20;

    return (
        <>
            <Head title={`${city} Market Analysis - EcoListing.ca`} />
            <Header />

            {/* Hero Section */}
            <section className="bg-white" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <p className="uppercase tracking-widest" style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', letterSpacing: '2px', marginBottom: '16px' }}>
                        Market Insights
                    </p>

                    {/* City & Filter Row */}
                    <div className="flex items-center gap-4" style={{ marginBottom: '32px' }}>
                        <select
                            value={city}
                            onChange={(e) => handleCityChange(e.target.value)}
                            className="appearance-none rounded-xl border border-gray-300 bg-white px-4 outline-none transition-colors focus:border-gray-500"
                            style={{ height: '48px', fontSize: '15px', fontWeight: 600, color: '#1A1816', minWidth: '200px' }}
                        >
                            {bcCities.map((c) => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                        <select
                            value={propertyType}
                            onChange={(e) => setPropertyType(e.target.value)}
                            className="appearance-none rounded-xl border border-gray-300 bg-white px-4 outline-none transition-colors focus:border-gray-500"
                            style={{ height: '48px', fontSize: '15px', color: '#1A1816', minWidth: '160px' }}
                        >
                            <option>All Types</option>
                            <option>Detached</option>
                            <option>Condo</option>
                            <option>Townhouse</option>
                        </select>
                    </div>

                    {/* Title */}
                    <h1 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.2' }}>
                        {city} Housing Market Report
                    </h1>
                    <p className="mt-2" style={{ fontSize: '14px', color: '#9ca3af' }}>
                        Updated {new Date().toLocaleDateString('en-CA', { month: 'long', year: 'numeric' })}
                    </p>
                </div>
            </section>

            {/* Market Balance + Stats */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '48px', paddingBottom: '48px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    {/* Market Balance Indicator */}
                    <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <div className="mb-3" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>Market Balance</div>
                        <div className="mb-2 flex items-center justify-between" style={{ fontSize: '13px', color: '#6b7280' }}>
                            <span style={{ fontWeight: 600, color: marketType === "Buyer's Market" ? '#1A1816' : undefined }}>Buyer's Market</span>
                            <span style={{ fontWeight: 600, color: marketType === 'Balanced' ? '#1A1816' : undefined }}>Balanced</span>
                            <span style={{ fontWeight: 600, color: marketType === "Seller's Market" ? '#1A1816' : undefined }}>Seller's Market</span>
                        </div>
                        <div className="relative h-2 overflow-hidden rounded-full bg-gray-200">
                            <div className="absolute left-0 top-0 h-full rounded-full transition-all" style={{ width: `${balancePercent}%`, background: 'linear-gradient(90deg, #3b82f6, #f59e0b, #ef4444)' }} />
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-4 gap-6">
                        <div className="rounded-2xl border border-gray-200 bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Active Listings</div>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1A1816' }}>{stats.activeCount.toLocaleString()}</div>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Sold Listings</div>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1A1816' }}>{stats.soldCount.toLocaleString()}</div>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Avg. Price</div>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1A1816' }}>{formatPrice(stats.avgPrice)}</div>
                        </div>
                        <div className="rounded-2xl border border-gray-200 bg-white p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                            <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px' }}>Avg DOM</div>
                            <div className="flex items-baseline gap-2">
                                <span style={{ fontSize: '32px', fontWeight: 800, color: '#1A1816' }}>{stats.avgDom}</span>
                                <span style={{ fontSize: '14px', color: '#6b7280' }}>Days</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Market Summary Stats */}
            <section className="bg-white" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center justify-center rounded-xl" style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f4' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '13px', color: '#6b7280' }}>Months of Inventory</div>
                                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#1A1816' }}>
                                        {stats.soldCount > 0 ? Math.round(stats.activeCount / stats.soldCount) : 'N/A'}
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#9ca3af' }}>Months to sell all current listings.</div>
                                </div>
                            </div>
                        </div>
                        <div className="rounded-2xl border border-gray-200 p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex items-center justify-center rounded-xl" style={{ width: '40px', height: '40px', backgroundColor: '#f5f5f4' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                </div>
                                <div>
                                    <div style={{ fontSize: '13px', color: '#6b7280' }}>Days on Market</div>
                                    <div style={{ fontSize: '28px', fontWeight: 800, color: '#1A1816' }}>{stats.avgDom}</div>
                                    <div style={{ fontSize: '13px', color: '#9ca3af' }}>Avg days on market before sold.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Agent CTA */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '48px', paddingBottom: '48px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="rounded-2xl border border-gray-200 bg-white p-8" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816', marginBottom: '20px' }}>Contact EcoListing Agent</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <input type="text" placeholder="Your Name *" className="rounded-xl border border-gray-300 px-4 outline-none focus:border-gray-500" style={{ height: '48px', fontSize: '14px' }} />
                            <input type="text" placeholder="Your Phone Number *" className="rounded-xl border border-gray-300 px-4 outline-none focus:border-gray-500" style={{ height: '48px', fontSize: '14px' }} />
                            <input type="email" placeholder="Your Email Address *" className="rounded-xl border border-gray-300 px-4 outline-none focus:border-gray-500" style={{ height: '48px', fontSize: '14px' }} />
                        </div>
                        <p className="mt-4" style={{ fontSize: '13px', color: '#6b7280', lineHeight: '20px' }}>
                            I am interested in properties in {city}, All Communities. Please contact me.
                        </p>
                        <p className="mt-2" style={{ fontSize: '11px', color: '#9ca3af' }}>
                            By submitting this form, I understand EcoListing will share my information with registered real estate professionals.
                        </p>
                        <button className="mt-4 rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#1A1816', height: '48px', paddingLeft: '32px', paddingRight: '32px', fontSize: '14px', fontWeight: 600 }}>
                            Contact Agent
                        </button>
                    </div>
                </div>
            </section>

            {/* BC Cities Quick Links */}
            <section className="bg-white" style={{ paddingTop: '48px', paddingBottom: '24px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="flex flex-wrap gap-3">
                        {bcCities.map((c) => (
                            <button
                                key={c}
                                onClick={() => handleCityChange(c)}
                                className="transition-all"
                                style={{
                                    padding: '8px 20px',
                                    borderRadius: '9999px',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    border: c === city ? '1.5px solid #1A1816' : '1.5px solid #d4d4d4',
                                    backgroundColor: c === city ? '#1A1816' : '#ffffff',
                                    color: c === city ? '#ffffff' : '#1A1816',
                                    cursor: 'pointer',
                                }}
                            >
                                {c}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newly Listed */}
            {activeListings.length > 0 && (
                <section className="bg-white" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
                    <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1816' }}>Newly Listed</h2>
                            <Link href={`/map-search?city=${encodeURIComponent(city)}`} className="underline transition-colors hover:text-gray-600" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>
                                See More
                            </Link>
                        </div>
                        <div className="grid grid-cols-4 gap-6">
                            {activeListings.slice(0, 4).map((listing) => (
                                <Link key={listing.mlsNumber} href={`/property/${listing.mlsNumber}`} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
                                    <div className="relative" style={{ height: '200px' }}>
                                        <img src={listing.images[0]} alt={formatAddress(listing.address)} className="h-full w-full object-cover" />
                                        <div className="absolute left-3 top-3 rounded-lg px-2.5 py-1" style={{ fontSize: '11px', fontWeight: 700, color: 'white', backgroundColor: '#16a34a' }}>
                                            For Sale
                                        </div>
                                        <div className="absolute right-3 top-3" style={{ fontSize: '14px', fontWeight: 700, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
                                            {formatPriceFull(listing.listPrice)}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#1A1816' }}>{formatAddress(listing.address)}</div>
                                        <div className="mt-1" style={{ fontSize: '13px', color: '#6b7280' }}>
                                            {listing.address.city} &bull; {listing.details?.propertyType || listing.details?.style || 'Residential'}
                                        </div>
                                        <div className="mt-2 flex items-center gap-3" style={{ fontSize: '12px', color: '#9ca3af' }}>
                                            {listing.details?.numBedrooms != null && <span>{listing.details.numBedrooms} bd</span>}
                                            {listing.details?.numBathrooms != null && <span>{listing.details.numBathrooms} ba</span>}
                                            {listing.details?.sqft && <span>{listing.details.sqft} sqft</span>}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Recently Sold */}
            {soldListings.length > 0 && (
                <section style={{ backgroundColor: '#fafaf9', paddingTop: '48px', paddingBottom: '48px' }}>
                    <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                        <div className="flex items-center justify-between" style={{ marginBottom: '24px' }}>
                            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1816' }}>Just Sold</h2>
                            <Link href={`/map-search?city=${encodeURIComponent(city)}`} className="underline transition-colors hover:text-gray-600" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>
                                See More
                            </Link>
                        </div>
                        <div className="grid grid-cols-4 gap-6">
                            {soldListings.slice(0, 4).map((listing) => (
                                <Link key={listing.mlsNumber} href={`/property/${listing.mlsNumber}`} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
                                    <div className="relative" style={{ height: '200px' }}>
                                        <img src={listing.images[0]} alt={formatAddress(listing.address)} className="h-full w-full object-cover" />
                                        <div className="absolute left-3 top-3 rounded-lg px-2.5 py-1" style={{ fontSize: '11px', fontWeight: 700, color: 'white', backgroundColor: '#ef4444' }}>
                                            Just Sold
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div style={{ fontSize: '15px', fontWeight: 600, color: '#1A1816' }}>{formatAddress(listing.address)}</div>
                                        <div className="mt-1" style={{ fontSize: '13px', color: '#6b7280' }}>
                                            {listing.address.city} &bull; {listing.details?.propertyType || listing.details?.style || 'Residential'}
                                        </div>
                                        <div className="mt-2 flex items-center gap-3" style={{ fontSize: '12px', color: '#9ca3af' }}>
                                            {listing.details?.numBedrooms != null && <span>{listing.details.numBedrooms} bd</span>}
                                            {listing.details?.numBathrooms != null && <span>{listing.details.numBathrooms} ba</span>}
                                            {listing.details?.sqft && <span>{listing.details.sqft} sqft</span>}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Banner */}
            <section style={{ backgroundColor: '#1A1816', paddingTop: '64px', paddingBottom: '64px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '1280px' }}>
                    <p className="uppercase tracking-widest" style={{ fontSize: '12px', fontWeight: 600, color: '#a3a3a3', letterSpacing: '2px', marginBottom: '16px' }}>
                        We're Hiring
                    </p>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '16px' }}>
                        Join our team
                    </h2>
                    <p style={{ fontSize: '17px', color: '#94a3b8', marginBottom: '32px', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
                        To receive daily updates and market insights, please sign in or contact one of our agents.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <Link href="/login" className="inline-flex items-center justify-center rounded-full transition-opacity hover:opacity-90" style={{ backgroundColor: '#ffffff', color: '#1A1816', height: '48px', paddingLeft: '32px', paddingRight: '32px', fontSize: '15px', fontWeight: 600 }}>
                            Sign In Now
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
