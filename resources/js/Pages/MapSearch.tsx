import { Head, Link, router } from '@inertiajs/react';
import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import Header from '@/Components/Header';
import ListingsMap from '@/Components/ListingsMap';

interface Listing {
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
    map: {
        latitude: number | null;
        longitude: number | null;
    };
    details: {
        numBedrooms: number | null;
        numBathrooms: number | null;
        sqft: string;
        propertyType: string;
        style: string;
    };
    images: string[];
    photoCount: number;
    daysOnMarket: number;
    updatedOn?: string;
}

interface Pagination {
    page: number;
    numPages: number;
    count: number;
    resultsPerPage: number;
}

interface Props {
    listings: Listing[];
    pagination: Pagination;
    filters: Record<string, string>;
}

// ─── Helpers ────────────────────────────────────────────
function formatPrice(price: string | number): string {
    const num = typeof price === 'string' ? parseInt(price, 10) : price;
    if (isNaN(num)) return '$0';
    return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(num);
}

function formatAddress(address: Listing['address']): string {
    const parts = [address.streetNumber, address.streetName, address.streetSuffix].filter(Boolean);
    let street = parts.join(' ');
    if (address.unitNumber) street = `#${address.unitNumber} - ${street}`;
    return [street, address.city, `${address.state} ${address.zip}`].filter(Boolean).join(', ');
}

function getListingImage(listing: Listing): string {
    return listing.images?.[0] || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600';
}

function getPropertyType(listing: Listing): string {
    return listing.details?.propertyType || listing.details?.style || listing.class || 'Residential';
}

// ─── Icons ──────────────────────────────────────────────
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

// ─── Dual Range Slider ──────────────────────────────────
function DualRangeSlider({ min, max, step, valueMin, valueMax, onChange, formatLabel }: {
    min: number; max: number; step: number;
    valueMin: number; valueMax: number;
    onChange: (low: number, high: number) => void;
    formatLabel?: (v: number) => string;
}) {
    const fmt = formatLabel || ((v) => String(v));
    const minRef = useRef<HTMLInputElement>(null);
    const maxRef = useRef<HTMLInputElement>(null);
    const range = max - min || 1;
    const pctMin = ((valueMin - min) / range) * 100;
    const pctMax = ((valueMax - min) / range) * 100;

    return (
        <div className="pt-1 pb-2">
            <div className="relative h-6" style={{ touchAction: 'none' }}>
                {/* Track background */}
                <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gray-200" />
                {/* Active track */}
                <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full" style={{ left: `${pctMin}%`, right: `${100 - pctMax}%`, backgroundColor: '#2563eb' }} />
                {/* Min thumb */}
                <input
                    ref={minRef}
                    type="range" min={min} max={max} step={step} value={valueMin}
                    onChange={(e) => {
                        const v = Number(e.target.value);
                        onChange(Math.min(v, valueMax), valueMax);
                    }}
                    onPointerDown={() => {
                        if (minRef.current) minRef.current.style.zIndex = '5';
                        if (maxRef.current) maxRef.current.style.zIndex = '3';
                    }}
                    className="range-thumb absolute inset-0 w-full appearance-none bg-transparent pointer-events-none"
                    style={{ zIndex: 3 }}
                />
                {/* Max thumb */}
                <input
                    ref={maxRef}
                    type="range" min={min} max={max} step={step} value={valueMax}
                    onChange={(e) => {
                        const v = Number(e.target.value);
                        onChange(valueMin, Math.max(v, valueMin));
                    }}
                    onPointerDown={() => {
                        if (maxRef.current) maxRef.current.style.zIndex = '5';
                        if (minRef.current) minRef.current.style.zIndex = '3';
                    }}
                    className="range-thumb absolute inset-0 w-full appearance-none bg-transparent pointer-events-none"
                    style={{ zIndex: 4 }}
                />
            </div>
            <div className="flex justify-between text-[10px] text-gray-400 mt-0.5">
                <span>{fmt(valueMin)}</span>
                <span>{fmt(valueMax)}</span>
            </div>
        </div>
    );
}

function CloseIcon({ size = 18 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

// ─── Dropdown wrapper ───────────────────────────────────
function FilterDropdown({ label, isOpen, onToggle, hasValue, children }: {
    label: string; isOpen: boolean; onToggle: () => void; hasValue?: boolean; children: React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node) && isOpen) onToggle();
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [isOpen]);

    return (
        <div ref={ref} className="relative">
            <button
                onClick={onToggle}
                className="flex items-center gap-1.5 rounded-xl border bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50"
                style={{
                    height: '40px', fontSize: '13px', fontWeight: 500, whiteSpace: 'nowrap',
                    color: hasValue ? '#2563eb' : '#1A1816',
                    borderColor: isOpen ? '#2563eb' : hasValue ? '#2563eb' : '#d1d5db',
                }}
            >
                {label}
                <ChevronDown />
            </button>
            {isOpen && (
                <div className="absolute left-0 top-full z-50 mt-2 rounded-xl border border-gray-200 bg-white p-4 shadow-xl" style={{ minWidth: '280px' }}>
                    {children}
                </div>
            )}
        </div>
    );
}

// ─── Select component ───────────────────────────────────
function Select({ value, onChange, options, placeholder }: {
    value: string; onChange: (v: string) => void; options: { value: string; label: string }[]; placeholder: string;
}) {
    return (
        <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
            <option value="">{placeholder}</option>
            {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
    );
}

// ─── Listing Card ───────────────────────────────────────
function ListingCard({ listing }: { listing: Listing }) {
    return (
        <Link href={`/property/${listing.mlsNumber}`} className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white transition-shadow hover:shadow-lg block">
            <div className="relative" style={{ height: '180px' }}>
                <img src={getListingImage(listing)} alt={formatAddress(listing.address)} className="h-full w-full object-cover" />
                <div className="absolute left-3 top-3 rounded-full px-3 py-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)', fontSize: '11px', fontWeight: 600, color: 'white' }}>
                    {(() => {
                        const date = listing.listDate || listing.updatedOn;
                        if (!date) return 'New';
                        const diff = Math.floor((Date.now() - new Date(date).getTime()) / 86400000);
                        if (diff <= 0) return 'Today';
                        if (diff === 1) return '1 day ago';
                        if (diff < 30) return `${diff} days ago`;
                        if (diff < 365) return `${Math.floor(diff / 30)} mo ago`;
                        return `${Math.floor(diff / 365)}y ago`;
                    })()}
                </div>
                <button className="absolute right-3 top-3 flex items-center justify-center rounded-full transition-colors hover:bg-black/30" style={{ width: '34px', height: '34px', backgroundColor: 'rgba(0,0,0,0.25)' }} onClick={(e) => e.preventDefault()}>
                    <HeartIcon />
                </button>
            </div>
            <div className="p-3.5">
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>{formatPrice(listing.listPrice)}</div>
                <div className="mt-1 flex items-center gap-1.5" style={{ fontSize: '13px', color: '#6b7280' }}>
                    {listing.details?.numBedrooms != null && (<><span style={{ fontWeight: 600, color: '#374151' }}>{listing.details.numBedrooms}</span> bd<span className="text-gray-300">|</span></>)}
                    {listing.details?.numBathrooms != null && (<><span style={{ fontWeight: 600, color: '#374151' }}>{listing.details.numBathrooms}</span> ba<span className="text-gray-300">|</span></>)}
                    {listing.details?.sqft && (<><span style={{ fontWeight: 600, color: '#374151' }}>{listing.details.sqft}</span> sqft<span className="text-gray-300">|</span></>)}
                    <span>{getPropertyType(listing)}</span>
                </div>
                <div className="mt-1.5 truncate" style={{ fontSize: '13px', color: '#6b7280' }}>{formatAddress(listing.address)}</div>
                <div className="mt-1" style={{ fontSize: '11px', color: '#9ca3af' }}>MLS&reg; {listing.mlsNumber}</div>
            </div>
        </Link>
    );
}

// ─── Price options ──────────────────────────────────────
const priceOptions = [
    { value: '100000', label: '$100,000' }, { value: '200000', label: '$200,000' }, { value: '300000', label: '$300,000' },
    { value: '400000', label: '$400,000' }, { value: '500000', label: '$500,000' }, { value: '600000', label: '$600,000' },
    { value: '750000', label: '$750,000' }, { value: '1000000', label: '$1,000,000' }, { value: '1500000', label: '$1,500,000' },
    { value: '2000000', label: '$2,000,000' }, { value: '3000000', label: '$3,000,000' }, { value: '5000000', label: '$5,000,000' },
];
const bedOptions = [
    { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' },
    { value: '4', label: '4' }, { value: '5', label: '5' },
];
const bathOptions = [
    { value: '1', label: '1' }, { value: '2', label: '2' }, { value: '3', label: '3' }, { value: '4', label: '4' },
];
const propertyTypeMap: { label: string; value: string }[] = [
    { label: 'Houses', value: 'Single Family Residence' },
    { label: 'Apartments / Condos', value: 'Apartment/Condo' },
    { label: 'Townhouses', value: 'Townhouse' },
    { label: 'Half Duplex', value: 'Half Duplex' },
    { label: 'Duplex', value: 'Duplex' },
    { label: 'Manufactured Home', value: 'Manufactured Home' },
];
const sqftOptions = [
    { value: '500', label: '500' }, { value: '750', label: '750' }, { value: '1000', label: '1,000' },
    { value: '1500', label: '1,500' }, { value: '2000', label: '2,000' }, { value: '3000', label: '3,000' },
    { value: '4000', label: '4,000' }, { value: '5000', label: '5,000' },
];
const lotSizeOptions = [
    { value: '2000', label: '2,000 sqft' }, { value: '4000', label: '4,000 sqft' }, { value: '6000', label: '6,000 sqft' },
    { value: '8000', label: '8,000 sqft' }, { value: '10000', label: '10,000 sqft' }, { value: '20000', label: '20,000 sqft' },
    { value: '43560', label: '1 acre' }, { value: '217800', label: '5 acres' },
];
const yearOptions = Array.from({ length: 13 }, (_, i) => {
    const y = String(2025 - i * 5);
    return { value: y, label: y };
});
const features = ['Waterfront', 'View', 'Workshop', 'Suite', 'Pool', 'Fireplace', 'Air Conditioning', 'Balcony', 'Gym / Fitness Room', 'Den'];
const whenListedOptions = [
    { value: '', label: 'Anytime' }, { value: '1', label: 'Last 24 hours' }, { value: '3', label: 'Last 3 days' },
    { value: '7', label: 'Last 7 days' }, { value: '14', label: 'Last 14 days' }, { value: '30', label: 'Last 30 days' },
];

// ─── All Filters Modal ─────────────────────────────────
function AllFiltersModal({ isOpen, onClose, filters, onApply }: {
    isOpen: boolean; onClose: () => void; filters: Record<string, string>;
    onApply: (f: Record<string, string>) => void;
}) {
    const [local, setLocal] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) setLocal({ ...filters });
    }, [isOpen]);

    const set = (key: string, val: string) => setLocal((p) => ({ ...p, [key]: val }));
    const toggle = (key: string) => setLocal((p) => ({ ...p, [key]: p[key] === '1' ? '' : '1' }));
    const toggleType = (apiValues: string) => {
        const current = (local.style || '').split(',').filter(Boolean);
        const vals = apiValues.split(',');
        const allPresent = vals.every((v) => current.includes(v));
        const next = allPresent
            ? current.filter((x) => !vals.includes(x))
            : [...current, ...vals.filter((v) => !current.includes(v))];
        set('style', next.join(','));
    };
    const hasType = (apiValues: string) => {
        const current = (local.style || '').split(',').filter(Boolean);
        return apiValues.split(',').every((v) => current.includes(v));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-start justify-center bg-black/40 pt-8 pb-8" onClick={onClose}>
            <div className="relative mx-4 flex max-h-full w-full max-w-[1100px] flex-col overflow-hidden rounded-2xl bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className="flex shrink-0 items-center justify-between border-b border-gray-200 px-6 py-4">
                    <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>All Filters</h2>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => { onApply(local); onClose(); }}
                            className="rounded-xl px-5 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#2563eb' }}
                        >
                            SAVE SEARCH
                        </button>
                        <button onClick={onClose} className="rounded-full p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
                            <CloseIcon size={22} />
                        </button>
                    </div>
                </div>

                {/* Body - scrollable 3-column grid */}
                <div className="flex-1 overflow-y-auto p-6">
                    <div className="grid grid-cols-3 gap-6">
                        {/* Column 1: Property Types + Features + Amenities */}
                        <div className="space-y-6">
                            <div className="rounded-xl border border-gray-200 p-4">
                                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-800">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                    Property Types
                                </h3>
                                <div className="space-y-2.5">
                                    {propertyTypeMap.map((t) => (
                                        <label key={t.value} className="flex cursor-pointer items-center gap-2.5">
                                            <input type="checkbox" checked={hasType(t.value)} onChange={() => toggleType(t.value)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">{t.label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-4">
                                <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-gray-800">Features</h3>
                                <div className="grid grid-cols-2 gap-2.5">
                                    {features.map((f) => (
                                        <label key={f} className="flex cursor-pointer items-center gap-2">
                                            <input type="checkbox" checked={local[`feat_${f}`] === '1'} onChange={() => toggle(`feat_${f}`)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">{f}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Pricing & Dates */}
                        <div className="space-y-6">
                            <div className="rounded-xl border border-gray-200 p-4">
                                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-800">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                    Pricing & Dates
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-600">Price Range</label>
                                        <div className="flex gap-2">
                                            <Select value={local.minPrice || ''} onChange={(v) => set('minPrice', v)} options={priceOptions} placeholder="Min" />
                                            <Select value={local.maxPrice || ''} onChange={(v) => set('maxPrice', v)} options={priceOptions} placeholder="Max" />
                                        </div>
                                        <DualRangeSlider
                                            min={0} max={5000000} step={50000}
                                            valueMin={local.minPrice ? Number(local.minPrice) : 0}
                                            valueMax={local.maxPrice ? Number(local.maxPrice) : 5000000}
                                            onChange={(low, high) => {
                                                set('minPrice', low > 0 ? String(low) : '');
                                                set('maxPrice', high < 5000000 ? String(high) : '');
                                            }}
                                            formatLabel={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-600">Max Maint. Fee</label>
                                        <Select value={local.maxMaintFee || ''} onChange={(v) => set('maxMaintFee', v)}
                                            options={[{ value: '200', label: '$200' }, { value: '400', label: '$400' }, { value: '600', label: '$600' }, { value: '800', label: '$800' }, { value: '1000', label: '$1,000' }]}
                                            placeholder="No Max" />
                                    </div>
                                    <div className="border-t border-gray-100 pt-4">
                                        <label className="flex cursor-pointer items-center gap-2.5">
                                            <input type="checkbox" checked={local.priceReduced === '1'} onChange={() => toggle('priceReduced')} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">Price Reduced</span>
                                        </label>
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-600">When Listed</label>
                                        <Select value={local.daysOnMarket || ''} onChange={(v) => set('daysOnMarket', v)} options={whenListedOptions} placeholder="Anytime" />
                                    </div>
                                    <div>
                                        <label className="flex cursor-pointer items-center gap-2.5">
                                            <input type="checkbox" checked={local.virtualTour === '1'} onChange={() => toggle('virtualTour')} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">Virtual Tour</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Column 3: Home Info + Lot Info */}
                        <div className="space-y-6">
                            <div className="rounded-xl border border-gray-200 p-4">
                                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-800">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                                    Home Info
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-600">Beds</label>
                                        <Select value={local.bedrooms || ''} onChange={(v) => set('bedrooms', v)} options={bedOptions} placeholder="Any Number" />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-600">Baths</label>
                                        <Select value={local.bathrooms || ''} onChange={(v) => set('bathrooms', v)} options={bathOptions} placeholder="Any Number" />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-600">Built Area (sq.ft.)</label>
                                        <div className="flex gap-2">
                                            <Select value={local.minSqft || ''} onChange={(v) => set('minSqft', v)} options={sqftOptions} placeholder="Min" />
                                            <Select value={local.maxSqft || ''} onChange={(v) => set('maxSqft', v)} options={sqftOptions} placeholder="Max" />
                                        </div>
                                        <DualRangeSlider
                                            min={0} max={5000} step={100}
                                            valueMin={local.minSqft ? Number(local.minSqft) : 0}
                                            valueMax={local.maxSqft ? Number(local.maxSqft) : 5000}
                                            onChange={(low, high) => {
                                                set('minSqft', low > 0 ? String(low) : '');
                                                set('maxSqft', high < 5000 ? String(high) : '');
                                            }}
                                            formatLabel={(v) => v >= 1000 ? `${(v / 1000).toFixed(1)}k` : String(v)}
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-1.5 block text-xs font-medium text-gray-600">Built Year</label>
                                        <div className="flex gap-2">
                                            <Select value={local.minYearBuilt || ''} onChange={(v) => set('minYearBuilt', v)} options={yearOptions} placeholder="Min" />
                                            <Select value={local.maxYearBuilt || ''} onChange={(v) => set('maxYearBuilt', v)} options={yearOptions} placeholder="Max" />
                                        </div>
                                        <DualRangeSlider
                                            min={1960} max={2025} step={5}
                                            valueMin={local.minYearBuilt ? Number(local.minYearBuilt) : 1960}
                                            valueMax={local.maxYearBuilt ? Number(local.maxYearBuilt) : 2025}
                                            onChange={(low, high) => {
                                                set('minYearBuilt', low > 1960 ? String(low) : '');
                                                set('maxYearBuilt', high < 2025 ? String(high) : '');
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray-200 p-4">
                                <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-gray-800">
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
                                    Lot Info
                                </h3>
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Lot Area</label>
                                    <div className="flex gap-2">
                                        <Select value={local.minLotSize || ''} onChange={(v) => set('minLotSize', v)} options={lotSizeOptions} placeholder="Min" />
                                        <Select value={local.maxLotSize || ''} onChange={(v) => set('maxLotSize', v)} options={lotSizeOptions} placeholder="Max" />
                                    </div>
                                    <DualRangeSlider
                                        min={0} max={10000} step={10}
                                        valueMin={local.minLotSize ? Number(local.minLotSize) : 0}
                                        valueMax={local.maxLotSize ? Number(local.maxLotSize) : 10000}
                                        onChange={(low, high) => {
                                            set('minLotSize', low > 0 ? String(low) : '');
                                            set('maxLotSize', high < 10000 ? String(high) : '');
                                        }}
                                        formatLabel={(v) => `${v.toLocaleString()} sqft`}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="flex shrink-0 items-center justify-between border-t border-gray-200 px-6 py-3">
                    <button onClick={() => setLocal({})} className="text-sm font-medium text-gray-500 hover:text-gray-700">Clear All</button>
                    <button
                        onClick={() => { onApply(local); onClose(); }}
                        className="rounded-xl px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                        style={{ backgroundColor: '#1A1816' }}
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

interface AutocompleteItem {
    name: string;
    type: string;
    address: { state: string; country: string; city: string; area: string; neighborhood: string };
    map: { latitude: string; longitude: string };
}

// ─── Main Component ─────────────────────────────────────
export default function MapSearch({ listings = [], pagination, filters = {} }: Props) {
    const [activeTab, setActiveTab] = useState<'for-sale' | 'for-lease'>(filters.type === 'lease' ? 'for-lease' : 'for-sale');
    const [searchQuery, setSearchQuery] = useState(filters.city || filters.area || filters.streetAddress || '');
    const [searchType, setSearchType] = useState<'city' | 'area' | 'address'>(
        filters.streetAddress ? 'address' : filters.area ? 'area' : 'city'
    );
    const [showSearchDropdown, setShowSearchDropdown] = useState(false);
    const searchDropdownRef = useRef<HTMLDivElement>(null);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [showAllFilters, setShowAllFilters] = useState(false);

    // Local filter state for dropdowns
    const [minPrice, setMinPrice] = useState(filters.minPrice || '');
    const [maxPrice, setMaxPrice] = useState(filters.maxPrice || '');
    const [minBeds, setMinBeds] = useState(filters.bedrooms || '');
    const [minBaths, setMinBaths] = useState(filters.bathrooms || '');
    const [propType, setPropType] = useState(filters.style || '');
    const [minLot, setMinLot] = useState(filters.minLotSize || '');
    const [maxLot, setMaxLot] = useState(filters.maxLotSize || '');
    const [panelPage, setPanelPage] = useState(1);
    const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
    const PANEL_PAGE_SIZE = 20;

    // Autocomplete state
    const [suggestions, setSuggestions] = useState<AutocompleteItem[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [activeSuggestion, setActiveSuggestion] = useState(-1);
    const autocompleteTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const searchWrapperRef = useRef<HTMLDivElement>(null);

    // Close suggestions/dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchWrapperRef.current && !searchWrapperRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
                setShowSearchDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchSuggestions = useCallback((query: string, type: string) => {
        if (autocompleteTimer.current) clearTimeout(autocompleteTimer.current);
        // Only fetch autocomplete for city/area searches
        if (type !== 'city' || query.length < 3) {
            setSuggestions([]);
            setShowSuggestions(false);
            return;
        }
        autocompleteTimer.current = setTimeout(async () => {
            try {
                const { data } = await axios.get('/api/locations/autocomplete', { params: { query, limit: 8 } });
                if (data.success && data.data?.locations) {
                    setSuggestions(data.data.locations);
                    setShowSuggestions(true);
                    setActiveSuggestion(-1);
                }
            } catch {
                setSuggestions([]);
            }
        }, 250);
    }, []);

    const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchQuery(val);
        fetchSuggestions(val, searchType);
    };

    const buildFilters = (overrides: Record<string, string | undefined> = {}) => {
        // Don't carry forward mapBounds/polygon from previous filters — they are only
        // set explicitly via overrides (bounds change or polygon draw).
        const { mapBounds: _mb, polygon: _pg, ...persistedFilters } = filters;
        const f: Record<string, string | undefined> = {
            ...persistedFilters,
            city: searchType === 'city' ? (searchQuery || undefined) : undefined,
            area: searchType === 'area' ? (searchQuery || undefined) : undefined,
            streetAddress: searchType === 'address' ? (searchQuery || undefined) : undefined,
            type: activeTab === 'for-lease' ? 'lease' : 'sale',
            minPrice: minPrice || undefined,
            maxPrice: maxPrice || undefined,
            bedrooms: minBeds || undefined,
            bathrooms: minBaths || undefined,
            style: propType || undefined,
            minLotSize: minLot || undefined,
            maxLotSize: maxLot || undefined,
            ...overrides,
        };
        // Clean empty values
        return Object.fromEntries(Object.entries(f).filter(([, v]) => v !== undefined && v !== '')) as Record<string, string>;
    };

    const doSearch = (overrides: Record<string, string | undefined> = {}) => {
        setPanelPage(1);
        router.get('/map-search', buildFilters(overrides), { preserveState: true });
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setShowSuggestions(false);
        setShowSearchDropdown(false);
        const q = searchQuery.trim() || undefined;
        const overrides: Record<string, string | undefined> = {
            page: undefined,
            city: searchType === 'city' ? q : undefined,
            area: searchType === 'area' ? q : undefined,
            streetAddress: searchType === 'address' ? q : undefined,
        };
        doSearch(overrides);
    };

    const handleSuggestionSelect = (item: AutocompleteItem) => {
        setShowSuggestions(false);
        setSuggestions([]);

        const overrides: Record<string, string | undefined> = { page: undefined, mapBounds: undefined, polygon: undefined };
        if (item.type === 'city') {
            setSearchQuery(item.name);
            setSearchType('city');
            overrides.city = item.name;
            overrides.area = undefined;
        } else if (item.type === 'area') {
            setSearchQuery(item.name);
            setSearchType('area');
            overrides.area = item.name;
            overrides.city = undefined;
        } else if (item.type === 'neighborhood') {
            setSearchQuery(item.address.city);
            setSearchType('city');
            overrides.city = item.address.city;
            overrides.area = undefined;
        }
        doSearch(overrides);
    };

    const handleSearchKeyDown = (e: React.KeyboardEvent) => {
        if (!showSuggestions || suggestions.length === 0) return;
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveSuggestion((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
        } else if (e.key === 'Enter' && activeSuggestion >= 0) {
            e.preventDefault();
            handleSuggestionSelect(suggestions[activeSuggestion]);
        } else if (e.key === 'Escape') {
            setShowSuggestions(false);
        }
    };

    const handleTabChange = (tab: 'for-sale' | 'for-lease') => {
        setActiveTab(tab);
        doSearch({ type: tab === 'for-lease' ? 'lease' : 'sale', page: undefined });
    };

    const handlePageChange = (page: number) => {
        doSearch({ page: String(page) });
    };

    const handlePolygonSearch = (coordinates: { lat: number; lng: number }[]) => {
        const polygonCoords = coordinates.map((c) => `${c.lng},${c.lat}`).join('|');
        doSearch({ polygon: polygonCoords, mapBounds: undefined, page: undefined });
    };

    const handlePolygonReset = () => {
        doSearch({ polygon: undefined, page: undefined, mapBounds: undefined });
    };

    const handleBoundsChange = (bounds: { swLat: number; swLng: number; neLat: number; neLng: number }) => {
        // Don't auto-search by bounds if user has drawn a polygon
        if (filters.polygon) return;
        // Clamp coordinates to valid ranges (Leaflet can produce wrapped values when zoomed out)
        const clampLat = (v: number) => Math.max(-90, Math.min(90, v));
        const wrapLng = (v: number) => ((((v + 180) % 360) + 360) % 360) - 180;
        const swLat = clampLat(bounds.swLat);
        const swLng = wrapLng(bounds.swLng);
        const neLat = clampLat(bounds.neLat);
        const neLng = wrapLng(bounds.neLng);
        const mapBounds = `${swLat},${swLng},${neLat},${neLng}`;
        doSearch({ mapBounds, page: undefined });
    };

    const applyDropdownAndClose = () => {
        setOpenDropdown(null);
        doSearch({ page: undefined });
    };

    const handleAllFiltersApply = (f: Record<string, string>) => {
        // Update local state from modal
        setMinPrice(f.minPrice || '');
        setMaxPrice(f.maxPrice || '');
        setMinBeds(f.bedrooms || '');
        setMinBaths(f.bathrooms || '');
        setPropType(f.style || '');
        setMinLot(f.minLotSize || '');
        setMaxLot(f.maxLotSize || '');

        // Build clean filter params — strip feat_*, priceReduced, virtualTour (UI-only keys)
        const apiFilters: Record<string, string | undefined> = {
            city: searchType === 'city' ? (searchQuery || undefined) : undefined,
            area: searchType === 'area' ? (searchQuery || undefined) : undefined,
            type: activeTab === 'for-lease' ? 'lease' : 'sale',
            minPrice: f.minPrice || undefined,
            maxPrice: f.maxPrice || undefined,
            bedrooms: f.bedrooms || undefined,
            bathrooms: f.bathrooms || undefined,
            style: f.style || undefined,
            minSqft: f.minSqft || undefined,
            maxSqft: f.maxSqft || undefined,
            minLotSize: f.minLotSize || undefined,
            maxLotSize: f.maxLotSize || undefined,
            minYearBuilt: f.minYearBuilt || undefined,
            maxYearBuilt: f.maxYearBuilt || undefined,
            maxMaintFee: f.maxMaintFee || undefined,
            daysOnMarket: f.daysOnMarket || undefined,
        };
        const clean = Object.fromEntries(Object.entries(apiFilters).filter(([, v]) => v !== undefined && v !== ''));
        setPanelPage(1);
        router.get('/map-search', clean, { preserveState: true });
    };

    const priceLabel = (minPrice && Number(minPrice) > 0) || (maxPrice && Number(maxPrice) > 0)
        ? `${minPrice && Number(minPrice) > 0 ? formatPrice(minPrice) : '$0'} – ${maxPrice && Number(maxPrice) > 0 ? formatPrice(maxPrice) : 'Any'}`
        : 'Price';
    const bedsLabel = minBeds || minBaths
        ? `${minBeds ? minBeds + ' bd' : ''}${minBeds && minBaths ? ', ' : ''}${minBaths ? minBaths + ' ba' : ''}`
        : 'Beds & Baths';

    return (
        <>
            <Head title="Map Search - EcoListing.ca" />
            <div className="flex h-screen flex-col bg-white">
                <Header />

                {/* Search Bar */}
                <div className="relative z-[2000] shrink-0 border-b border-gray-200 bg-white py-2.5">
                    <div className="mx-auto flex items-center gap-2 px-4" style={{ maxWidth: '1408px' }}>
                        {/* Search input with category dropdown + autocomplete */}
                        <div ref={searchWrapperRef} className="relative flex-1" style={{ maxWidth: '420px' }}>
                            <form onSubmit={handleSearch} className="relative flex">
                                {/* Search category selector */}
                                <div ref={searchDropdownRef} className="relative">
                                    <button
                                        type="button"
                                        onClick={() => setShowSearchDropdown(!showSearchDropdown)}
                                        className="flex items-center gap-1 rounded-l-xl border border-r-0 border-gray-300 bg-gray-50 px-3 text-xs font-medium text-gray-600 transition-colors hover:bg-gray-100"
                                        style={{ height: '40px', minWidth: '90px' }}
                                    >
                                        <span>{searchType === 'city' ? 'City' : searchType === 'area' ? 'Area' : 'Address'}</span>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
                                    </button>
                                    {showSearchDropdown && (
                                        <div className="absolute left-0 top-full z-[3000] mt-1 w-44 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                                            {([
                                                { key: 'city', label: 'City / Neighborhood', icon: 'M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16' },
                                                { key: 'address', label: 'Street Address', icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 10h.01' },
                                            ] as { key: typeof searchType; label: string; icon: string }[]).map((opt) => (
                                                <button
                                                    key={opt.key}
                                                    type="button"
                                                    className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition-colors ${searchType === opt.key ? 'bg-gray-100 font-medium text-gray-900' : 'text-gray-700 hover:bg-gray-50'}`}
                                                    onClick={() => {
                                                        setSearchType(opt.key);
                                                        setShowSearchDropdown(false);
                                                        setSearchQuery('');
                                                        setSuggestions([]);
                                                        setShowSuggestions(false);
                                                    }}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={opt.icon}/></svg>
                                                    {opt.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                {/* Search input */}
                                <div className="relative flex-1">
                                    <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                        <SearchIcon />
                                    </div>
                                    <input
                                        type="text"
                                        placeholder={
                                            searchType === 'city' ? 'Search BC city, neighborhood...'
                                            : searchType === 'address' ? 'Search by street address...'
                                            : 'Search area...'
                                        }
                                        value={searchQuery}
                                        onChange={handleSearchInputChange}
                                        onKeyDown={handleSearchKeyDown}
                                        onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
                                        className="w-full rounded-r-xl border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm transition-colors focus:border-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-300"
                                        style={{ height: '40px', fontSize: '14px' }}
                                        autoComplete="off"
                                    />
                                </div>
                            </form>
                            {showSuggestions && suggestions.length > 0 && (
                                <div className="absolute left-0 right-0 top-full z-[3000] mt-1 overflow-hidden rounded-xl border border-gray-200 bg-white py-1 shadow-lg">
                                    {suggestions.map((item, idx) => {
                                        const subtitle = item.type === 'neighborhood'
                                            ? `${item.address.city}, ${item.address.state}`
                                            : item.type === 'area'
                                                ? item.address.state
                                                : item.address.area
                                                    ? `${item.address.area}, ${item.address.state}`
                                                    : item.address.state;
                                        const typeLabel = item.type.charAt(0).toUpperCase() + item.type.slice(1);
                                        return (
                                            <button
                                                key={item.name + item.type + idx}
                                                type="button"
                                                className={`flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors ${
                                                    idx === activeSuggestion ? 'bg-gray-100' : 'hover:bg-gray-50'
                                                }`}
                                                onMouseEnter={() => setActiveSuggestion(idx)}
                                                onClick={() => handleSuggestionSelect(item)}
                                            >
                                                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                                        <circle cx="12" cy="10" r="3" />
                                                    </svg>
                                                </div>
                                                <div className="min-w-0 flex-1">
                                                    <div className="truncate font-medium text-gray-900">{item.name}</div>
                                                    <div className="truncate text-xs text-gray-500">{subtitle}</div>
                                                </div>
                                                <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-500">
                                                    {typeLabel}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        {/* Price dropdown */}
                        <FilterDropdown label={priceLabel} isOpen={openDropdown === 'price'} onToggle={() => setOpenDropdown(openDropdown === 'price' ? null : 'price')} hasValue={!!(minPrice || maxPrice)}>
                            <div className="space-y-3">
                                <label className="block text-xs font-medium text-gray-600">Price Range</label>
                                <div className="flex gap-2">
                                    <Select value={minPrice} onChange={setMinPrice} options={priceOptions} placeholder="Min" />
                                    <Select value={maxPrice} onChange={setMaxPrice} options={priceOptions} placeholder="Max" />
                                </div>
                                <DualRangeSlider
                                    min={0} max={5000000} step={50000}
                                    valueMin={minPrice ? Number(minPrice) : 0}
                                    valueMax={maxPrice ? Number(maxPrice) : 5000000}
                                    onChange={(low, high) => {
                                        setMinPrice(low > 0 ? String(low) : '');
                                        setMaxPrice(high > 0 && high < 5000000 ? String(high) : '');
                                    }}
                                    formatLabel={(v) => v >= 1000000 ? `$${(v / 1000000).toFixed(1)}M` : `$${(v / 1000).toFixed(0)}k`}
                                />
                                <div className="flex justify-end gap-2 pt-1">
                                    <button onClick={() => { setMinPrice(''); setMaxPrice(''); }} className="text-xs text-gray-500 hover:text-gray-700">Clear</button>
                                    <button onClick={applyDropdownAndClose} className="rounded-lg bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800">Apply</button>
                                </div>
                            </div>
                        </FilterDropdown>

                        {/* Beds & Baths dropdown */}
                        <FilterDropdown label={bedsLabel} isOpen={openDropdown === 'beds'} onToggle={() => setOpenDropdown(openDropdown === 'beds' ? null : 'beds')} hasValue={!!(minBeds || minBaths)}>
                            <div className="space-y-3">
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Bedrooms</label>
                                    <div className="flex gap-1.5">
                                        {bedOptions.map((o) => (
                                            <button key={o.value} onClick={() => setMinBeds(minBeds === o.value ? '' : o.value)}
                                                className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                                                style={{ backgroundColor: minBeds === o.value ? '#1e293b' : 'white', color: minBeds === o.value ? 'white' : '#374151', borderColor: minBeds === o.value ? '#1e293b' : '#d1d5db' }}
                                            >{o.label}</button>
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-xs font-medium text-gray-600">Bathrooms</label>
                                    <div className="flex gap-1.5">
                                        {bathOptions.map((o) => (
                                            <button key={o.value} onClick={() => setMinBaths(minBaths === o.value ? '' : o.value)}
                                                className="rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors"
                                                style={{ backgroundColor: minBaths === o.value ? '#1e293b' : 'white', color: minBaths === o.value ? 'white' : '#374151', borderColor: minBaths === o.value ? '#1e293b' : '#d1d5db' }}
                                            >{o.label}</button>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex justify-end gap-2 pt-1">
                                    <button onClick={() => { setMinBeds(''); setMinBaths(''); }} className="text-xs text-gray-500 hover:text-gray-700">Clear</button>
                                    <button onClick={applyDropdownAndClose} className="rounded-lg bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800">Apply</button>
                                </div>
                            </div>
                        </FilterDropdown>

                        {/* Type dropdown */}
                        <FilterDropdown label={propType ? propertyTypeMap.find(p => propType.split(',').some(v => p.value.split(',').includes(v)))?.label || 'Type' : 'Type'} isOpen={openDropdown === 'type'} onToggle={() => setOpenDropdown(openDropdown === 'type' ? null : 'type')} hasValue={!!propType}>
                            <div className="space-y-1">
                                {propertyTypeMap.map((t) => {
                                    const currentVals = propType.split(',').filter(Boolean);
                                    const typeVals = t.value.split(',');
                                    const checked = typeVals.every(v => currentVals.includes(v));
                                    return (
                                        <label key={t.value} className="flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 hover:bg-gray-50">
                                            <input type="checkbox" checked={checked} onChange={() => {
                                                const next = checked
                                                    ? currentVals.filter(x => !typeVals.includes(x))
                                                    : [...currentVals, ...typeVals.filter(v => !currentVals.includes(v))];
                                                setPropType(next.join(','));
                                            }} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="text-sm text-gray-700">{t.label}</span>
                                        </label>
                                    );
                                })}
                                <div className="flex justify-end gap-2 border-t border-gray-100 pt-2 mt-2">
                                    <button onClick={() => setPropType('')} className="text-xs text-gray-500 hover:text-gray-700">Clear</button>
                                    <button onClick={applyDropdownAndClose} className="rounded-lg bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800">Apply</button>
                                </div>
                            </div>
                        </FilterDropdown>

                        {/* Land Size dropdown */}
                        <FilterDropdown label="Land Size" isOpen={openDropdown === 'land'} onToggle={() => setOpenDropdown(openDropdown === 'land' ? null : 'land')} hasValue={!!(minLot || maxLot)}>
                            <div className="space-y-3">
                                <label className="block text-xs font-medium text-gray-600">Lot Size</label>
                                <div className="flex gap-2">
                                    <Select value={minLot} onChange={setMinLot} options={lotSizeOptions} placeholder="Min" />
                                    <Select value={maxLot} onChange={setMaxLot} options={lotSizeOptions} placeholder="Max" />
                                </div>
                                <DualRangeSlider
                                    min={0} max={10000} step={10}
                                    valueMin={minLot ? Number(minLot) : 0}
                                    valueMax={maxLot ? Number(maxLot) : 10000}
                                    onChange={(low, high) => {
                                        setMinLot(low > 0 ? String(low) : '');
                                        setMaxLot(high < 10000 ? String(high) : '');
                                    }}
                                    formatLabel={(v) => `${v.toLocaleString()} sqft`}
                                />
                                <div className="flex justify-end gap-2 pt-1">
                                    <button onClick={() => { setMinLot(''); setMaxLot(''); }} className="text-xs text-gray-500 hover:text-gray-700">Clear</button>
                                    <button onClick={applyDropdownAndClose} className="rounded-lg bg-gray-900 px-4 py-1.5 text-xs font-semibold text-white hover:bg-gray-800">Apply</button>
                                </div>
                            </div>
                        </FilterDropdown>

                        {/* All Filters button */}
                        <button
                            onClick={() => setShowAllFilters(true)}
                            className="flex items-center gap-1.5 rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm transition-colors hover:bg-gray-50"
                            style={{ height: '40px', fontSize: '13px', fontWeight: 500, color: '#1A1816', whiteSpace: 'nowrap' }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="20" y2="18" />
                                <circle cx="8" cy="6" r="1.5" fill="currentColor" /><circle cx="16" cy="12" r="1.5" fill="currentColor" /><circle cx="10" cy="18" r="1.5" fill="currentColor" />
                            </svg>
                            Filters
                        </button>

                        <div className="flex-1" />

                        {/* View Mode Toggle */}
                        <div className="flex items-center overflow-hidden rounded-lg border border-gray-300" style={{ height: '36px' }}>
                            <button
                                onClick={() => setViewMode('map')}
                                className="flex items-center gap-1.5 px-3 transition-colors"
                                style={{
                                    height: '100%',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    backgroundColor: viewMode === 'map' ? '#1A1816' : 'white',
                                    color: viewMode === 'map' ? 'white' : '#6b7280',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                    <line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
                                </svg>
                                Map
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className="flex items-center gap-1.5 border-l border-gray-300 px-3 transition-colors"
                                style={{
                                    height: '100%',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    backgroundColor: viewMode === 'list' ? '#1A1816' : 'white',
                                    color: viewMode === 'list' ? 'white' : '#6b7280',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
                                    <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
                                </svg>
                                List
                            </button>
                        </div>

                        {/* Save Search */}
                        <button
                            className="flex items-center gap-2 rounded-xl px-5 py-2 text-sm text-white transition-opacity hover:opacity-90"
                            style={{ height: '40px', backgroundColor: '#1A1816', fontSize: '13px', fontWeight: 600, letterSpacing: '0.3px', whiteSpace: 'nowrap' }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
                            </svg>
                            SAVE SEARCH
                        </button>
                    </div>
                </div>

                {/* Main Content: Map + Listings */}
                <div className="flex min-h-0 flex-1">
                    {/* Map */}
                    {viewMode === 'map' && (
                        <div className="hidden lg:block" style={{ width: '57%' }}>
                            <ListingsMap listings={listings} onPolygonSearch={handlePolygonSearch} onPolygonReset={handlePolygonReset} onBoundsChange={handleBoundsChange} hasPolygonFilter={!!filters.polygon} />
                        </div>
                    )}

                    {/* Listings Panel */}
                    <div className={`flex min-h-0 flex-1 flex-col border-l border-gray-200 bg-white ${viewMode === 'map' ? 'lg:max-w-[43%]' : ''}`}>
                        {/* Panel Header */}
                        <div className="shrink-0 border-b border-gray-100 px-5 pt-4 pb-3">
                            <div className="flex items-center justify-between">
                                <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>All Listings</h2>
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <span style={{ fontSize: '12px', color: '#9ca3af', fontWeight: 500 }}>Sort:</span>
                                        <button className="flex items-center gap-1 text-sm" style={{ fontSize: '12px', fontWeight: 600, color: '#1A1816' }}>
                                            Recommended <ChevronDown size={10} />
                                        </button>
                                    </div>
                                    <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                                        {pagination?.count?.toLocaleString() ?? listings.length} results
                                    </span>
                                </div>
                            </div>

                            <div className="mt-3 flex items-center gap-2">
                                <button onClick={() => handleTabChange('for-sale')} className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
                                    style={{ backgroundColor: activeTab === 'for-sale' ? '#1A1816' : 'transparent', color: activeTab === 'for-sale' ? 'white' : '#1A1816', border: activeTab === 'for-sale' ? '1px solid #1A1816' : '1px solid #d1d5db', letterSpacing: '0.5px' }}>
                                    FOR SALE
                                </button>
                                <button onClick={() => handleTabChange('for-lease')} className="rounded-full px-4 py-1.5 text-xs font-semibold transition-colors"
                                    style={{ backgroundColor: activeTab === 'for-lease' ? '#1A1816' : 'transparent', color: activeTab === 'for-lease' ? 'white' : '#1A1816', border: activeTab === 'for-lease' ? '1px solid #1A1816' : '1px solid #d1d5db', letterSpacing: '0.5px' }}>
                                    FOR LEASE
                                </button>
                            </div>

                            <div className="mt-3 flex items-center gap-4">
                                {['Virtual Tour', 'Floor Plans', 'Open House'].map((toggle) => (
                                    <label key={toggle} className="flex cursor-pointer items-center gap-1.5">
                                        <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300 text-green-600 focus:ring-green-500" />
                                        <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>{toggle}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Listings grid */}
                        <div className="flex-1 overflow-y-auto px-5 py-4">
                            {listings.length > 0 ? (
                                <div className={`grid gap-4 ${viewMode === 'list' ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5' : 'grid-cols-2'}`}>
                                    {listings.slice((panelPage - 1) * PANEL_PAGE_SIZE, panelPage * PANEL_PAGE_SIZE).map((listing) => (
                                        <ListingCard key={listing.mlsNumber} listing={listing} />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex h-full items-center justify-center">
                                    <div className="text-center">
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#d1d5db" strokeWidth="1.5" className="mx-auto mb-3"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                                        <p style={{ fontSize: '16px', fontWeight: 600, color: '#6b7280' }}>No listings found</p>
                                        <p style={{ fontSize: '13px', color: '#9ca3af', marginTop: '4px' }}>Try adjusting your search filters</p>
                                    </div>
                                </div>
                            )}

                            {(() => {
                                const totalPanelPages = Math.ceil(listings.length / PANEL_PAGE_SIZE);
                                if (totalPanelPages <= 1) return null;

                                // Build page numbers to show
                                const pages: (number | '...')[] = [];
                                for (let i = 1; i <= totalPanelPages; i++) {
                                    if (i === 1 || i === totalPanelPages || (i >= panelPage - 1 && i <= panelPage + 1)) {
                                        pages.push(i);
                                    } else if (pages[pages.length - 1] !== '...') {
                                        pages.push('...');
                                    }
                                }

                                return (
                                    <div className="mt-6 flex items-center justify-center gap-1 pb-4">
                                        <button
                                            onClick={() => setPanelPage((p) => Math.max(1, p - 1))}
                                            disabled={panelPage <= 1}
                                            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                                        </button>
                                        {pages.map((p, i) =>
                                            p === '...' ? (
                                                <span key={`dots-${i}`} className="flex h-9 w-6 items-center justify-center text-xs text-gray-400">...</span>
                                            ) : (
                                                <button
                                                    key={p}
                                                    onClick={() => setPanelPage(p)}
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors"
                                                    style={{
                                                        backgroundColor: panelPage === p ? '#1e293b' : 'transparent',
                                                        color: panelPage === p ? 'white' : '#374151',
                                                    }}
                                                >
                                                    {p}
                                                </button>
                                            )
                                        )}
                                        <button
                                            onClick={() => setPanelPage((p) => Math.min(totalPanelPages, p + 1))}
                                            disabled={panelPage >= totalPanelPages}
                                            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                                        </button>
                                    </div>
                                );
                            })()}

                            <div className="mt-2 pb-4 text-center" style={{ fontSize: '12px', color: '#9ca3af' }}>
                                Showing {Math.min(listings.length, PANEL_PAGE_SIZE)} of {pagination?.count?.toLocaleString() ?? listings.length} listings
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* All Filters Modal */}
            <AllFiltersModal
                isOpen={showAllFilters}
                onClose={() => setShowAllFilters(false)}
                filters={buildFilters()}
                onApply={handleAllFiltersApply}
            />
        </>
    );
}
