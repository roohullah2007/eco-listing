import { PageProps } from '@/types';
import { Head } from '@inertiajs/react';

import { useState } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';


const heroTabs = ['Buy', 'Rent', 'Sell', 'CMA'];

function HeroSection() {
    return (
        <section className="relative w-full">
            {/* Background Image - Pexels */}
            <img
                src="https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1920"
                alt="EcoListing hero"
                className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/45" />
            {/* Bottom fade */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0" style={{ height: '150px', zIndex: 11, background: 'linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.3) 40%, rgba(255,255,255,0.6) 65%, rgba(255,255,255,0.85) 85%, rgb(255,255,255) 100%)' }} />

            <div className="relative flex flex-col" style={{ height: '820px' }}>
                <div className="mx-auto flex flex-1 items-center px-4" style={{ maxWidth: '1296px', width: '100%' }}>
                    {/* Left side - content */}
                    <div style={{ maxWidth: '560px' }}>
                        <span className="mb-6 inline-block rounded-full bg-white/20 px-5 py-2 text-white" style={{ fontSize: '14px', fontWeight: 600, letterSpacing: '1px' }}>
                            SAVE TIME. SAVE COMMISSION.
                        </span>
                        <h1 className="text-white" style={{ fontWeight: 700, fontSize: '56px', lineHeight: '67px' }}>
                            Re-Imagine Property
                            <br />
                            Selling Experience
                        </h1>
                        <p className="mt-6 text-white" style={{ fontSize: '16px', lineHeight: '24px', fontWeight: 400 }}>
                            We use <strong>Live Virtual Tours</strong> to highlight property features and answer buyer enquiries in <strong>real-time</strong>, allowing us to <strong>qualify</strong> them so only <strong>serious buyer</strong> visit in person, protecting your <strong>schedule and privacy</strong>.
                        </p>
                        <div className="mt-8 flex items-center gap-0">
                            {heroTabs.map((tab) => (
                                <span key={tab} className="relative px-4 pb-2 cursor-pointer" style={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px', color: 'rgba(255, 255, 255, 0.85)' }}>{tab}</span>
                            ))}
                        </div>
                        <div className="mt-4 flex items-center rounded-full bg-white shadow-lg" style={{ width: '498px', height: '48px' }}>
                            <input type="text" placeholder="Address, School, City, Zip or Neighborhood" className="h-full flex-1 rounded-l-full border-0 bg-transparent pl-5 pr-2 focus:ring-0" style={{ fontSize: '16px', fontWeight: 400, color: 'rgb(0, 0, 0)', lineHeight: '18px' }} />
                            <button className="mr-1 flex items-center justify-center gap-2 rounded-full bg-[#1A1816] text-white transition-colors hover:bg-[#2a2826]" style={{ width: '130px', height: '40px', fontSize: '16px', fontWeight: 500, lineHeight: '16px' }}>
                                Search
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const processSteps = [
    {
        step: '01',
        title: 'DIGITAL TWIN CREATION',
        description: 'We deploy specialists to scan your property, creating a high-fidelity 3D Tour. This acts as an \'always-open\' house, creating genuine interest.',
    },
    {
        step: '02',
        title: 'STRATEGIC MARKETING',
        description: 'Your listing launches on entire Real Estate Ecosystem including, Zillow, Realtor.ca, and social channels with premium photography and video assets.',
    },
    {
        step: '03',
        title: 'AGENT-LED VIRTUAL SHOWINGS',
        description: 'Buyers tour your home virtually with our agents first, filtering out unserious inquiries and saving you time.',
    },
    {
        step: '04',
        title: 'QUALIFIED IN-PERSON SHOWINGS',
        description: 'By the time a buyer requests a physical visit, they are vetted, interested, and ready to make a move. We respect your time.',
    },
    {
        step: '05',
        title: 'NEGOTIATION & CLOSING',
        description: 'From the first offer to the final signature, our experts handle all documentation and legalities, ensuring a smooth closing.',
    },
];

function ProcessSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
                <h2 className="mb-12 text-center" style={{ fontWeight: 700, fontSize: '32px', lineHeight: '40px', color: 'rgb(26, 24, 22)' }}>
                    Simple Process to Get it Sold
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-5">
                    {processSteps.map((item, index) => (
                        <div key={item.step} className="relative flex flex-col items-center text-center">
                            {index < processSteps.length - 1 && (
                                <div className="absolute top-6 left-1/2 hidden h-[2px] md:block" style={{ width: '100%', backgroundColor: 'rgb(220, 220, 220)' }} />
                            )}
                            <div
                                className="relative z-10 mb-4 flex items-center justify-center rounded-full"
                                style={{ width: '48px', height: '48px', backgroundColor: 'rgb(26, 24, 22)' }}
                            >
                                <span className="text-white" style={{ fontWeight: 700, fontSize: '16px' }}>{item.step}</span>
                            </div>
                            <h3 className="mb-2" style={{ fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: 'rgb(26, 24, 22)', letterSpacing: '0.5px' }}>
                                {item.title}
                            </h3>
                            <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(100, 100, 100)' }}>
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function WhySellersChooseSection() {
    const [listingPrice, setListingPrice] = useState(700000);
    const traditionalRate = 0.025;
    const ecoRate = 0.01;
    const traditionalFee = Math.round(listingPrice * traditionalRate);
    const ecoFee = Math.round(listingPrice * ecoRate);
    const savings = traditionalFee - ecoFee;

    const features = [
        {
            title: 'Fair & Transparent Pricing',
            description: 'Traditional fees are outdated. We offer a 1% listing fee without cutting corners.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}>
                    <path d="M12 6v12M9 9.5C9 8.12 10.12 7 11.5 7h1.38C14.04 7 15 7.96 15 9.12c0 .81-.46 1.55-1.19 1.91L12 12v1.5M12 17h.01" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="10" stroke="#1A1816" strokeWidth="1.5" />
                </svg>
            ),
        },
        {
            title: 'Premium Property Marketing',
            description: "We don't just list; we launch. High-end photography and strategic positioning.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}>
                    <path d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            title: 'Immersive Virtual Experience',
            description: "Live virtual showings inside your home's 3D tour, generating serious interest.",
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}>
                    <path d="M21 7.5V18M15 7.5V18M3 16.811V8.69c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 010 1.954l-7.108 4.061A1.125 1.125 0 013 16.811z" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            title: 'Data-Backed Negotiations',
            description: 'We use real-time market analytics to defend your asking price.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}>
                    <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    return (
        <section style={{ backgroundColor: '#fafaf9' }}>
            <div className="mx-auto px-4 py-20 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
                {/* Header */}
                <div className="mb-4 text-center">
                    <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgb(100, 100, 100)' }}>
                        THE ECOLISTING ADVANTAGE
                    </span>
                </div>
                <h2 className="mb-3 text-center" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: 'rgb(26, 24, 22)' }}>
                    Why Sellers Choose EcoListing?
                </h2>
                <p className="mx-auto mb-14 text-center" style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: 'rgb(100, 100, 100)', maxWidth: '520px' }}>
                    Save thousands in commission without sacrificing the quality of service you deserve.
                </p>

                <div className="flex items-stretch gap-10">
                    {/* Left: Feature cards */}
                    <div className="flex flex-1 flex-col">
                        <div className="grid flex-1 grid-cols-1 gap-5 sm:grid-cols-2">
                            {features.map((feature, index) => (
                                <div
                                    key={feature.title}
                                    className="group flex flex-col rounded-2xl border border-gray-200 bg-white p-7 transition-all hover:border-gray-300 hover:shadow-lg"
                                >
                                    <div
                                        className="mb-5 flex items-center justify-center rounded-2xl border border-gray-200 transition-transform group-hover:scale-105"
                                        style={{ width: '56px', height: '56px', backgroundColor: '#f5f5f4' }}
                                    >
                                        {feature.icon}
                                    </div>
                                    <h3 className="mb-2" style={{ fontWeight: 700, fontSize: '18px', lineHeight: '26px', color: 'rgb(26, 24, 22)' }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{ fontWeight: 400, fontSize: '15px', lineHeight: '23px', color: 'rgb(120, 120, 120)' }}>
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Calculator */}
                    <div className="flex w-full shrink-0 flex-col" style={{ maxWidth: '420px' }}>
                        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            <div className="flex flex-1 flex-col justify-between p-8">
                                <div className="mb-2 flex items-center justify-between">
                                    <span style={{ fontWeight: 600, fontSize: '13px', lineHeight: '20px', color: 'rgb(100, 100, 100)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                                        Listing Price
                                    </span>
                                    <span style={{ fontWeight: 700, fontSize: '34px', lineHeight: '40px', color: 'rgb(26, 24, 22)' }}>
                                        ${listingPrice.toLocaleString()}
                                    </span>
                                </div>
                                <input
                                    type="range"
                                    min={200000}
                                    max={2000000}
                                    step={10000}
                                    value={listingPrice}
                                    onChange={(e) => setListingPrice(Number(e.target.value))}
                                    className="mt-4 mb-2 w-full accent-[#1A1816]"
                                    style={{ height: '6px' }}
                                />
                                <div className="mb-8 flex justify-between" style={{ fontSize: '13px', color: 'rgb(150, 150, 150)' }}>
                                    <span>$200k</span>
                                    <span>$2M+</span>
                                </div>

                                <div className="rounded-xl p-5" style={{ backgroundColor: '#fafaf9' }}>
                                    <div className="flex items-center justify-between pb-4" style={{ borderBottom: '1px solid rgb(229, 229, 229)' }}>
                                        <span style={{ fontWeight: 400, fontSize: '15px', color: 'rgb(120, 120, 120)' }}>Traditional Fee (2.5%)</span>
                                        <span style={{ fontWeight: 700, fontSize: '16px', color: '#dc2626', textDecoration: 'line-through' }}>${traditionalFee.toLocaleString()}</span>
                                    </div>
                                    <div className="flex items-center justify-between pt-4">
                                        <div className="flex items-center gap-2">
                                            <svg viewBox="0 0 20 20" fill="#1A1816" style={{ width: '18px', height: '18px' }}>
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                            </svg>
                                            <span style={{ fontWeight: 600, fontSize: '15px', color: 'rgb(26, 24, 22)' }}>EcoListing Fee (1%)</span>
                                        </div>
                                        <span style={{ fontWeight: 700, fontSize: '16px', color: 'rgb(26, 24, 22)' }}>${ecoFee.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="mt-5 overflow-hidden rounded-xl text-center" style={{ border: '2px solid #1A1816' }}>
                                    <div className="py-2" style={{ backgroundColor: '#1A1816' }}>
                                        <p style={{ fontWeight: 600, fontSize: '11px', color: 'rgba(255, 255, 255, 0.7)', letterSpacing: '2px', textTransform: 'uppercase' }}>You Keep An Extra</p>
                                    </div>
                                    <div className="py-5" style={{ backgroundColor: '#ffffff' }}>
                                        <p style={{ fontWeight: 800, fontSize: '44px', lineHeight: '52px', color: '#1A1816' }}>
                                            ${savings.toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-center pb-7">
                                <a
                                    href="#"
                                    className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-800"
                                    style={{ width: '220px', height: '48px', backgroundColor: '#1A1816', fontWeight: 600, fontSize: '14px', color: '#ffffff', letterSpacing: '0.5px' }}
                                >
                                    SEE FULL BREAKDOWN
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

const marketingFeatures = [
    {
        title: 'The Digital Twin',
        description: 'A 1:1 scale holographic model providing total transparency and building buyer confidence.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}>
                <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'Premium Virtual Staging',
        description: 'Digitally furnish empty spaces to showcase lifestyle potential.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}>
                <path d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'Guided Narrative Tours',
        description: 'Agents use the virtual tour as a live presentation tool.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}>
                <path d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0118 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m-16.875 0v5.25" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    {
        title: 'Social & Paid Media',
        description: 'We leverage our data specialist to advertise your property everywhere on internet to get maximum exposure.',
        icon: (
            <svg viewBox="0 0 24 24" fill="none" style={{ width: '28px', height: '28px' }}>
                <path d="M10.34 15.84c-.688-.06-1.386-.09-2.09-.09H7.5a4.5 4.5 0 110-9h.75c.704 0 1.402-.03 2.09-.09m0 9.18c.253.962.584 1.892.985 2.783.247.55.06 1.21-.463 1.511l-.657.38c-.551.318-1.26.117-1.527-.461a20.845 20.845 0 01-1.44-4.282m3.102.069a18.03 18.03 0 01-.59-4.59c0-1.586.205-3.124.59-4.59m0 9.18a23.848 23.848 0 018.835 2.535M10.34 6.66a23.847 23.847 0 008.835-2.535m0 0A23.74 23.74 0 0018.795 3m.38 1.125a23.91 23.91 0 011.014 5.395m-1.014 8.855c-.118.38-.245.754-.38 1.125m.38-1.125a23.91 23.91 0 001.014-5.395m0-3.46c.495.413.811 1.035.811 1.73 0 .695-.316 1.317-.811 1.73m0-3.46a24.347 24.347 0 010 3.46" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
];

function MarketingToolsSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto px-4 py-20 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
                {/* Header */}
                <div className="mb-4 text-center">
                    <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgb(100, 100, 100)' }}>
                        MARKETING SUITE
                    </span>
                </div>
                <h2 className="mb-3 text-center" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: 'rgb(26, 24, 22)' }}>
                    Industry-Leading Marketing Tools
                    <br />
                    to Reach More Buyers
                </h2>
                <p className="mx-auto mb-16 text-center" style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: 'rgb(100, 100, 100)', maxWidth: '480px' }}>
                    Experience the future of property presentation.
                </p>

                <div className="flex items-stretch gap-10">
                    {/* Left: Feature list */}
                    <div className="flex flex-1 flex-col gap-5">
                        {marketingFeatures.map((feature) => (
                            <div
                                key={feature.title}
                                className="group flex items-start gap-5 rounded-2xl border border-gray-200 bg-white p-6 transition-all hover:border-gray-300 hover:shadow-lg"
                            >
                                <div
                                    className="flex shrink-0 items-center justify-center rounded-2xl border border-gray-200 transition-transform group-hover:scale-105"
                                    style={{ width: '56px', height: '56px', backgroundColor: '#f5f5f4' }}
                                >
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="mb-1" style={{ fontWeight: 700, fontSize: '18px', lineHeight: '26px', color: 'rgb(26, 24, 22)' }}>
                                        {feature.title}
                                    </h3>
                                    <p style={{ fontWeight: 400, fontSize: '15px', lineHeight: '23px', color: 'rgb(120, 120, 120)' }}>
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Interactive preview */}
                    <div className="flex w-full shrink-0 flex-col" style={{ maxWidth: '480px' }}>
                        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                            {/* Preview area */}
                            <div className="relative flex-1" style={{ backgroundColor: '#f5f5f4', minHeight: '320px' }}>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    {/* 3D cube icon */}
                                    <svg viewBox="0 0 24 24" fill="none" style={{ width: '64px', height: '64px', marginBottom: '16px' }}>
                                        <path d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" stroke="#1A1816" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                                    </svg>
                                    <p style={{ fontWeight: 700, fontSize: '18px', color: 'rgb(26, 24, 22)' }}>The Digital Twin</p>
                                    <p style={{ fontWeight: 400, fontSize: '14px', color: 'rgb(120, 120, 120)', marginTop: '4px' }}>Interactive 3D Viewing</p>
                                </div>
                                {/* Decorative grid */}
                                <div className="absolute inset-0 opacity-[0.04]" style={{
                                    backgroundImage: 'linear-gradient(#1A1816 1px, transparent 1px), linear-gradient(90deg, #1A1816 1px, transparent 1px)',
                                    backgroundSize: '40px 40px',
                                }} />
                            </div>

                            {/* Bottom bar */}
                            <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4">
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '15px', color: 'rgb(26, 24, 22)' }}>The Digital Twin</p>
                                    <p style={{ fontWeight: 400, fontSize: '13px', color: 'rgb(120, 120, 120)' }}>Interactive Preview</p>
                                </div>
                                <a
                                    href="#"
                                    className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-800"
                                    style={{ width: '140px', height: '42px', backgroundColor: '#1A1816', fontWeight: 600, fontSize: '13px', color: '#ffffff' }}
                                >
                                    Explore Tour
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function PropertyShowcaseSection() {
    const showcaseFeatures = [
        {
            title: 'Highlight features',
            description: 'Every single feature of the property is visually expressed to buyers.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={{ width: '24px', height: '24px' }}>
                    <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            title: 'Immersive Buyer Tour',
            description: 'Buyers explore every corner of the property remotely.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={{ width: '24px', height: '24px' }}>
                    <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
        {
            title: 'Instant enquiries',
            description: 'It makes our job easier.',
            icon: (
                <svg viewBox="0 0 24 24" fill="none" style={{ width: '24px', height: '24px' }}>
                    <path d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            ),
        },
    ];

    return (
        <section style={{ backgroundColor: '#fafaf9' }}>
            <div className="mx-auto px-4 py-20 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
                <div className="flex items-start gap-16">
                    {/* Left: Text content */}
                    <div className="shrink-0" style={{ maxWidth: '380px' }}>
                        <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgb(100, 100, 100)' }}>
                            VIRTUAL EXPERIENCE
                        </span>
                        <h2 className="mt-3" style={{ fontWeight: 700, fontSize: '42px', lineHeight: '50px', color: 'rgb(26, 24, 22)' }}>
                            The Property
                            <br />
                            Showcase
                        </h2>
                        <div className="mt-10 flex flex-col gap-6">
                            {showcaseFeatures.map((feature) => (
                                <div key={feature.title} className="flex items-start gap-4">
                                    <div
                                        className="flex shrink-0 items-center justify-center rounded-xl border border-gray-200"
                                        style={{ width: '48px', height: '48px', backgroundColor: '#ffffff' }}
                                    >
                                        {feature.icon}
                                    </div>
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}>
                                            {feature.title}
                                        </h3>
                                        <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(120, 120, 120)' }}>
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Video preview */}
                    <div className="flex-1">
                        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 shadow-sm" style={{ aspectRatio: '16/9' }}>
                            <img
                                src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200"
                                alt="Property virtual tour"
                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 transition-colors group-hover:bg-black/30" />
                            {/* Play button */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div
                                    className="flex items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition-transform group-hover:scale-110"
                                    style={{ width: '80px', height: '80px' }}
                                >
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

const testimonials = [
    {
        quote: 'EcoListing transformed how we sold our home. The digital twin technology showcased our property in a way photos simply couldn\'t. We received multiple offers within days.',
        initials: 'SJ',
        name: 'Sarah Jenkins',
        role: 'Home Seller • Austin, TX',
    },
    {
        quote: 'The transparency of the platform gave me total peace of mind. I could track every viewing and offer in real-time. It\'s the modern real estate experience I\'ve been waiting for.',
        initials: 'MC',
        name: 'Michael Chen',
        role: 'Property Investor • Seattle, WA',
    },
    {
        quote: 'From the accurate valuation to the final closing, everything was seamless. The tools provided are truly industry-leading and made the complex process feel simple.',
        initials: 'ER',
        name: 'Elena Rodriguez',
        role: 'Home Seller • Miami, FL',
    },
];

function TestimonialsSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto px-4 py-20 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
                {/* Header */}
                <div className="mb-4 text-center">
                    <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgb(100, 100, 100)' }}>
                        TESTIMONIALS
                    </span>
                </div>
                <h2 className="mb-3 text-center" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: 'rgb(26, 24, 22)' }}>
                    What clients have experienced with EcoListing?
                </h2>
                <p className="mx-auto mb-14 text-center" style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: 'rgb(100, 100, 100)', maxWidth: '580px' }}>
                    Don't just take our word for it. Hear from homeowners who have successfully sold with our platform.
                </p>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {testimonials.map((t) => (
                        <div
                            key={t.initials}
                            className="group flex flex-col justify-between rounded-2xl border border-gray-200 p-8 transition-all hover:border-gray-300 hover:shadow-lg"
                            style={{ backgroundColor: '#fafaf9' }}
                        >
                            {/* Quote */}
                            <div>
                                <svg viewBox="0 0 24 24" fill="none" style={{ width: '32px', height: '32px', marginBottom: '16px' }}>
                                    <path d="M7.5 8.25h-3a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 011.5 1.5v.75a3 3 0 01-3 3H3.75M16.5 8.25h-3a1.5 1.5 0 00-1.5 1.5v3a1.5 1.5 0 001.5 1.5h1.5a1.5 1.5 0 011.5 1.5v.75a3 3 0 01-3 3h-.75" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.3" />
                                </svg>
                                <p style={{ fontWeight: 400, fontSize: '15px', lineHeight: '24px', color: 'rgb(60, 60, 60)' }}>
                                    "{t.quote}"
                                </p>
                            </div>

                            {/* Author */}
                            <div className="mt-8 flex items-center gap-4">
                                <div
                                    className="flex shrink-0 items-center justify-center rounded-full"
                                    style={{ width: '48px', height: '48px', backgroundColor: '#1A1816' }}
                                >
                                    <span style={{ fontWeight: 700, fontSize: '14px', color: '#ffffff', letterSpacing: '0.5px' }}>{t.initials}</span>
                                </div>
                                <div>
                                    <p style={{ fontWeight: 700, fontSize: '15px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                                        {t.name}
                                    </p>
                                    <p style={{ fontWeight: 400, fontSize: '13px', lineHeight: '18px', color: 'rgb(120, 120, 120)' }}>
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function CmaSection() {
    return (
        <section style={{ backgroundColor: '#fafaf9' }}>
            <div className="mx-auto px-4 py-20 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
                <div className="flex items-center gap-16">
                    {/* Left: Content */}
                    <div className="flex-1">
                        <span style={{ fontWeight: 600, fontSize: '13px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgb(100, 100, 100)' }}>
                            FREE CMA REPORT
                        </span>
                        <h2 className="mt-3" style={{ fontWeight: 700, fontSize: '36px', lineHeight: '44px', color: 'rgb(26, 24, 22)' }}>
                            Discover Your Home's
                            <br />
                            True Market Value
                        </h2>
                        <p className="mt-4" style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: 'rgb(120, 120, 120)', maxWidth: '460px' }}>
                            Get an accurate estimate by expert agent using latest market data and Comparable sales.
                        </p>

                        <a href="#" className="mt-5 inline-block underline" style={{ fontWeight: 600, fontSize: '14px', color: 'rgb(26, 24, 22)' }}>
                            See sample CMA report
                        </a>

                        {/* Search input */}
                        <div className="mt-8 flex items-center rounded-full border border-gray-300 bg-white shadow-sm" style={{ width: '100%', maxWidth: '460px', height: '52px' }}>
                            <input
                                type="text"
                                placeholder="Enter property address"
                                className="h-full flex-1 rounded-l-full border-0 bg-transparent pl-5 pr-2 focus:ring-0"
                                style={{ fontSize: '15px', fontWeight: 400, color: 'rgb(0, 0, 0)', lineHeight: '18px' }}
                            />
                            <button
                                className="mr-1 flex items-center justify-center gap-2 rounded-full text-white transition-colors hover:bg-gray-800"
                                style={{ width: '180px', height: '44px', backgroundColor: '#1A1816', fontSize: '14px', fontWeight: 600 }}
                            >
                                Get Agent CMA Report
                            </button>
                        </div>

                        {/* Trust badges */}
                        <div className="mt-6 flex items-center gap-6">
                            <div className="flex items-center gap-2">
                                <svg viewBox="0 0 20 20" fill="#1A1816" style={{ width: '16px', height: '16px' }}>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                                <span style={{ fontWeight: 500, fontSize: '13px', color: 'rgb(100, 100, 100)' }}>Licensed REALTOR®</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg viewBox="0 0 20 20" fill="#1A1816" style={{ width: '16px', height: '16px' }}>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                                <span style={{ fontWeight: 500, fontSize: '13px', color: 'rgb(100, 100, 100)' }}>100% Free Market Analysis</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <svg viewBox="0 0 20 20" fill="#1A1816" style={{ width: '16px', height: '16px' }}>
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                                </svg>
                                <span style={{ fontWeight: 500, fontSize: '13px', color: 'rgb(100, 100, 100)' }}>No sign-up required</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Image */}
                    <div className="shrink-0" style={{ maxWidth: '480px' }}>
                        <img
                            src="/images/true-market.png"
                            alt="CMA Report preview"
                            className="rounded-2xl border border-gray-200 shadow-sm"
                            style={{ width: '100%', height: 'auto' }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}







export default function Welcome() {
    return (
        <>
            <Head title="Find Eco-Friendly Homes in Canada" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <Header />

                {/* Hero Section */}
                <HeroSection />

                {/* Simple Process */}
                <ProcessSection />

                {/* Why Sellers Choose EcoListing */}
                <WhySellersChooseSection />

                {/* Marketing Tools */}
                <MarketingToolsSection />

                {/* Property Showcase */}
                <PropertyShowcaseSection />

                {/* Testimonials */}
                <TestimonialsSection />

                {/* CMA Report */}
                <CmaSection />

                <Footer />
            </div>
        </>
    );
}
