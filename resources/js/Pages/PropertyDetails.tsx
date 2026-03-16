import { Head, Link } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

interface ListingData {
    mlsNumber: string;
    status: string;
    listPrice: string;
    listDate: string;
    type: string;
    class: string;
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
    map: { latitude: number | null; longitude: number | null };
    details: {
        numBedrooms: number | null;
        numBathrooms: number | null;
        sqft: string;
        yearBuilt: string;
        propertyType: string;
        style: string;
        description: string;
        garage: string;
        heating: string;
        airConditioning: string;
        basement1: string;
        [key: string]: unknown;
    };
    images: string[];
    photoCount: number;
    daysOnMarket: number;
    agents: Array<{ name?: string; office?: string }>;
    office: { brokerageName?: string };
    taxes: { annualAmount?: number };
    lot: { acres?: string; depth?: string; width?: string };
    [key: string]: unknown;
}

interface SimilarListing {
    mlsNumber: string;
    listPrice: string;
    address: ListingData['address'];
    details: ListingData['details'];
    images: string[];
    daysOnMarket: number;
}

interface Props {
    mlsNumber: string;
    listing: ListingData | null;
    similarListings: SimilarListing[];
}

function formatPrice(price: string | number): string {
    const num = typeof price === 'string' ? parseInt(price, 10) : price;
    if (isNaN(num)) return '$0';
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(num);
}

function formatAddress(address: ListingData['address']): string {
    const parts = [address?.streetNumber, address?.streetName, address?.streetSuffix].filter(Boolean);
    let street = parts.join(' ');
    if (address?.unitNumber) street = `#${address.unitNumber} - ${street}`;
    return street;
}

function formatFullAddress(address: ListingData['address']): string {
    const street = formatAddress(address);
    return [street, address?.city, `${address?.state || ''} ${address?.zip || ''}`].filter(Boolean).join(', ');
}

function getImages(listing: ListingData | null): string[] {
    if (!listing?.images?.length) return [];
    return listing.images;
}

function HeartIcon({ filled = false }: { filled?: boolean }) {
    return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill={filled ? '#ec4899' : 'none'} stroke={filled ? '#ec4899' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
    );
}

export default function PropertyDetails({ mlsNumber, listing, similarListings = [] }: Props) {
    const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
    const [galleryOpen, setGalleryOpen] = useState(false);
    const [galleryIndex, setGalleryIndex] = useState(0);
    const [descExpanded, setDescExpanded] = useState(false);

    const images = getImages(listing);
    const address = listing?.address;
    const details = listing?.details;
    const streetAddress = address ? formatAddress(address) : mlsNumber;
    const fullAddress = address ? formatFullAddress(address) : '';

    const openGallery = (index: number) => {
        setGalleryIndex(index);
        setGalleryOpen(true);
    };

    const prevImage = useCallback(() => setGalleryIndex((i) => (i === 0 ? images.length - 1 : i - 1)), [images.length]);
    const nextImage = useCallback(() => setGalleryIndex((i) => (i === images.length - 1 ? 0 : i + 1)), [images.length]);

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

    if (!listing) {
        return (
            <>
                <Head title="Listing Not Found - EcoListing.ca" />
                <div className="flex min-h-screen flex-col bg-white">
                    <Header />
                    <div className="flex flex-1 items-center justify-center">
                        <div className="text-center">
                            <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1816' }}>Listing Not Found</h1>
                            <p className="mt-2" style={{ fontSize: '15px', color: '#6b7280' }}>The listing {mlsNumber} could not be found.</p>
                            <Link href="/map-search" className="mt-4 inline-block rounded-xl px-6 py-2.5 text-white" style={{ backgroundColor: '#1A1816', fontSize: '14px', fontWeight: 600 }}>
                                Browse Listings
                            </Link>
                        </div>
                    </div>
                    <Footer />
                </div>
            </>
        );
    }

    const agentName = listing.agents?.[0]?.name || 'Listing Agent';
    const agentInitials = agentName.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase();
    const brokerageName = listing.office?.brokerageName || '';
    const description = (details?.description || '').replace(/\*{4}\s*SAMPLE DATA\s*\*{4}\s*/gi, '').trim();
    const propertyType = details?.propertyType || details?.style || 'Residential';
    const statusLabel = listing.status === 'A' ? 'Active' : listing.status === 'U' ? 'Sold' : listing.status;

    const propertyDetails = [
        { label: 'Property Type', value: propertyType },
        { label: 'Year Built', value: details?.yearBuilt || 'N/A' },
        { label: 'Lot Size', value: listing.lot?.acres ? `${listing.lot.acres} acres` : listing.lot?.depth && listing.lot?.width ? `${listing.lot.width} x ${listing.lot.depth}` : 'N/A' },
        { label: 'Parking', value: details?.garage || 'N/A' },
        { label: 'Heating', value: details?.heating || 'N/A' },
        { label: 'Cooling', value: details?.airConditioning || 'N/A' },
        { label: 'MLS#', value: listing.mlsNumber },
        { label: 'Status', value: statusLabel },
    ].filter((item) => item.value && item.value !== 'N/A');

    const monthlyEstimate = Math.round(parseInt(listing.listPrice) * 0.004);

    return (
        <>
            <Head title={`${streetAddress} - EcoListing.ca`} />
            <div className="flex min-h-screen flex-col bg-white">
                <Header />

                <div className="mx-auto w-full px-4" style={{ maxWidth: '1280px' }}>

                    {/* Breadcrumb */}
                    <div className="pt-6 pb-4 flex items-center gap-2" style={{ fontSize: '13px', color: '#9ca3af' }}>
                        <Link href="/" className="transition-colors hover:text-gray-700">Home</Link>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        <Link href="/map-search" className="transition-colors hover:text-gray-700">Listings</Link>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        <span style={{ color: '#1A1816' }}>{streetAddress}</span>
                    </div>

                    {/* Title Row */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#1A1816', lineHeight: '36px' }}>{fullAddress}</h1>
                            <div className="mt-2.5 flex items-center gap-3">
                                <span className="rounded-full border border-gray-300 px-3 py-1" style={{ fontSize: '12px', color: '#374151' }}>{propertyType}</span>
                                <span style={{ fontSize: '13px', color: '#6b7280' }}>{address?.city}, {address?.state}</span>
                                {listing.daysOnMarket > 0 && (
                                    <span style={{ fontSize: '13px', color: '#6b7280' }}>{listing.daysOnMarket} days on market</span>
                                )}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50" style={{ width: '40px', height: '40px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" /></svg>
                            </button>
                            <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white transition-colors hover:bg-gray-50" style={{ width: '40px', height: '40px' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                            </button>
                            <button className="flex items-center justify-center rounded-full border border-pink-200 transition-colors hover:bg-pink-50" style={{ width: '40px', height: '40px', backgroundColor: '#fdf2f8' }}>
                                <HeartIcon filled />
                            </button>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    {images.length > 0 ? (
                        <div className="mt-6 flex gap-[17px]" style={{ height: '645px' }}>
                            <div className="relative flex-1 cursor-pointer overflow-hidden rounded-xl" style={{ minWidth: '800px' }} onClick={() => openGallery(0)}>
                                <img src={images[0]} alt="Property main" className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]" />
                                <div className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg px-3 py-2" style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}>
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{images.length} Photos</span>
                                </div>
                            </div>
                            {images.length > 1 && (
                                <div className="flex flex-col justify-between" style={{ width: '318px', flexShrink: 0 }}>
                                    <div className="relative cursor-pointer overflow-hidden rounded-xl" style={{ height: '310px' }} onClick={() => openGallery(1)}>
                                        <img src={images[1]} alt="Property interior" className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]" />
                                    </div>
                                    {images.length > 2 && (
                                        <div className="relative cursor-pointer overflow-hidden rounded-xl" style={{ height: '310px' }} onClick={() => openGallery(2)}>
                                            <img src={images[2]} alt="Property exterior" className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]" />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="mt-6 flex items-center justify-center rounded-xl bg-gray-100" style={{ height: '400px' }}>
                            <div className="text-center">
                                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                                <p className="mt-3" style={{ fontSize: '15px', color: '#9ca3af' }}>No photos available for this listing</p>
                            </div>
                        </div>
                    )}

                    {/* Content + Sidebar */}
                    <div className="mt-8 flex justify-between">
                        <div className="min-w-0" style={{ maxWidth: '55%' }}>

                            {/* Stats */}
                            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1816' }}>{streetAddress}</h2>
                            <div className="mt-3 flex items-center gap-4" style={{ fontSize: '14px', color: '#6b7280' }}>
                                {details?.numBedrooms != null && (
                                    <>
                                        <div className="flex items-center gap-1.5">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 22V9l9-7 9 7v13" /><path d="M9 22V12h6v10" /></svg>
                                            <span>{details.numBedrooms} Beds</span>
                                        </div>
                                        <span className="text-gray-300">|</span>
                                    </>
                                )}
                                {details?.numBathrooms != null && (
                                    <>
                                        <div className="flex items-center gap-1.5">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h16a1 1 0 0 1 1 1v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3a1 1 0 0 1 1-1z" /><path d="M6 12V5a2 2 0 0 1 2-2h3a1 1 0 0 1 1 1v3" /><line x1="4" y1="18" x2="4" y2="21" /><line x1="20" y1="18" x2="20" y2="21" /></svg>
                                            <span>{details.numBathrooms} Baths</span>
                                        </div>
                                        <span className="text-gray-300">|</span>
                                    </>
                                )}
                                {details?.sqft && (
                                    <>
                                        <div className="flex items-center gap-1.5">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="12" y1="3" x2="12" y2="21" /></svg>
                                            <span>{details.sqft} sqft</span>
                                        </div>
                                        <span className="text-gray-300">|</span>
                                    </>
                                )}
                                {details?.yearBuilt && (
                                    <div className="flex items-center gap-1.5">
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                                        <span>Built {details.yearBuilt}</span>
                                    </div>
                                )}
                            </div>

                            {/* Agent info */}
                            <div className="mt-6 flex items-center gap-8">
                                <div className="flex items-center gap-3">
                                    <span style={{ fontSize: '13px', color: '#6b7280' }}>Listed by:</span>
                                    <div className="flex items-center justify-center rounded-full" style={{ width: '40px', height: '40px', backgroundColor: '#1A1816' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>{agentInitials}</span>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>{agentName}</div>
                                        {brokerageName && <div style={{ fontSize: '12px', color: '#6b7280' }}>{brokerageName}</div>}
                                    </div>
                                </div>
                            </div>

                            {/* Key features */}
                            <div className="mt-8 grid grid-cols-3 gap-6">
                                <div>
                                    <div className="flex items-center justify-center rounded-2xl" style={{ width: '48px', height: '48px', backgroundColor: '#f5f5f4' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                                    </div>
                                    <div className="mt-3" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>{propertyType}</div>
                                    <div className="mt-1" style={{ fontSize: '13px', color: '#6b7280', lineHeight: '20px' }}>{address?.neighborhood || address?.area || address?.city}</div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-center rounded-2xl" style={{ width: '48px', height: '48px', backgroundColor: '#f5f5f4' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                                    </div>
                                    <div className="mt-3" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>MLS Verified</div>
                                    <div className="mt-1" style={{ fontSize: '13px', color: '#6b7280', lineHeight: '20px' }}>MLS# {listing.mlsNumber}</div>
                                </div>
                                <div>
                                    <div className="flex items-center justify-center rounded-2xl" style={{ width: '48px', height: '48px', backgroundColor: '#f5f5f4' }}>
                                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                                    </div>
                                    <div className="mt-3" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>{listing.daysOnMarket} Days on Market</div>
                                    <div className="mt-1" style={{ fontSize: '13px', color: '#6b7280', lineHeight: '20px' }}>Listed {listing.listDate ? new Date(listing.listDate).toLocaleDateString('en-CA', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recently'}</div>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="mt-8 flex items-center gap-3">
                                <button onClick={() => setActiveTab('overview')} className="rounded-full px-5 py-2 transition-colors" style={{ backgroundColor: activeTab === 'overview' ? '#1A1816' : 'transparent', color: activeTab === 'overview' ? 'white' : '#6b7280', fontSize: '14px', fontWeight: 500 }}>Overview</button>
                                <button onClick={() => setActiveTab('reviews')} className="rounded-full px-5 py-2 transition-colors" style={{ backgroundColor: activeTab === 'reviews' ? '#1A1816' : 'transparent', color: activeTab === 'reviews' ? 'white' : '#6b7280', fontSize: '14px', fontWeight: 500 }}>Details</button>
                            </div>

                            {/* Description */}
                            {description && (
                                <div className="mt-6" style={{ fontSize: '15px', color: '#374151', lineHeight: '26px' }}>
                                    <p>{descExpanded ? description : description.slice(0, 500) + (description.length > 500 ? '...' : '')}</p>
                                    {description.length > 500 && (
                                        <button onClick={() => setDescExpanded(!descExpanded)} className="mt-3 underline" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>
                                            {descExpanded ? 'Show Less' : 'Read More'}
                                        </button>
                                    )}
                                </div>
                            )}

                            {/* Property Details grid */}
                            <div className="mt-10">
                                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>Property Details</h3>
                                <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-4">
                                    {propertyDetails.map((item) => (
                                        <div key={item.label} className="flex justify-between border-b border-gray-100 pb-3">
                                            <span style={{ fontSize: '13px', color: '#6b7280' }}>{item.label}</span>
                                            <span style={{ fontSize: '14px', fontWeight: 500, color: '#1A1816' }}>{item.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="shrink-0" style={{ width: '318px' }}>
                            <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="flex items-baseline gap-1.5">
                                    <span style={{ fontSize: '28px', fontWeight: 700, color: '#1A1816' }}>{formatPrice(listing.listPrice)}</span>
                                    <span style={{ fontSize: '13px', color: '#9ca3af' }}>/{listing.type === 'lease' ? 'month' : 'Asking Price'}</span>
                                </div>
                                <div className="mt-4 border-t border-gray-200" />
                                <div className="mt-4">
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#1A1816' }}>{propertyType} for {listing.type === 'lease' ? 'Lease' : 'Sale'}</span>
                                    <span style={{ fontSize: '15px', color: '#6b7280' }}> in {address?.city}, {address?.state}</span>
                                </div>
                                <div className="mt-1" style={{ fontSize: '13px', color: '#9ca3af' }}>Listed {listing.daysOnMarket} days ago</div>
                                <div className="mt-4 border-t border-gray-200" />

                                <div className="mt-4">
                                    <label style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>Schedule a Viewing</label>
                                    <div className="mt-3 grid grid-cols-2 gap-3">
                                        <input type="date" className="w-full rounded-xl border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300" style={{ height: '48px' }} />
                                        <input type="time" className="w-full rounded-xl border border-gray-300 px-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300" style={{ height: '48px' }} />
                                    </div>
                                    <textarea rows={3} className="mt-3 w-full rounded-xl border border-gray-300 px-3 py-3 text-sm focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300" placeholder="I'm interested in this property..." />
                                </div>

                                <button className="mt-4 w-full rounded-xl text-white transition-opacity hover:opacity-90" style={{ height: '48px', backgroundColor: '#1A1816', fontSize: '14px', fontWeight: 600 }}>Request Viewing</button>
                                <div className="mt-2 text-center" style={{ fontSize: '12px', color: '#9ca3af' }}>You won't be charged</div>

                                {listing.type === 'sale' && monthlyEstimate > 0 && (
                                    <>
                                        <div className="mt-6 border-t border-gray-200" />
                                        <div className="mt-5">
                                            <div style={{ fontSize: '13px', color: '#6b7280' }}>Estimated Monthly Payment</div>
                                            <div className="mt-1" style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>{formatPrice(monthlyEstimate)}/mo</div>
                                            {listing.taxes?.annualAmount && (
                                                <div className="mt-3 flex items-center justify-between">
                                                    <span style={{ fontSize: '13px', color: '#6b7280' }}>Property Tax (Annual)</span>
                                                    <span style={{ fontSize: '13px', fontWeight: 500, color: '#1A1816' }}>{formatPrice(listing.taxes.annualAmount)}</span>
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Similar Listings */}
                    {similarListings.length > 0 && (
                        <div className="mt-16 mb-16">
                            <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#1A1816' }}>Similar Properties Nearby</h2>
                            <div className="mt-6 grid grid-cols-3 gap-6">
                                {similarListings.map((sl) => {
                                    const slAddress = sl.address ? formatFullAddress(sl.address) : '';
                                    const slImage = sl.images?.[0] || '';
                                    return (
                                        <Link key={sl.mlsNumber} href={`/property/${sl.mlsNumber}`} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg">
                                            <div className="relative" style={{ height: '192px' }}>
                                                {slImage ? (
                                                    <img src={slImage} alt={slAddress} className="h-full w-full object-cover" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center bg-gray-100"><span className="text-gray-400">No Image</span></div>
                                                )}
                                                <div className="absolute left-3 top-3 rounded-full px-3 py-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', fontSize: '11px', fontWeight: 600, color: 'white' }}>
                                                    {sl.daysOnMarket <= 1 ? '1 day ago' : `${sl.daysOnMarket} days ago`}
                                                </div>
                                                <button className="absolute right-3 top-3 flex items-center justify-center rounded-full transition-colors hover:bg-black/30" style={{ width: '34px', height: '34px', backgroundColor: 'rgba(0,0,0,0.25)' }} onClick={(e) => e.preventDefault()}>
                                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <div style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>{formatPrice(sl.listPrice)}</div>
                                                <div className="mt-1 flex items-center gap-1.5" style={{ fontSize: '13px', color: '#6b7280' }}>
                                                    {sl.details?.numBedrooms != null && <><span style={{ fontWeight: 600, color: '#374151' }}>{sl.details.numBedrooms}</span> bd<span className="text-gray-300">|</span></>}
                                                    {sl.details?.numBathrooms != null && <><span style={{ fontWeight: 600, color: '#374151' }}>{sl.details.numBathrooms}</span> ba<span className="text-gray-300">|</span></>}
                                                    {sl.details?.sqft && <><span style={{ fontWeight: 600, color: '#374151' }}>{sl.details.sqft}</span> sqft</>}
                                                </div>
                                                <div className="mt-1.5 truncate" style={{ fontSize: '13px', color: '#6b7280' }}>{slAddress}</div>
                                                <div className="mt-1" style={{ fontSize: '11px', color: '#9ca3af' }}>MLS&reg; {sl.mlsNumber}</div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Spacer before footer */}
                    <div className="pb-16" />
                </div>

                <Footer />
            </div>

            {/* Fullscreen Gallery Modal */}
            {galleryOpen && images.length > 0 && (
                <div className="fixed inset-0 z-50 flex flex-col" style={{ backgroundColor: 'rgba(0, 0, 0, 0.95)' }}>
                    <div className="flex items-center justify-between px-4" style={{ height: '56px', flexShrink: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.9)' }}>
                        <div className="flex flex-col gap-0.5 text-white">
                            <span style={{ fontSize: '14px', fontWeight: 600 }}>{streetAddress}</span>
                            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)' }}>({galleryIndex + 1} of {images.length})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button className="flex items-center justify-center rounded-md border transition-colors hover:bg-white/20" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" /></svg>
                            </button>
                            <button onClick={() => setGalleryOpen(false)} className="flex items-center justify-center rounded-md border transition-colors hover:bg-white/20" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                            </button>
                        </div>
                    </div>

                    <div className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden">
                        <button onClick={prevImage} className="absolute left-3 z-10 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-white" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.9)', top: '50%', transform: 'translateY(-50%)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                        </button>
                        <div className="flex h-full w-full items-center justify-center overflow-hidden px-16">
                            <img src={images[galleryIndex]} alt={`Gallery photo ${galleryIndex + 1}`} className="rounded-lg object-contain" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                        </div>
                        <button onClick={nextImage} className="absolute right-3 z-10 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-white" style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.9)', top: '50%', transform: 'translateY(-50%)' }}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                        </button>
                    </div>

                    <div className="flex items-center gap-2 overflow-x-auto px-4" style={{ height: '80px', flexShrink: 0, borderTop: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(0,0,0,0.9)' }}>
                        {images.map((img, i) => (
                            <button key={i} onClick={() => setGalleryIndex(i)} className="flex-shrink-0 overflow-hidden rounded-md transition-all hover:opacity-90" style={{ width: '80px', height: '60px', opacity: i === galleryIndex ? 1 : 0.7, border: i === galleryIndex ? '2px solid #3b82f6' : '2px solid rgba(255,255,255,0.2)', transform: i === galleryIndex ? 'scale(1.05)' : 'scale(1)' }}>
                                <img src={img} alt={`Thumb ${i + 1}`} className="h-full w-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
