import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const articles = [
    {
        title: '5 Tips to Stage Your Home for a Quick Sale',
        category: 'SELLER GUIDE',
        excerpt: 'Learn the proven staging techniques that help homes sell faster and for higher prices in today\'s competitive market.',
        date: 'Mar 10, 2026',
        readTime: '6 min read',
    },
    {
        title: 'First-Time Buyer\'s Complete Checklist',
        category: 'BUYER\'S GUIDE',
        excerpt: 'Everything you need to know before purchasing your first home in British Columbia, from pre-approval to closing.',
        date: 'Mar 5, 2026',
        readTime: '8 min read',
    },
    {
        title: 'How Interest Rates Affect Property Values',
        category: 'MARKET INSIGHTS',
        excerpt: 'An in-depth look at the relationship between interest rate changes and real estate valuations across BC.',
        date: 'Feb 28, 2026',
        readTime: '5 min read',
    },
    {
        title: 'The True Cost of Selling Your Home in BC',
        category: 'SELLER GUIDE',
        excerpt: 'A transparent breakdown of all the fees, commissions, and hidden costs involved in selling a property.',
        date: 'Feb 20, 2026',
        readTime: '7 min read',
    },
    {
        title: 'Neighborhood Spotlight: Vancouver West Side',
        category: 'AREA GUIDE',
        excerpt: 'Explore what makes Vancouver\'s West Side one of the most desirable neighborhoods in British Columbia.',
        date: 'Feb 14, 2026',
        readTime: '6 min read',
    },
    {
        title: 'Digital Marketing Strategies for Home Sellers',
        category: 'MARKETING',
        excerpt: 'How modern digital marketing techniques can help you reach more buyers and sell your home faster.',
        date: 'Feb 8, 2026',
        readTime: '5 min read',
    },
];

function PlaceholderImage({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center justify-center bg-stone-100 ${className}`}>
            <svg
                className="h-12 w-12 text-stone-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                />
            </svg>
        </div>
    );
}

export default function InsightsBlog() {
    return (
        <>
            <Head title="Insights & Blog - EcoListing.ca" />
            <Header />

            {/* Hero Section */}
            <section className="bg-white" style={{ paddingTop: '120px', paddingBottom: '64px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '1280px' }}>
                    <p
                        className="tracking-widest"
                        style={{ fontSize: '13px', fontWeight: 600, color: '#9ca3af', letterSpacing: '3px' }}
                    >
                        INSIGHTS & NEWS
                    </p>
                    <h1
                        className="mt-4"
                        style={{ fontSize: '44px', fontWeight: 800, color: '#1A1816', lineHeight: 1.15 }}
                    >
                        Real Estate Insights
                    </h1>
                    <p
                        className="mx-auto mt-5"
                        style={{ maxWidth: '600px', fontSize: '17px', lineHeight: '28px', color: '#6b7280' }}
                    >
                        Expert analysis, market updates, and guides to help you navigate BC's real estate market.
                    </p>
                </div>
            </section>

            {/* Featured Article */}
            <section className="bg-white" style={{ paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div
                        className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 md:flex-row"
                        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                    >
                        <div className="md:w-1/2">
                            <img
                                src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=800"
                                alt="BC Housing Market 2026"
                                className="h-full w-full object-cover"
                                style={{ minHeight: '320px' }}
                            />
                        </div>
                        <div className="flex flex-col justify-center p-8 md:w-1/2 md:p-12">
                            <div className="flex items-center gap-3">
                                <span
                                    className="rounded-full px-3 py-1"
                                    style={{
                                        fontSize: '11px',
                                        fontWeight: 700,
                                        letterSpacing: '1.5px',
                                        color: '#1A1816',
                                        backgroundColor: '#f5f5f4',
                                    }}
                                >
                                    MARKET UPDATE
                                </span>
                                <span style={{ fontSize: '13px', color: '#9ca3af' }}>Mar 15, 2026</span>
                            </div>
                            <h2
                                className="mt-5"
                                style={{ fontSize: '28px', fontWeight: 700, color: '#1A1816', lineHeight: 1.3 }}
                            >
                                Understanding BC's Housing Market in 2026
                            </h2>
                            <p
                                className="mt-4"
                                style={{ fontSize: '15px', lineHeight: '26px', color: '#6b7280' }}
                            >
                                A comprehensive analysis of current trends, pricing dynamics, and what buyers
                                and sellers can expect in British Columbia's evolving real estate landscape
                                this year.
                            </p>
                            <a
                                href="#"
                                className="mt-6 inline-flex items-center transition-opacity hover:opacity-70"
                                style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}
                            >
                                Read More
                                <span className="ml-1">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {articles.map((article, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white"
                                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                            >
                                <PlaceholderImage className="h-48 w-full" />
                                <div className="flex flex-1 flex-col p-6">
                                    <span
                                        className="self-start rounded-full px-3 py-1"
                                        style={{
                                            fontSize: '11px',
                                            fontWeight: 700,
                                            letterSpacing: '1.5px',
                                            color: '#1A1816',
                                            backgroundColor: '#f5f5f4',
                                        }}
                                    >
                                        {article.category}
                                    </span>
                                    <h3
                                        className="mt-4"
                                        style={{
                                            fontSize: '18px',
                                            fontWeight: 700,
                                            color: '#1A1816',
                                            lineHeight: 1.4,
                                        }}
                                    >
                                        {article.title}
                                    </h3>
                                    <p
                                        className="mt-2"
                                        style={{
                                            fontSize: '14px',
                                            lineHeight: '22px',
                                            color: '#6b7280',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {article.excerpt}
                                    </p>
                                    <div className="mt-auto pt-5">
                                        <div className="flex items-center justify-between">
                                            <span style={{ fontSize: '13px', color: '#9ca3af' }}>
                                                {article.date} &middot; {article.readTime}
                                            </span>
                                            <a
                                                href="#"
                                                className="inline-flex items-center transition-opacity hover:opacity-70"
                                                style={{ fontSize: '13px', fontWeight: 600, color: '#1A1816' }}
                                            >
                                                Read More
                                                <span className="ml-1">&rarr;</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <section style={{ backgroundColor: '#1A1816', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '560px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', lineHeight: 1.3 }}>
                        Stay Informed
                    </h2>
                    <p
                        className="mt-4"
                        style={{ fontSize: '15px', lineHeight: '26px', color: '#9ca3af' }}
                    >
                        Subscribe to our newsletter for the latest market updates, expert insights, and
                        real estate tips delivered straight to your inbox.
                    </p>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="flex-1 rounded-xl border-0 px-5 text-sm outline-none"
                            style={{
                                height: '50px',
                                backgroundColor: '#2a2825',
                                color: '#ffffff',
                            }}
                        />
                        <button
                            className="rounded-xl bg-white px-8 text-sm font-semibold transition-opacity hover:opacity-90"
                            style={{
                                height: '50px',
                                color: '#1A1816',
                                letterSpacing: '0.5px',
                            }}
                        >
                            Subscribe
                        </button>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
