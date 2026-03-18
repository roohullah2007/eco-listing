import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

interface SitemapLink {
    label: string;
    href: string;
}

interface SitemapCategory {
    title: string;
    links: SitemapLink[];
}

const categories: SitemapCategory[] = [
    {
        title: 'CORE',
        links: [
            { label: 'Home', href: '/' },
            { label: 'How We Sell', href: '/how-we-sell' },
            { label: 'Listing Services', href: '/listing-services' },
            { label: 'Toolkit', href: '/toolkit' },
        ],
    },
    {
        title: 'SOLUTIONS',
        links: [
            { label: 'Map Search', href: '/map-search' },
            { label: 'Value Estimate', href: '/value-estimate' },
            { label: 'Market Analysis', href: '/market-analysis' },
            { label: 'CMA Report', href: '/cma' },
        ],
    },
    {
        title: 'KNOWLEDGE',
        links: [
            { label: 'Insights Blog', href: '/insights' },
            { label: 'Seller Guides', href: '/seller-guides' },
            { label: "Buyer's Guide", href: '/buyer-guide' },
            { label: 'FAQ Center', href: '/faq' },
            { label: 'Research', href: '/research' },
        ],
    },
    {
        title: 'COMPLIANCE',
        links: [
            { label: 'Trading Act', href: '/trading-act' },
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
        ],
    },
];

const accountLinks: SitemapLink[] = [
    { label: 'Login', href: '/login' },
    { label: 'Register', href: '/register' },
    { label: 'Dashboard', href: '/dashboard' },
];

function ArrowIcon() {
    return (
        <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0"
        >
            <path
                d="M6 3L11 8L6 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SitemapLinkItem({ link }: { link: SitemapLink }) {
    return (
        <li>
            <Link
                href={link.href}
                className="inline-flex items-center gap-2 hover:underline transition-colors"
                style={{ fontSize: '15px', color: '#1A1816', fontWeight: 500 }}
            >
                <ArrowIcon />
                {link.label}
            </Link>
        </li>
    );
}

function CategoryCard({ category }: { category: SitemapCategory }) {
    return (
        <div className="rounded-2xl border border-gray-200" style={{ padding: '32px' }}>
            <h3
                className="uppercase tracking-widest pb-3 mb-4 border-b border-gray-200"
                style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af' }}
            >
                {category.title}
            </h3>
            <ul className="flex flex-col gap-3">
                {category.links.map((link) => (
                    <SitemapLinkItem key={link.href} link={link} />
                ))}
            </ul>
        </div>
    );
}

export default function Sitemap() {
    return (
        <>
            <Head title="Sitemap" />
            <Header />

            {/* Hero */}
            <section className="bg-white py-20 text-center">
                <div className="max-w-3xl mx-auto px-6">
                    <p
                        className="uppercase tracking-widest mb-3"
                        style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af' }}
                    >
                        NAVIGATION
                    </p>
                    <h1
                        style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816' }}
                    >
                        Sitemap
                    </h1>
                    <p
                        className="mt-4"
                        style={{ fontSize: '17px', color: '#6b7280' }}
                    >
                        A complete overview of all pages on EcoListing.ca
                    </p>
                </div>
            </section>

            {/* Sitemap Grid */}
            <section className="bg-white pb-16">
                <div className="mx-auto px-6" style={{ maxWidth: '1280px' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {categories.map((category) => (
                            <CategoryCard key={category.title} category={category} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Account Section */}
            <section style={{ backgroundColor: '#fafaf9' }} className="py-16">
                <div className="mx-auto px-6" style={{ maxWidth: '1280px' }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                        <div className="rounded-2xl border border-gray-200 bg-white" style={{ padding: '32px' }}>
                            <h3
                                className="uppercase tracking-widest pb-3 mb-4 border-b border-gray-200"
                                style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af' }}
                            >
                                ACCOUNT
                            </h3>
                            <ul className="flex flex-col gap-3">
                                {accountLinks.map((link) => (
                                    <SitemapLinkItem key={link.href} link={link} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
