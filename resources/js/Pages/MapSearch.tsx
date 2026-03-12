import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';


const listings = [
    {
        id: 1,
        image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: '$3,895,000',
        beds: 5,
        baths: 5,
        sqft: '4,780',
        type: 'House',
        address: '1234 W 28th Ave, Vancouver, BC V6J 3A2',
        mls: 'R3074505',
        daysAgo: 2,
    },
    {
        id: 2,
        image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: '$2,221,000',
        beds: 4,
        baths: 4,
        sqft: '3,200',
        type: 'House',
        address: '5678 Granville St, Vancouver, BC V6M 3C4',
        mls: 'R3074506',
        daysAgo: 5,
    },
    {
        id: 3,
        image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: '$1,450,000',
        beds: 3,
        baths: 3,
        sqft: '2,400',
        type: 'Townhouse',
        address: '910 Main St, Vancouver, BC V6A 2V6',
        mls: 'R3074507',
        daysAgo: 1,
    },
    {
        id: 4,
        image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: '$899,000',
        beds: 2,
        baths: 2,
        sqft: '1,800',
        type: 'Condo',
        address: '1500 Robson St #802, Vancouver, BC V6G 1C2',
        mls: 'R3074508',
        daysAgo: 12,
    },
    {
        id: 5,
        image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: '$2,100,000',
        beds: 4,
        baths: 3,
        sqft: '3,050',
        type: 'House',
        address: '2200 W 41st Ave, Vancouver, BC V6M 2A3',
        mls: 'R3074509',
        daysAgo: 7,
    },
    {
        id: 6,
        image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: '$675,000',
        beds: 2,
        baths: 2,
        sqft: '1,950',
        type: 'Condo',
        address: '3456 Cambie St #405, Vancouver, BC V5Z 2W5',
        mls: 'R3074510',
        daysAgo: 3,
    },
];

function ChevronDown({ size = 12 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
        </svg>
    );
}

function HeartIcon() {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

function SearchIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
    );
}

function ListingCard({ listing }: { listing: typeof listings[0] }) {
    return (
        <Link href={`/property/${listing.id}`} className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg block">
            {/* Image */}
            <div className="relative" style={{ height: '180px' }}>
                <img
                    src={listing.image}
                    alt={listing.address}
                    className="h-full w-full object-cover"
                />
                {/* Days ago badge */}
                <div
                    className="absolute left-3 top-3 rounded-full px-3 py-1"
                    style={{ backgroundColor: 'rgba(0,0,0,0.6)', fontSize: '11px', fontWeight: 600, color: 'white' }}
                >
                    {listing.daysAgo === 1 ? '1 day ago' : `${listing.daysAgo} days ago`}
                </div>
                {/* Heart icon */}
                <button
                    className="absolute right-3 top-3 flex items-center justify-center rounded-full transition-colors hover:bg-black/30"
                    style={{ width: '34px', height: '34px', backgroundColor: 'rgba(0,0,0,0.25)' }}
                    onClick={(e) => e.preventDefault()}
                >
                    <HeartIcon />
                </button>
            </div>

            {/* Content */}
            <div className="p-3.5">
                {/* Price */}
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>
                    {listing.price}
                </div>

                {/* Stats */}
                <div className="mt-1 flex items-center gap-1.5" style={{ fontSize: '13px', color: '#6b7280' }}>
                    <span style={{ fontWeight: 600, color: '#374151' }}>{listing.beds}</span> bd
                    <span className="text-gray-300">|</span>
                    <span style={{ fontWeight: 600, color: '#374151' }}>{listing.baths}</span> ba
                    <span className="text-gray-300">|</span>
                    <span style={{ fontWeight: 600, color: '#374151' }}>{listing.sqft}</span> sqft
                    <span className="text-gray-300">|</span>
                    <span>{listing.type}</span>
                </div>

                {/* Address */}
                <div className="mt-1.5 truncate" style={{ fontSize: '13px', color: '#6b7280' }}>
                    {listing.address}
                </div>

                {/* MLS */}
                <div className="mt-1" style={{ fontSize: '11px', color: '#9ca3af' }}>
                    MLS&reg; {listing.mls}
                </div>
            </div>
        </Link>
    );
}

export default function MapSearch() {
    const [activeTab, setActiveTab] = useState<'for-sale' | 'price-reduced'>('for-sale');

    return (
        <>
            <Head title="Map Search - EcoListing.ca" />
            <div className="flex h-screen flex-col bg-white">
                <Header />

                {/* Search Bar */}
                <div className="shrink-0 border-b border-gray-200 bg-white py-2.5">
                    <div className="mx-auto flex items-center gap-2" style={{ maxWidth: '1408px' }}>
                        {/* Search input */}
                        <div className="relative flex-1" style={{ maxWidth: '320px' }}>
                            <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <SearchIcon />
                            </div>
                            <input
                                type="text"
                                placeholder="Vancouver, BC"
                                className="w-full rounded-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                style={{ height: '40px', fontSize: '14px' }}
                            />
                        </div>

                        {/* Filter buttons */}
                        {['Price', 'Beds & Baths', 'Type', 'Land Size', 'Filters'].map((filter) => (
                            <button
                                key={filter}
                                className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50"
                                style={{ height: '40px', fontSize: '13px', fontWeight: 500, color: '#1A1816', whiteSpace: 'nowrap' }}
                            >
                                {filter}
                                <ChevronDown />
                            </button>
                        ))}

                        {/* Spacer */}
                        <div className="flex-1" />

                        {/* Save Search button */}
                        <button
                            className="flex items-center gap-2 rounded-xl px-5 py-2 text-sm text-white transition-opacity hover:opacity-90"
                            style={{ height: '40px', backgroundColor: '#1A1816', fontSize: '13px', fontWeight: 600, letterSpacing: '0.3px', whiteSpace: 'nowrap' }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" />
                                <polyline points="7 3 7 8 15 8" />
                            </svg>
                            SAVE SEARCH
                        </button>
                    </div>
                </div>

                {/* Main Content: Map + Listings */}
                <div className="flex min-h-0 flex-1">
                    {/* Map Placeholder - Left side */}
                    <div className="relative hidden lg:block" style={{ width: '57%' }}>
                        <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: '#e8e8e8' }}>
                            <div className="text-center">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-4">
                                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                    <line x1="8" y1="2" x2="8" y2="18" />
                                    <line x1="16" y1="6" x2="16" y2="22" />
                                </svg>
                                <div style={{ fontSize: '24px', fontWeight: 600, color: '#9ca3af' }}>Map</div>
                                <div style={{ fontSize: '14px', color: '#b0b0b0', marginTop: '4px' }}>Interactive map will appear here</div>
                            </div>
                        </div>

                        {/* Map control buttons (zoom, fullscreen) */}
                        <div className="absolute right-3 top-3 flex flex-col gap-1">
                            <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white shadow-sm transition-colors hover:bg-gray-50" style={{ width: '36px', height: '36px' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="5" x2="12" y2="19" />
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                            <button className="flex items-center justify-center rounded-lg border border-gray-300 bg-white shadow-sm transition-colors hover:bg-gray-50" style={{ width: '36px', height: '36px' }}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12" />
                                </svg>
                            </button>
                        </div>

                        {/* Draw / Reset controls */}
                        <div className="absolute bottom-4 left-4 flex gap-2">
                            <button
                                className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold shadow-sm transition-colors hover:bg-gray-50"
                                style={{ color: '#1A1816' }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 19l7-7 3 3-7 7-3-3z" />
                                    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                                    <path d="M2 2l7.586 7.586" />
                                    <circle cx="11" cy="11" r="2" />
                                </svg>
                                Draw
                            </button>
                            <button
                                className="flex items-center gap-1.5 rounded-full border border-gray-300 bg-white px-4 py-2 text-xs font-semibold shadow-sm transition-colors hover:bg-gray-50"
                                style={{ color: '#1A1816' }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    {/* Listings Panel - Right side */}
                    <div className="flex min-h-0 flex-1 flex-col border-l border-gray-200 bg-white lg:max-w-[43%]">
                        {/* Panel Header */}
                        <div className="shrink-0 border-b border-gray-100 px-5 pt-4 pb-3">
                            {/* Title row */}
                            <div className="flex items-center justify-between">
                                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>All Listings</h2>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>Sort:</span>
                                        <button className="flex items-center gap-1 text-sm" style={{ fontSize: '12px', fontWeight: 600, color: '#1A1816' }}>
                                            Recommended
                                            <ChevronDown size={10} />
                                        </button>
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                                        {listings.length} results
                                    </span>
                                </div>
                            </div>

                            {/* Filter pills */}
                            <div className="mt-3 flex items-center gap-2">
                                <button
                                    onClick={() => setActiveTab('for-sale')}
                                    className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
                                    style={{
                                        backgroundColor: activeTab === 'for-sale' ? '#1A1816' : 'transparent',
                                        color: activeTab === 'for-sale' ? 'white' : '#1A1816',
                                        border: activeTab === 'for-sale' ? '1px solid #1A1816' : '1px solid #d1d5db',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    FOR SALE
                                </button>
                                <button
                                    onClick={() => setActiveTab('price-reduced')}
                                    className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
                                    style={{
                                        backgroundColor: activeTab === 'price-reduced' ? '#1A1816' : 'transparent',
                                        color: activeTab === 'price-reduced' ? 'white' : '#1A1816',
                                        border: activeTab === 'price-reduced' ? '1px solid #1A1816' : '1px solid #d1d5db',
                                        letterSpacing: '0.5px',
                                    }}
                                >
                                    PRICE REDUCED
                                </button>
                            </div>

                            {/* Toggle filters */}
                            <div className="mt-3 flex items-center gap-4">
                                {['Virtual Tour', 'Floor Plans', 'Open House'].map((toggle) => (
                                    <label key={toggle} className="flex cursor-pointer items-center gap-1.5">
                                        <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                        <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>{toggle}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Scrollable listings grid */}
                        <div className="flex-1 overflow-y-auto px-5 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                {listings.map((listing) => (
                                    <ListingCard key={listing.id} listing={listing} />
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="mt-6 pb-4 text-center" style={{ fontSize: '12px', color: '#9ca3af' }}>
                                Showing {listings.length} of {listings.length} listings
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
