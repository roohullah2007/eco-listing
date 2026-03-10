import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';


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
                                <span key={tab} className="relative px-4 pb-2 cursor-pointer" style={{ fontSize: '16px', fontWeight: 500, lineHeight: '24px', color: 'rgb(190, 184, 176)' }}>{tab}</span>
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

const browseCards = [
    { label: 'New listings', count: '339', image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { label: 'Price reduced', count: '84', image: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { label: 'Open houses', count: '122', image: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { label: 'Recently sold', count: '3,018', image: 'https://images.pexels.com/photos/2102587/pexels-photo-2102587.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { label: 'New construction', count: '103', image: 'https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { label: 'New home communities', count: '1', image: 'https://images.pexels.com/photos/2581922/pexels-photo-2581922.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { label: 'Land', count: '63', image: 'https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=600' },
    { label: 'Foreclosures', count: '12', image: 'https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

function BrowseCategories() {
    return (
        <section className="relative bg-white" style={{ paddingBottom: '150px', zIndex: 12 }}>
            <div
                className="mx-auto"
                style={{ maxWidth: '1280px', paddingBottom: '32px' }}
            >
                <div
                    className="grid grid-cols-2 md:grid-cols-4"
                    style={{ gap: '16px' }}
                >
                    {browseCards.map((card) => (
                        <a
                            key={card.label}
                            href="#"
                            className="group relative block overflow-hidden rounded-xl"
                            style={{ width: '100%', height: '200px' }}
                        >
                            <img
                                src={card.image}
                                alt={card.label}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent" />
                            <span
                                className="absolute top-3 left-3 text-white"
                                style={{ fontWeight: 700, fontSize: '18px', lineHeight: '24px' }}
                            >
                                {card.label}
                            </span>
                            <span
                                className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white/90"
                                style={{
                                    minWidth: '36px',
                                    height: '28px',
                                    padding: '0 8px',
                                    fontSize: '14px',
                                    fontWeight: 400,
                                    lineHeight: '20px',
                                    color: 'rgb(100, 100, 100)',
                                }}
                            >
                                {card.count}
                            </span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

const agents = [
    {
        name: 'Guillean Arradaza',
        company: 'Kinetic Real Estate',
        license: '02023642',
        years: 9,
        sales: 32,
        image: 'https://storage.googleapis.com/upnest1/upload/realtor/1302552706_4daf5585-9c9b-4e59-ac47-93a1ff2b6b52.jpeg',
    },
    {
        name: 'Gregory Moncure',
        company: 'Satori Estates',
        license: '02102295',
        years: 0,
        sales: 0,
        image: 'https://storage.googleapis.com/upnest1/upload/realtor/1302552706_4daf5585-9c9b-4e59-ac47-93a1ff2b6b52.jpeg',
    },
];

function RealChoiceSection() {
    return (
        <section className="bg-white">
            <div className="mx-auto flex items-start gap-12 px-4 py-16 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
                {/* Left side - text content */}
                <div className="shrink-0" style={{ maxWidth: '440px' }}>
                    <p className="mb-1" style={{ fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}>
                        <span className="text-red-600">Real</span>Choice™ Selling
                    </p>
                    <h2 className="mb-6" style={{ fontWeight: 700, fontSize: '24px', lineHeight: '28px', color: 'rgb(26, 24, 22)' }}>
                        Looking to sell? Find a trusted expert.
                    </h2>
                    <p className="mb-1" style={{ fontWeight: 500, fontSize: '16px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}>
                        We matched you with <span className="font-bold">six agents</span> in{' '}
                        <svg className="inline-block align-text-bottom" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>{' '}
                        San Francisco, CA.
                    </p>
                    <p className="mb-8" style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}>
                        Enter your address to review and compare agents.
                    </p>
                    <button
                        className="flex items-center justify-center gap-2 rounded-full text-white transition-colors hover:bg-gray-800"
                        style={{ width: '210px', height: '48px', backgroundColor: 'rgb(26, 24, 22)', fontSize: '16px', fontWeight: 500 }}
                    >
                        <span>Compare agents</span>
                        <svg viewBox="0 0 24 24" aria-hidden="true" style={{ width: '24px', height: '24px', fill: 'currentcolor' }}>
                            <path d="M12.293 6.707a1 1 0 0 1 1.414-1.414l-1.414 1.414ZM19 12l.707-.707a1 1 0 0 1 0 1.414L19 12Zm-5.293 6.707a1 1 0 0 1-1.414-1.414l1.414 1.414ZM5 13a1 1 0 1 1 0-2v2Zm8.707-7.707 6 6-1.414 1.414-6-6 1.414-1.414Zm6 7.414-6 6-1.414-1.414 6-6 1.414 1.414ZM19 13H5v-2h14v2Z" />
                        </svg>
                    </button>
                </div>

                {/* Right side - agent cards */}
                <div className="flex flex-1 items-start gap-8">
                    {agents.map((agent) => (
                        <div key={agent.name} className="flex flex-col items-center text-center" style={{ width: '200px' }}>
                            <img
                                src={agent.image}
                                alt={agent.name}
                                className="mb-4 rounded-full object-cover"
                                style={{ width: '96px', height: '96px' }}
                            />
                            <p className="mb-1" style={{ fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}>
                                {agent.name}
                            </p>
                            <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                                {agent.company}
                            </p>
                            <p className="mb-4" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(114, 106, 96)' }}>
                                License # {agent.license}
                            </p>
                            <div className="flex gap-6">
                                <div className="text-center">
                                    <p style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}>
                                        {agent.years} years
                                    </p>
                                    <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(114, 106, 96)' }}>
                                        Experience
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}>
                                        {agent.sales} sales
                                    </p>
                                    <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(114, 106, 96)' }}>
                                        In past year
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* +4 more agents card */}
                    <div className="flex flex-col items-center text-center" style={{ width: '200px' }}>
                        <div
                            className="mb-4 flex items-center justify-center rounded-full"
                            style={{ width: '96px', height: '96px', backgroundColor: 'rgb(26, 24, 22)' }}
                        >
                            <span className="text-white" style={{ fontWeight: 700, fontSize: '32px' }}>+4</span>
                        </div>
                        <p style={{ fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}>
                            more agents
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

const discoverTabs = ['Buying', 'Renting', 'Selling'];

const discoverCards = {
    Buying: [
        {
            title: 'Find out how much you can afford',
            description: "We'll help you estimate your budget range. Save to your buyer profile to help in your search.",
            link: 'Try our affordability calculator',
            icon: 'https://static.rdc.moveaws.com/rdc-ui/spots/spot-badge-cash-reward.svg',
        },
        {
            title: 'Understand your monthly costs',
            description: 'Get an in-depth look at what your monthly and closing costs will look like based on your financial situation and goals.',
            link: 'Try our mortgage calculator',
            icon: 'https://static.rdc.moveaws.com/rdc-ui/spots/spot-calculator.svg',
        },
        {
            title: 'Get help with your down payment',
            description: 'You may be able to buy a home with just 3.5% down. Saving for that can be challenging\u2013down payment assistance programs can help.',
            link: 'Find down payment help',
            icon: 'https://static.rdc.moveaws.com/rdc-ui/spots/spot-money-stack.svg',
        },
    ],
};

function DiscoverHelpSection() {
    const [activeTab, setActiveTab] = useState('Buying');

    return (
        <section className="bg-white">
            <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
                <h2 className="mb-6" style={{ fontWeight: 700, fontSize: '24px', lineHeight: '28px', color: 'rgb(26, 24, 22)' }}>
                    Discover how we can help
                </h2>

                {/* Tabs */}
                <div className="mb-8 flex gap-3">
                    {discoverTabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className="rounded-full border transition-colors"
                            style={{
                                width: '88px',
                                height: '48px',
                                fontSize: '16px',
                                fontWeight: 500,
                                lineHeight: '24px',
                                color: 'rgb(26, 24, 22)',
                                borderColor: activeTab === tab ? 'rgb(26, 24, 22)' : 'rgb(200, 200, 200)',
                                borderWidth: activeTab === tab ? '2px' : '1px',
                                backgroundColor: 'transparent',
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {discoverCards.Buying.map((card) => (
                        <div
                            key={card.title}
                            className="flex flex-col justify-between rounded-xl border border-gray-500 p-6"
                            style={{ height: '250px' }}
                        >
                            <div>
                                <div className="mb-3 flex items-start justify-between">
                                    <h3 style={{ fontWeight: 700, fontSize: '16px', lineHeight: '23px', color: 'rgb(0, 0, 0)', maxWidth: '280px' }}>
                                        {card.title}
                                    </h3>
                                    <img src={card.icon} alt="" className="shrink-0" style={{ width: '48px', height: '48px' }} />
                                </div>
                                <p style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(43, 43, 43)' }}>
                                    {card.description}
                                </p>
                            </div>
                            <a
                                href="#"
                                className="underline"
                                style={{ fontWeight: 700, fontSize: '16px', lineHeight: '24px', color: 'rgb(43, 43, 43)' }}
                            >
                                {card.link}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

const neighborhoods = [
    {
        name: 'South Beach',
        listings: 175,
        medianPrice: '$1,027,000',
        mapUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=South+Beach,San+Francisco,CA&zoom=14&size=304x180&maptype=roadmap&markers=color:red%7CSouth+Beach,San+Francisco,CA&key=',
    },
    {
        name: 'Pacific Heights',
        listings: 41,
        medianPrice: '$1,925,000',
        mapUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=Pacific+Heights,San+Francisco,CA&zoom=14&size=304x180&maptype=roadmap&markers=color:red%7CPacific+Heights,San+Francisco,CA&key=',
    },
    {
        name: 'Outer Sunset',
        listings: 33,
        medianPrice: '$1,295,000',
        mapUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=Outer+Sunset,San+Francisco,CA&zoom=14&size=304x180&maptype=roadmap&markers=color:red%7COuter+Sunset,San+Francisco,CA&key=',
    },
    {
        name: 'Mission District',
        listings: 50,
        medianPrice: '$849,950',
        mapUrl: 'https://maps.googleapis.com/maps/api/staticmap?center=Mission+District,San+Francisco,CA&zoom=14&size=304x180&maptype=roadmap&markers=color:red%7CMission+District,San+Francisco,CA&key=',
    },
];

function RecommendedNeighborhoods() {
    return (
        <section className="bg-white">
            <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8" style={{ maxWidth: '1280px' }}>
                <h2 className="mb-1" style={{ fontWeight: 700, fontSize: '24px', lineHeight: '28px', color: 'rgb(26, 24, 22)' }}>
                    Recommended neighborhoods
                </h2>
                <p className="mb-8" style={{ fontWeight: 400, fontSize: '16px', lineHeight: '24px', color: 'rgb(43, 43, 43)' }}>
                    Based on your previous search
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {neighborhoods.map((hood) => (
                        <a
                            key={hood.name}
                            href="#"
                            className="block overflow-hidden rounded-xl border border-gray-300 transition-shadow hover:shadow-md"
                            style={{ width: '100%' }}
                        >
                            {/* Map placeholder */}
                            <div className="relative bg-gray-200" style={{ height: '180px' }}>
                                <div className="flex h-full items-center justify-center">
                                    <svg className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                {/* Red marker pin */}
                                <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                                    <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
                                        <path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" fill="#EA4335"/>
                                        <circle cx="12" cy="12" r="4" fill="#B41412"/>
                                    </svg>
                                </div>
                                {/* Fake map grid lines */}
                                <div className="absolute inset-0 opacity-20">
                                    <div className="h-full w-full" style={{
                                        backgroundImage: 'linear-gradient(rgb(200,200,200) 1px, transparent 1px), linear-gradient(90deg, rgb(200,200,200) 1px, transparent 1px)',
                                        backgroundSize: '40px 40px',
                                    }} />
                                </div>
                            </div>
                            {/* Info */}
                            <div className="p-4">
                                <h3 style={{ fontWeight: 700, fontSize: '20px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}>
                                    {hood.name}
                                </h3>
                                <p className="mt-1" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                                    <span className="font-bold">{hood.listings}</span> Listings for sale
                                </p>
                                <p className="mt-0.5" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                                    <span className="font-bold">{hood.medianPrice}</span> Median Listing Home Price
                                </p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

function UniqueHomesSection() {
    return (
        <section className="relative w-full" style={{ height: '500px' }}>
            {/* Background image */}
            <img
                src="/images/section-img.jpg"
                alt="Unique Homes"
                className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50" />
            {/* Content */}
            <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
                <p className="mb-4" style={{ fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: 'rgb(255, 255, 255)' }}>
                    Unique Homes
                </p>
                <h2 className="mx-auto mb-8" style={{ fontWeight: 700, fontSize: '24px', lineHeight: '34px', color: 'rgb(255, 255, 255)', maxWidth: '700px' }}>
                    $110 Million Coconut Grove Megamansion Next to Billionaire Ken Griffin's Opulent Estate Floats to the Top of Most Expensive Homes List
                </h2>
                <a
                    href="#"
                    className="flex items-center justify-center rounded-full border border-white text-white transition-colors hover:bg-white/10"
                    style={{ width: '144px', height: '45px', fontWeight: 500, fontSize: '16px', lineHeight: '23px' }}
                >
                    Read Article
                </a>
            </div>
        </section>
    );
}

function NewsArticlesSection() {
    const articles = [
        {
            image: '/images/trends1.jpg',
            category: 'Trends',
            title: 'Home Contract Cancellations Edge Down: The Top Markets Where Deals Are Most Likel...',
        },
        {
            image: '/images/trends2.jpg',
            category: 'Trends',
            title: 'Mortgage Interest Rates Today: Rates Fall to 5.98%—the Lowest...',
        },
        {
            image: '/images/uniquehomes.jpg',
            category: 'Unique homes',
            title: "The 'Brady Bunch' House Is Officially a Historic Landmark",
        },
        {
            image: '/images/realestatenews.jpg',
            category: 'Real estate news',
            title: "Senate Pushes Forward Major Housing Bill With Trump's Investo...",
        },
    ];

    return (
        <section style={{ backgroundColor: '#e5e5e5', padding: '40px 0' }}>
            <div className="mx-auto flex justify-center gap-6 px-4" style={{ maxWidth: '1320px' }}>
                {articles.map((article, index) => (
                    <a
                        key={index}
                        href="#"
                        className="block flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
                        style={{ width: '304px', height: '274px' }}
                    >
                        <div className="relative" style={{ height: '202px' }}>
                            <img
                                src={article.image}
                                alt={article.title}
                                className="h-full w-full object-cover"
                            />
                            <span
                                className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold text-white"
                                style={{ backgroundColor: '#3b6de0', fontSize: '12px' }}
                            >
                                {article.category}
                            </span>
                        </div>
                        <div className="px-3 py-2">
                            <p style={{ fontWeight: 500, fontSize: '14px', lineHeight: '20px', color: '#1a1816' }}>
                                {article.title}
                            </p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    );
}

function PreApprovedSection() {
    return (
        <section className="w-full bg-white">
            <div className="flex w-full">
                {/* Left: Image */}
                <div className="w-1/2 flex-shrink-0">
                    <img
                        src="/images/pre-approved.avif"
                        alt="Get pre-approved"
                        className="h-full w-full object-cover"
                        style={{ height: '500px' }}
                    />
                </div>
                {/* Right: Content */}
                <div className="flex w-1/2 flex-col justify-center px-16">
                    <h2 style={{ fontWeight: 700, fontSize: '32px', lineHeight: '40px', color: 'rgb(26, 24, 22)' }}>
                        Need a home loan? Get pre-approved
                    </h2>
                    <p className="mt-4" style={{ fontWeight: 400, fontSize: '18px', lineHeight: '28px', color: 'rgb(26, 24, 22)' }}>
                        Find a lender who can offer competitive mortgage rates and help you with pre-approval.
                    </p>
                    <div className="mt-8">
                        <a
                            href="#"
                            className="inline-flex items-center justify-center rounded-full text-white"
                            style={{ width: '225px', height: '45px', backgroundColor: '#353b36', fontWeight: 500, fontSize: '16px', lineHeight: '23px' }}
                        >
                            Get pre-approved now
                        </a>
                    </div>
                    <div className="mt-12">
                        <a
                            href="#"
                            className="underline"
                            style={{ fontWeight: 400, fontSize: '16px', lineHeight: '23px', color: 'rgb(26, 24, 22)' }}
                        >
                            Advertising disclosure
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

function GetLocalInfoSection() {
    const [searchValue, setSearchValue] = useState('San Francisco, CA');

    return (
        <section className="w-full bg-white">
            <div className="flex w-full">
                {/* Left: Content */}
                <div className="flex w-1/2 flex-col justify-center px-16">
                    <h2 style={{ fontWeight: 700, fontSize: '32px', lineHeight: '40px', color: 'rgb(26, 24, 22)' }}>
                        Get Local Info
                    </h2>
                    <p className="mt-4" style={{ fontWeight: 400, fontSize: '20px', lineHeight: '28px', color: 'rgb(26, 24, 22)' }}>
                        Does it have pet-friendly rentals? How are the schools? Get important local information on the area you're most interested in.
                    </p>
                    <div className="mt-8 flex items-center gap-2">
                        <div
                            className="flex items-center rounded-full border border-gray-300"
                            style={{ width: '498px', height: '58px' }}
                        >
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                                className="flex-1 border-none bg-transparent px-6 outline-none"
                                style={{ fontWeight: 400, fontSize: '20px', lineHeight: '24px', color: 'rgb(26, 24, 22)' }}
                            />
                            {searchValue && (
                                <button
                                    onClick={() => setSearchValue('')}
                                    className="mr-1 flex items-center justify-center text-gray-500 hover:text-gray-700"
                                    style={{ width: '24px', height: '24px' }}
                                >
                                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                                        <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                                    </svg>
                                </button>
                            )}
                            <button
                                aria-label="Search"
                                className="mr-1 flex items-center justify-center rounded-full text-white"
                                style={{ width: '48px', height: '48px', backgroundColor: '#353b36' }}
                            >
                                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.618 18.032a9 9 0 1 1 1.414-1.414l3.675 3.675a1 1 0 0 1-1.414 1.414l-3.675-3.675ZM18 11a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Right: Image */}
                <div className="w-1/2 flex-shrink-0">
                    <img
                        src="/images/info-section.avif"
                        alt="Get local info"
                        className="h-full w-full object-cover"
                        style={{ height: '500px' }}
                    />
                </div>
            </div>
        </section>
    );
}

function NarSection() {
    return (
        <section className="w-full bg-white" style={{ borderBottom: '1px solid #e5e5e5' }}>
            <div className="mx-auto flex gap-12 py-16" style={{ maxWidth: '1296px' }}>
                {/* Logo + Description */}
                <div style={{ minWidth: '280px', maxWidth: '320px' }}>
                    <img src="/images/nar-logo.svg" alt="National Association of REALTORS®" style={{ width: '215px', height: '75px' }} />
                    <p className="mt-4" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(85, 85, 85)' }}>
                        Find out how the NAR works for consumers and REALTORS<sup>®</sup>
                    </p>
                </div>

                {/* For Homeowners */}
                <div>
                    <h3 className="mb-4" style={{ fontWeight: 700, fontSize: '16px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                        For Homeowners
                    </h3>
                    <ul className="flex flex-col gap-3">
                        {['Look for the R', 'First-Time Buyer', 'Real Estate Today', 'Reasons to work with a REALTOR®'].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span style={{ color: 'rgb(100, 100, 100)', fontSize: '14px', lineHeight: '20px' }}>•</span>
                                <a href="#" className="underline" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(100, 100, 100)' }}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* For REALTORS */}
                <div>
                    <h3 className="mb-4" style={{ fontWeight: 700, fontSize: '16px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                        For REALTORS<sup>®</sup>
                    </h3>
                    <ul className="flex flex-col gap-3">
                        {[
                            'Special Discounts You Can Share with Clients',
                            'Leverage marketing assets for consumers from NAR',
                            'Stand out and drive more leads with a powerful .RealEstate website. Start free.',
                            '2026 Good Neighbor Award Applications Due April 10',
                        ].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span className="mt-0.5" style={{ color: 'rgb(100, 100, 100)', fontSize: '14px', lineHeight: '20px' }}>•</span>
                                <a href="#" className="underline" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(100, 100, 100)', maxWidth: '280px' }}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Learn About N.A.R */}
                <div>
                    <h3 className="mb-4" style={{ fontWeight: 700, fontSize: '16px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                        Learn About N.A.R
                    </h3>
                    <ul className="flex flex-col gap-3">
                        {['About NAR', 'Agent vs. REALTOR®', 'Find an Appraiser', 'Commercial Services', 'NAR Global Alliances'].map((item) => (
                            <li key={item} className="flex items-start gap-2">
                                <span style={{ color: 'rgb(100, 100, 100)', fontSize: '14px', lineHeight: '20px' }}>•</span>
                                <a href="#" className="underline" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(100, 100, 100)' }}>
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}

function PopularLinksSection() {
    const columns = [
        { title: 'Popular real estate markets', item: 'Wichita, KS real estate' },
        { title: 'Popular apartment cities', item: 'Apartments for rent in Manhattan, NY' },
        { title: 'Popular resources', item: 'Homes for sale near me' },
        { title: 'New listings by state', item: 'Alabama new listings' },
    ];

    return (
        <section className="w-full bg-white">
            {/* Popular Links */}
            <div className="mx-auto pt-12 pb-12" style={{ maxWidth: '1296px' }}>
                <div className="grid grid-cols-4 gap-8">
                    {columns.map((col) => (
                        <div key={col.title}>
                            <h3 style={{ fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                                {col.title}
                            </h3>
                            <p className="mt-3" style={{ fontWeight: 400, fontSize: '14px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                                {col.item}
                            </p>
                            <button className="mt-3 flex items-center gap-1" style={{ fontWeight: 700, fontSize: '14px', lineHeight: '20px', color: 'rgb(26, 24, 22)' }}>
                                <span className="underline">See more</span>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Banner */}
            <div className="mx-auto flex justify-center pb-12" style={{ maxWidth: '1296px' }}>
                <img
                    src="/images/women-img.png"
                    alt="Over 500k new listings"
                    className="object-cover"
                    style={{ width: '970px', height: '250px' }}
                />
            </div>
        </section>
    );
}



export default function Welcome({
    auth,
}: PageProps) {
    return (
        <>
            <Head title="Find Eco-Friendly Homes in Canada" />
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Navigation */}
                <nav
                    className="w-full border-b border-gray-200 bg-white"
                    style={{ height: '50px' }}
                >
                    <div className="mx-auto flex h-full items-center justify-between" style={{ maxWidth: '1280px' }}>
                        {/* Left: Logo + Nav Links */}
                        <div className="flex h-full items-center">
                            {/* Logo */}
                            <Link
                                href="/"
                                className="mr-6 flex shrink-0 items-center"
                            >
                                <img
                                    src="/images/logo.png"
                                    alt="EcoListing.ca"
                                    style={{ width: '162px', height: '46px', objectFit: 'contain' }}
                                />
                            </Link>

                            {/* Primary Nav Links */}
                            <div className="hidden h-full items-center gap-0 lg:flex">
                                {['Buy', 'Sell', 'Rent', 'Mortgage', 'Find an Agent', 'My Home', 'News & Insights'].map(
                                    (item) => (
                                        <a
                                            key={item}
                                            href="#"
                                            className="flex h-full items-center px-3 transition-colors hover:text-green-600"
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                color: 'rgb(26, 24, 22)',
                                                lineHeight: '50px',
                                            }}
                                        >
                                            {item}
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* Right: Secondary Links + Auth */}
                        <div className="flex h-full items-center">
                            {/* Secondary Nav Links */}
                            <div className="hidden h-full items-center gap-0 xl:flex">
                                {['Manage rentals', 'Advertise'].map(
                                    (item) => (
                                        <a
                                            key={item}
                                            href="#"
                                            className="flex h-full items-center px-3 transition-colors hover:text-green-600"
                                            style={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                color: 'rgb(26, 24, 22)',
                                                lineHeight: '50px',
                                            }}
                                        >
                                            {item}
                                        </a>
                                    ),
                                )}
                            </div>

                            {/* Auth Buttons */}
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="flex items-center px-3 transition-colors hover:text-green-600"
                                    style={{
                                        fontSize: '14px',
                                        fontWeight: 500,
                                        color: 'rgb(26, 24, 22)',
                                        lineHeight: '50px',
                                    }}
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="flex h-full items-center px-3 transition-colors hover:text-green-600"
                                        style={{
                                            fontSize: '14px',
                                            fontWeight: 500,
                                            color: 'rgb(26, 24, 22)',
                                            lineHeight: '50px',
                                        }}
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="ml-2 flex items-center justify-center rounded-full bg-[rgb(26,24,22)] text-white transition-colors hover:bg-gray-800"
                                        style={{
                                            width: '85px',
                                            height: '36px',
                                            fontSize: '14px',
                                            fontWeight: 500,
                                        }}
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <HeroSection />

                {/* Browse Categories */}
                <BrowseCategories />

                {/* RealChoice Selling */}
                <RealChoiceSection />

                {/* Discover How We Can Help */}
                <DiscoverHelpSection />

                {/* Recommended Neighborhoods */}
                <RecommendedNeighborhoods />

                {/* Unique Homes */}
                <UniqueHomesSection />

                {/* News Articles */}
                <NewsArticlesSection />

                {/* Pre-Approved Section */}
                <PreApprovedSection />

                {/* Get Local Info Section */}
                <GetLocalInfoSection />

                {/* NAR Section */}
                <NarSection />

                {/* Popular Links + Banner */}
                <PopularLinksSection />

                {/* Footer */}
                <footer style={{ backgroundColor: '#000000' }}>
                    <div className="mx-auto" style={{ maxWidth: '1296px', padding: '40px 0' }}>
                        {/* Top Row: Social Icons + Partner Logos */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Facebook */}
                                <a href="#" className="flex items-center justify-center rounded-full bg-white" style={{ width: '40px', height: '40px' }}>
                                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                                </a>
                                {/* X/Twitter */}
                                <a href="#" className="flex items-center justify-center rounded-full bg-white" style={{ width: '40px', height: '40px' }}>
                                    <svg viewBox="0 0 24 24" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                </a>
                                {/* LinkedIn */}
                                <a href="#" className="flex items-center justify-center rounded-full bg-white" style={{ width: '40px', height: '40px' }}>
                                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                </a>
                                {/* Instagram */}
                                <a href="#" className="flex items-center justify-center rounded-full bg-white" style={{ width: '40px', height: '40px' }}>
                                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z"/></svg>
                                </a>
                                {/* Pinterest */}
                                <a href="#" className="flex items-center justify-center rounded-full bg-white" style={{ width: '40px', height: '40px' }}>
                                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
                                </a>
                                {/* YouTube */}
                                <a href="#" className="flex items-center justify-center rounded-full bg-white" style={{ width: '40px', height: '40px' }}>
                                    <svg viewBox="0 0 24 24" width="20" height="20"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                                </a>
                            </div>
                            {/* Partner Logos */}
                            <div className="flex items-center gap-4">
                                <a href="#" className="flex items-center justify-center rounded-lg bg-white px-4" style={{ height: '44px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>Houselogic</span>
                                </a>
                                <a href="#" className="flex items-center justify-center rounded-lg bg-white px-4" style={{ height: '44px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#333' }}>.RealEstate</span>
                                </a>
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2">
                            {['About us', 'Careers', 'Accessibility', 'Feedback', 'Media room', 'Ad Choices', 'Advertise with us', 'Agent support', 'Privacy', 'Terms'].map((link) => (
                                <a key={link} href="#" className="text-white hover:underline" style={{ fontSize: '14px', fontWeight: 400 }}>
                                    {link}
                                </a>
                            ))}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-x-8 gap-y-2">
                            {['Home Made', 'Tech Blog', 'Agent Blog', 'Sitemap'].map((link) => (
                                <a key={link} href="#" className="text-white hover:underline" style={{ fontSize: '14px', fontWeight: 400 }}>
                                    {link}
                                </a>
                            ))}
                            <a href="#" className="hover:underline" style={{ fontSize: '14px', fontWeight: 400, color: '#f5c518' }}>
                                Do Not Sell or Share My Personal Information
                            </a>
                        </div>

                        {/* Get the app */}
                        <div className="mt-10">
                            <h4 className="text-white" style={{ fontSize: '18px', fontWeight: 700 }}>Get the app</h4>
                            <div className="mt-3 flex items-center gap-3">
                                <a href="#" className="flex items-center gap-2 rounded-lg border border-white bg-black px-3" style={{ height: '40px' }}>
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                                    <div>
                                        <p className="text-white" style={{ fontSize: '7px', lineHeight: '1' }}>Download on the</p>
                                        <p className="text-white" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.2' }}>App Store</p>
                                    </div>
                                </a>
                                <a href="#" className="flex items-center gap-2 rounded-lg border border-white bg-black px-3" style={{ height: '40px' }}>
                                    <svg viewBox="0 0 24 24" width="18" height="18" fill="white"><path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 010 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3-8.636-8.632z"/></svg>
                                    <div>
                                        <p className="text-white" style={{ fontSize: '7px', lineHeight: '1' }}>GET IT ON</p>
                                        <p className="text-white" style={{ fontSize: '14px', fontWeight: 600, lineHeight: '1.2' }}>Google Play</p>
                                    </div>
                                </a>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="mt-10">
                            <h4 className="text-white" style={{ fontSize: '18px', fontWeight: 700 }}>Products</h4>
                            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                                {['Leads & Branding', 'ListHub', 'Moving.com', 'International Properties', 'Avail', 'UpNest', 'Builder Solutions'].map((item) => (
                                    <a key={item} href="#" className="text-white hover:underline" style={{ fontSize: '14px', fontWeight: 400 }}>
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* News Corp */}
                        <div className="mt-10">
                            <h4 className="text-white" style={{ fontSize: '18px', fontWeight: 700 }}>News Corp</h4>
                            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
                                {['Barrons', 'Financial News', 'Harper Collins', 'Mansion Global', 'MarketWatch', 'New York Post', 'REA Group', 'Storyful'].map((item) => (
                                    <a key={item} href="#" className="text-white hover:underline" style={{ fontSize: '14px', fontWeight: 400 }}>
                                        {item}
                                    </a>
                                ))}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-x-8 gap-y-2">
                                {['Wall Street Journal', 'Housing.com', 'News Corp Australia', 'News UK'].map((item) => (
                                    <a key={item} href="#" className="text-white hover:underline" style={{ fontSize: '14px', fontWeight: 400 }}>
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
