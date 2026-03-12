import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

function HeartIcon({ filled = false }: { filled?: boolean }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#ec4899' : 'none'} stroke={filled ? '#ec4899' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

function StarIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="#facc15" stroke="#facc15" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

const similarListings = [
    {
        id: 2,
        image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: '$2,221,000',
        beds: 4,
        baths: 4,
        sqft: '3,200',
        address: '5678 Granville St, Vancouver, BC',
        mls: 'R3074506',
        daysAgo: 5,
    },
    {
        id: 3,
        image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: '$1,450,000',
        beds: 3,
        baths: 3,
        sqft: '2,400',
        address: '910 Main St, Vancouver, BC',
        mls: 'R3074507',
        daysAgo: 1,
    },
    {
        id: 4,
        image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=600',
        price: '$899,000',
        beds: 2,
        baths: 2,
        sqft: '1,800',
        address: '1500 Robson St #802, Vancouver, BC',
        mls: 'R3074508',
        daysAgo: 12,
    },
];

const galleryImages = [
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=1200',
];

export default function PropertyDetails({ id }: { id: string }) {
    const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);

    const openGallery = (index: number) => {
        setGalleryIndex(index);
        setGalleryOpen(true);
    };

    const prevImage = useCallback(() => setGalleryIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1)), []);
    const nextImage = useCallback(() => setGalleryIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1)), []);

    useEffect(() => {
        if (!galleryOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setGalleryOpen(false);
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        };
        document.body.style.overflow = 'hidden';
        window.addEventListener('keydown', handleKey);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKey);
        };
    }, [galleryOpen, prevImage, nextImage]);

    return (
        <>
            <Head title="9213 Denman Crescent - EcoListing.ca" />
            <div className="flex min-h-screen flex-col bg-white">
                <Header />

                {/* Page Content */}
                <div className="mx-auto w-full px-4" style={{ maxWidth: '1280px' }}>

                    {/* 1. Breadcrumb */}
                    <div className="pt-6 pb-4 flex items-center gap-2" style={{ fontSize: '13px', color: '#9ca3af' }}>
                        <Link href="/" className="transition-colors hover:text-gray-700">Home</Link>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <Link href="/map-search" className="transition-colors hover:text-gray-700">Listings</Link>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                        <span style={{ color: '#1A1816' }}>9213 Denman Crescent</span>
                    </div>

                    {/* 2. Title Row */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1A1816', lineHeight: '36px' }}>
                                9213 Denman Crescent, Vancouver, BC
                            </h1>
                            <div className="mt-2.5 flex items-center gap-3">
                                <span className="rounded-full border border-gray-300 px-3 py-1" style={{ fontSize: '12px', color: '#374151' }}>
                                    House
                                </span>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>Vancouver, BC</span>
                                <div className="flex items-center gap-1">
                                    <StarIcon />
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: '#1A1816' }}>4.8</span>
                                    <span style={{ fontSize: '13px', color: '#6b7280' }}>(256 reviews)</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {/* Map icon */}
                            <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50" style={{ width: '40px', height: '40px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                    <line x1="8" y1="2" x2="8" y2="18" />
                                    <line x1="16" y1="6" x2="16" y2="22" />
                                </svg>
                            </button>
                            {/* Share icon */}
                            <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50" style={{ width: '40px', height: '40px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                            </button>
                            {/* Heart icon */}
                            <button className="flex items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50" style={{ width: '40px', height: '40px', backgroundColor: '#fdf2f8' }}>
                                <HeartIcon filled />
                            </button>
                            {/* More dots */}
                            <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50" style={{ width: '40px', height: '40px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="#1A1816">
                                    <circle cx="12" cy="5" r="1.5" />
                                    <circle cx="12" cy="12" r="1.5" />
                                    <circle cx="12" cy="19" r="1.5" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* 3. Image Gallery */}
                    <div className="mt-6 flex gap-[17px]" style={{ height: '645px' }}>
                        {/* Main Image - min 800px */}
                        <div
                            className="relative flex-1 cursor-pointer overflow-hidden rounded-xl"
                            style={{ minWidth: '800px' }}
                            onClick={() => openGallery(0)}
                        >
                            <img
                                src={galleryImages[0]}
                                alt="Property main"
                                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                            />
                            {/* Photo count badge */}
                            <div
                                className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg px-3 py-2"
                                style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                            >
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                    <circle cx="8.5" cy="8.5" r="1.5" />
                                    <polyline points="21 15 16 10 5 21" />
                                </svg>
                                <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{galleryImages.length} Photos</span>
                            </div>
                        </div>
                        {/* Right Column - Two stacked images */}
                        <div className="flex flex-col justify-between" style={{ width: '318px', flexShrink: 0 }}>
                            <div
                                className="relative cursor-pointer overflow-hidden rounded-xl"
                                style={{ height: '310px' }}
                                onClick={() => openGallery(1)}
                            >
                                <img
                                    src={galleryImages[1]}
                                    alt="Property interior"
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                                />
                            </div>
                            <div
                                className="relative cursor-pointer overflow-hidden rounded-xl"
                                style={{ height: '310px' }}
                                onClick={() => openGallery(2)}
                            >
                                <img
                                    src={galleryImages[2]}
                                    alt="Property backyard"
                                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* 4. Content + Sidebar */}
                    <div className="mt-8 flex gap-12">
                        {/* LEFT CONTENT */}
                        <div className="min-w-0 flex-1" style={{ maxWidth: '60%' }}>

                            {/* a) Property title & stats */}
                            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1816' }}>Emerald Residences</h2>
                            <div className="mt-3 flex items-center gap-4" style={{ fontSize: '14px', color: '#6b7280' }}>
                                <div className="flex items-center gap-1.5">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 22V9l9-7 9 7v13" />
                                        <path d="M9 22V12h6v10" />
                                    </svg>
                                    <span>5 Beds</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1.5">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M4 12h16a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z" />
                                        <path d="M6 12V5a2 2 0 0 1 2-2h3a1 1 0 0 1 1 1v3" />
                                        <line x1="4" y1="18" x2="4" y2="21" />
                                        <line x1="20" y1="18" x2="20" y2="21" />
                                    </svg>
                                    <span>5 Baths</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1.5">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="3" width="18" height="18" rx="2" />
                                        <line x1="3" y1="12" x2="21" y2="12" />
                                        <line x1="12" y1="3" x2="12" y2="21" />
                                    </svg>
                                    <span>4,780 sqft</span>
                                </div>
                                <span className="text-gray-300">|</span>
                                <div className="flex items-center gap-1.5">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span>Built 2019</span>
                                </div>
                            </div>

                            {/* b) Host info */}
                            <div className="mt-6 flex items-center gap-8">
                                <div className="flex items-center gap-3">
                                    <span style={{ fontSize: '13px', color: '#6b7280' }}>Listed by:</span>
                                    <div className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', backgroundColor: '#1A1816' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>JD</span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>James Davidson</div>
                                        <div style={{ fontSize: '12px', color: '#6b7280' }}>EcoListing Verified Agent</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span style={{ fontSize: '13px', color: '#6b7280' }}>Brokerage:</span>
                                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1816' }}>Vancouver Homes Realty</span>
                                </div>
                            </div>

                            {/* c) Key features */}
                            <div className="mt-8 grid grid-cols-3 gap-6">
                                {/* Virtual Tour */}
                                <div>
                                    <div className="flex items-center justify-center rounded-2xl" style={{ width: '48px', height: '48px', backgroundColor: '#f5f5f4' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                            <polyline points="9 22 9 12 15 12 15 22" />
                                        </svg>
                                    </div>
                                    <div className="mt-3" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>Virtual Tour Available</div>
                                    <div className="mt-1" style={{ fontSize: '13px', color: '#6b7280', lineHeight: '20px' }}>Explore the home from anywhere with our 3D virtual tour.</div>
                                </div>
                                {/* Verified */}
                                <div>
                                    <div className="flex items-center justify-center rounded-2xl" style={{ width: '48px', height: '48px', backgroundColor: '#f5f5f4' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        </svg>
                                    </div>
                                    <div className="mt-3" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>Verified Listing</div>
                                    <div className="mt-1" style={{ fontSize: '13px', color: '#6b7280', lineHeight: '20px' }}>This property has been verified by our team for accuracy.</div>
                                </div>
                                {/* Quick Closing */}
                                <div>
                                    <div className="flex items-center justify-center rounded-2xl" style={{ width: '48px', height: '48px', backgroundColor: '#f5f5f4' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="12" cy="12" r="10" />
                                            <polyline points="12 6 12 12 16 14" />
                                        </svg>
                                    </div>
                                    <div className="mt-3" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>Quick Closing</div>
                                    <div className="mt-1" style={{ fontSize: '13px', color: '#6b7280', lineHeight: '20px' }}>Seller is motivated and ready for a fast closing process.</div>
                                </div>
                            </div>

                            {/* d) Tabs */}
                            <div className="mt-8 flex items-center gap-3">
                                <button
                                    onClick={() => setActiveTab('overview')}
                                    className="rounded-full px-5 py-2 transition-colors"
                                    style={{
                                        backgroundColor: activeTab === 'overview' ? '#1A1816' : 'transparent',
                                        color: activeTab === 'overview' ? 'white' : '#6b7280',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    }}
                                >
                                    Overview
                                </button>
                                <button
                                    onClick={() => setActiveTab('reviews')}
                                    className="rounded-full px-5 py-2 transition-colors"
                                    style={{
                                        backgroundColor: activeTab === 'reviews' ? '#1A1816' : 'transparent',
                                        color: activeTab === 'reviews' ? 'white' : '#6b7280',
                                        fontSize: '14px',
                                        fontWeight: 500,
                                    }}
                                >
                                    40+ Reviews
                                </button>
                            </div>

                            {/* e) Description */}
                            <div className="mt-6" style={{ fontSize: '15px', color: '#374151', lineHeight: '26px' }}>
                                <p>
                                    This stunning 5-bedroom executive home sits on a quiet tree-lined street in one of Vancouver's most sought-after neighbourhoods. Featuring an open-concept main floor with soaring ceilings, a gourmet kitchen with premium appliances, and a spacious family room with fireplace.
                                </p>
                                <p className="mt-4">
                                    The master suite offers a spa-like ensuite and walk-in closet. The professionally landscaped backyard includes a covered patio, perfect for entertaining. Minutes from top-rated schools, parks, shopping, and transit...
                                </p>
                                <button className="mt-3 underline" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>
                                    Read More
                                </button>
                            </div>

                            {/* f) Property Details grid */}
                            <div className="mt-10">
                                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>Property Details</h3>
                                <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-4">
                                    {[
                                        { label: 'Property Type', value: 'House' },
                                        { label: 'Year Built', value: '2019' },
                                        { label: 'Lot Size', value: '6,200 sqft' },
                                        { label: 'Parking', value: '2 Car Garage' },
                                        { label: 'Heating', value: 'Forced Air' },
                                        { label: 'Cooling', value: 'Central A/C' },
                                        { label: 'MLS#', value: 'R3074505' },
                                        { label: 'Status', value: 'Active' },
                                    ].map((item) => (
                                        <div key={item.label} className="flex justify-between border-b border-gray-100 pb-3">
                                            <span style={{ fontSize: '13px', color: '#6b7280' }}>{item.label}</span>
                                            <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1816' }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDEBAR */}
                        <div className="shrink-0" style={{ width: '380px' }}>
                            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                {/* Price */}
                                <div className="flex items-baseline gap-1.5">
                                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#1A1816' }}>$3,895,000</span>
                                    <span style={{ fontSize: '13px', color: '#9ca3af' }}>/Asking Price</span>
                                </div>

                                <div className="mt-4 border-t border-gray-200" />

                                <div className="mt-4">
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#1A1816' }}>House for Sale</span>
                                    <span style={{ fontSize: '15px', color: '#6b7280' }}> in Vancouver, BC</span>
                                </div>
                                <div className="mt-1" style={{ fontSize: '13px', color: '#9ca3af' }}>Listed 7 days ago</div>

                                <div className="mt-4 border-t border-gray-200" />

                                {/* Form */}
                                <div className="mt-4">
                                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>Schedule a Viewing</label>
                                    <div className="mt-3 grid grid-cols-2 gap-3">
                                        <input
                                            type="date"
                                            className="w-full rounded-xl border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                            style={{ height: '48px' }}
                                            placeholder="Preferred Date"
                                        />
                                        <input
                                            type="time"
                                            className="w-full rounded-xl border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                            style={{ height: '48px' }}
                                            placeholder="Preferred Time"
                                        />
                                    </div>
                                    <textarea
                                        rows={3}
                                        className="mt-3 w-full rounded-xl border border-gray-300 px-3 py-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                        placeholder="I'm interested in this property..."
                                    />
                                </div>

                                <button
                                    className="mt-4 w-full rounded-xl text-white transition-opacity hover:opacity-90"
                                    style={{ height: '48px', backgroundColor: '#1A1816', fontSize: '14px', fontWeight: 600 }}
                                >
                                    Request Viewing
                                </button>
                                <div className="mt-2 text-center" style={{ fontSize: '12px', color: '#9ca3af' }}>
                                    You won't be charged
                                </div>

                                <div className="mt-6 border-t border-gray-200" />

                                {/* Price breakdown */}
                                <div className="mt-5">
                                    <div style={{ fontSize: '13px', color: '#6b7280' }}>Estimated Monthly Payment</div>
                                    <div className="mt-1" style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>$15,200/mo</div>
                                    <div className="mt-4 flex flex-col gap-2.5">
                                        {[
                                            { label: 'Principal & Interest', value: '$12,800' },
                                            { label: 'Property Tax', value: '$1,400' },
                                            { label: 'Insurance', value: '$600' },
                                            { label: 'HOA', value: '$400' },
                                        ].map((item) => (
                                            <div key={item.label} className="flex items-center justify-between">
                                                <span style={{ fontSize: '13px', color: '#6b7280' }}>{item.label}</span>
                                                <span style={{ fontSize: '13px', fontWeight: 500, color: '#1A1816' }}>{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 5. Similar Listings */}
                    <div className="mt-16 mb-16">
                        <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1816' }}>Similar Properties Nearby</h2>
                        <div className="mt-6 grid grid-cols-3 gap-6">
                            {similarListings.map((listing) => (
                                <Link
                                    key={listing.id}
                                    href={`/property/${listing.id}`}
                                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg"
                                >
                                    {/* Image */}
                                    <div className="relative" style={{ height: '192px' }}>
                                        <img
                                            src={listing.image}
                                            alt={listing.address}
                                            className="h-full w-full object-cover"
                                        />
                                        <div
                                            className="absolute left-3 top-3 rounded-full px-3 py-1"
                                            style={{ backgroundColor: 'rgba(0,0,0,0.6)', fontSize: '11px', fontWeight: 600, color: 'white' }}
                                        >
                                            {listing.daysAgo === 1 ? '1 day ago' : `${listing.daysAgo} days ago`}
                                        </div>
                                        <button
                                            className="absolute right-3 top-3 flex items-center justify-center rounded-full transition-colors hover:bg-black/30"
                                            style={{ width: '34px', height: '34px', backgroundColor: 'rgba(0,0,0,0.25)' }}
                                            onClick={(e) => e.preventDefault()}
                                        >
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                            </svg>
                                        </button>
                                    </div>
                                    {/* Content */}
                                    <div className="p-4">
                                        <div style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>
                                            {listing.price}
                                        </div>
                                        <div className="mt-1 flex items-center gap-1.5" style={{ fontSize: '13px', color: '#6b7280' }}>
                                            <span style={{ fontWeight: 600, color: '#374151' }}>{listing.beds}</span> bd
                                            <span className="text-gray-300">|</span>
                                            <span style={{ fontWeight: 600, color: '#374151' }}>{listing.baths}</span> ba
                                            <span className="text-gray-300">|</span>
                                            <span style={{ fontWeight: 600, color: '#374151' }}>{listing.sqft}</span> sqft
                                        </div>
                                        <div className="mt-1.5 truncate" style={{ fontSize: '13px', color: '#6b7280' }}>
                                            {listing.address}
                                        </div>
                                        <div className="mt-1" style={{ fontSize: '11px', color: '#9ca3af' }}>
                                            MLS&reg; {listing.mls}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <Footer />
            </div>

            {/* Fullscreen Gallery Modal */}
            {galleryOpen && (
                <div
                    className="fixed inset-0 z-50 flex flex-col"
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}
                >
                    {/* Top Bar */}
                    <div
                        className="flex items-center justify-between px-4"
                        style={{ height: '56px', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.9)' }}
                    >
                        <div className="flex flex-col gap-0.5 text-white">
                            <span style={{ fontSize: '14px', fontWeight: 600 }}>9213 Denman Crescent</span>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>
                                ({galleryIndex + 1} of {galleryImages.length})
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                className="flex items-center justify-center rounded-md border transition-colors hover:bg-white/20"
                                style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setGalleryOpen(false)}
                                className="flex items-center justify-center rounded-md border transition-colors hover:bg-white/20"
                                style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
                            >
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Image Area */}
                    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                        {/* Prev Button */}
                        <button
                            onClick={prevImage}
                            className="absolute left-3 z-10 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-white"
                            style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.9)', top: '50%', transform: 'translateY(-50%)' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>

                        {/* Current Image */}
                        <div className="flex h-full w-full items-center justify-center overflow-hidden px-16">
                            <img
                                src={galleryImages[galleryIndex]}
                                alt={`Gallery photo ${galleryIndex + 1}`}
                                className="rounded-lg object-contain"
                                style={{ maxWidth: '100%', maxHeight: '100%' }}
                            />
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={nextImage}
                            className="absolute right-3 z-10 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-white"
                            style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.9)', top: '50%', transform: 'translateY(-50%)' }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    </div>

                    {/* Bottom Thumbnails */}
                    <div
                        className="flex items-center gap-2 overflow-x-auto px-4"
                        style={{ height: '80px', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.9)' }}
                    >
                        {galleryImages.map((img, i) => (
                            <button
                                key={i}
                                onClick={() => setGalleryIndex(i)}
                                className="flex-shrink-0 overflow-hidden rounded-md transition-all hover:opacity-90"
                                style={{
                                    width: '80px',
                                    height: '60px',
                                    opacity: i === galleryIndex ? 1 : 0.7,
                                    border: i === galleryIndex ? '2px solid #3b82f6' : '2px solid rgba(255,255,255,0.2)',
                                    transform: i === galleryIndex ? 'scale(1.05)' : 'scale(1)',
                                }}
                            >
                                <img src={img} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
