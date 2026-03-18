import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

/* ─── Guide Steps Data ─── */
const guideSteps = [
    {
        num: '01',
        title: 'Preparing Your Home',
        description: 'Getting your property market-ready is the first step to a successful sale.',
        bullets: [
            'Declutter and depersonalize',
            'Minor repairs and touch-ups',
            'Professional staging tips',
            'Curb appeal improvements',
        ],
        quote: '"First impressions are everything in real estate."',
    },
    {
        num: '02',
        title: 'Pricing Strategy',
        description: 'Setting the right price is crucial for attracting buyers and maximizing your return.',
        bullets: [
            'Comparative Market Analysis',
            'Understanding market conditions',
            'Strategic pricing approaches',
            'Avoiding common pricing mistakes',
        ],
        stat: '93%',
        statLabel: 'of correctly priced homes sell within 30 days',
    },
    {
        num: '03',
        title: 'Marketing Your Property',
        description: 'Professional marketing ensures your listing reaches the widest possible audience.',
        bullets: [
            'Professional photography & video',
            'MLS and online listings',
            'Social media campaigns',
            'Open houses & virtual tours',
        ],
        quote: '"Great marketing turns a listing into a must-see destination."',
    },
    {
        num: '04',
        title: 'Managing Showings & Offers',
        description: 'Navigating the showing process and evaluating offers requires expert guidance.',
        bullets: [
            'Showing preparation tips',
            'Understanding offer terms',
            'Multiple offer strategies',
            'Conditional vs firm offers',
        ],
        stat: '4.2x',
        statLabel: 'more offers received with professional representation',
    },
    {
        num: '05',
        title: 'Closing the Deal',
        description: 'The final steps to successfully completing your real estate transaction.',
        bullets: [
            'Accepting an offer',
            'Home inspection process',
            'Legal requirements in BC',
            'Closing day checklist',
        ],
        quote: '"A smooth closing is the result of careful preparation at every stage."',
    },
];

/* ─── Check Icon ─── */
function CheckIcon() {
    return (
        <svg
            className="w-5 h-5 mt-0.5 flex-shrink-0"
            style={{ color: '#1A1816' }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
    );
}

/* ─── Guide Step Component ─── */
function GuideStep({ step, index }: { step: (typeof guideSteps)[0]; index: number }) {
    const isEven = index % 2 === 1;

    const contentBlock = (
        <div className="flex-1 space-y-6">
            <span
                className="text-sm font-semibold tracking-widest"
                style={{ color: '#9ca3af' }}
            >
                STEP {step.num}
            </span>
            <h3
                className="text-3xl font-bold"
                style={{ color: '#1A1816', fontWeight: 700 }}
            >
                {step.title}
            </h3>
            <p className="text-lg leading-relaxed" style={{ color: '#6b7280' }}>
                {step.description}
            </p>
            <ul className="space-y-3">
                {step.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                        <CheckIcon />
                        <span className="text-base" style={{ color: '#1A1816' }}>
                            {bullet}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );

    const cardBlock = (
        <div
            className="flex-1 rounded-2xl flex flex-col items-center justify-center p-12 min-h-[320px]"
            style={{ backgroundColor: '#1A1816' }}
        >
            <span
                className="text-8xl font-extrabold mb-6"
                style={{ color: 'rgba(255,255,255,0.08)' }}
            >
                {step.num}
            </span>
            {step.quote && (
                <p
                    className="text-center text-lg italic leading-relaxed max-w-xs"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                >
                    {step.quote}
                </p>
            )}
            {step.stat && (
                <div className="text-center">
                    <span
                        className="text-5xl font-extrabold block mb-2"
                        style={{ color: 'rgba(255,255,255,0.9)' }}
                    >
                        {step.stat}
                    </span>
                    <span
                        className="text-sm max-w-[200px] block mx-auto"
                        style={{ color: 'rgba(255,255,255,0.45)' }}
                    >
                        {step.statLabel}
                    </span>
                </div>
            )}
        </div>
    );

    return (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            {isEven ? (
                <>
                    {cardBlock}
                    {contentBlock}
                </>
            ) : (
                <>
                    {contentBlock}
                    {cardBlock}
                </>
            )}
        </div>
    );
}

/* ─── Main Page ─── */
export default function SellerGuides() {
    return (
        <>
            <Head title="Seller's Guide to BC Real Estate" />
            <Header />

            {/* ── Hero Section ── */}
            <section
                className="relative overflow-hidden"
                style={{ backgroundColor: '#1A1816' }}
            >
                <div className="max-w-5xl mx-auto px-6 py-28 text-center">
                    <span
                        className="inline-block text-xs font-semibold tracking-[0.25em] uppercase mb-6"
                        style={{ color: '#9ca3af' }}
                    >
                        For Sellers
                    </span>
                    <h1
                        className="text-white leading-tight mb-6"
                        style={{ fontSize: '44px', fontWeight: 800 }}
                    >
                        Seller's Guide to BC Real Estate
                    </h1>
                    <p
                        className="text-lg max-w-2xl mx-auto leading-relaxed"
                        style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                        Comprehensive guides to help you navigate every step of selling your
                        property in British Columbia — from preparation to closing.
                    </p>
                </div>
            </section>

            {/* ── Guide Steps Section ── */}
            <section className="bg-white">
                <div className="max-w-6xl mx-auto px-6 py-24 space-y-28">
                    {guideSteps.map((step, index) => (
                        <GuideStep key={step.num} step={step} index={index} />
                    ))}
                </div>
            </section>

            {/* ── CTA Section ── */}
            <section style={{ backgroundColor: '#fafaf9' }}>
                <div className="max-w-4xl mx-auto px-6 py-24 text-center">
                    <h2
                        className="text-3xl mb-8"
                        style={{ color: '#1A1816', fontWeight: 700 }}
                    >
                        Ready to Sell Your Home?
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/value-estimate"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#1A1816' }}
                        >
                            Get Free Home Evaluation
                        </Link>
                        <Link
                            href="/listing-services"
                            className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl text-sm font-semibold border-2 transition-colors hover:bg-stone-100"
                            style={{ color: '#1A1816', borderColor: '#1A1816' }}
                        >
                            View Our Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── Dark Banner ── */}
            <section style={{ backgroundColor: '#1A1816' }}>
                <div className="max-w-4xl mx-auto px-6 py-16 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <h3
                        className="text-xl text-white"
                        style={{ fontWeight: 600 }}
                    >
                        Need personalized advice?
                    </h3>
                    <Link
                        href="/value-estimate"
                        className="inline-flex items-center justify-center px-8 py-3.5 rounded-2xl text-sm font-semibold transition-opacity hover:opacity-90"
                        style={{
                            backgroundColor: '#ffffff',
                            color: '#1A1816',
                        }}
                    >
                        Schedule A Call
                    </Link>
                </div>
            </section>

            <Footer />
        </>
    );
}
