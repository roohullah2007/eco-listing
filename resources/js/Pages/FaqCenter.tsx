import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

/* ─── FAQ Data ─── */
type FaqItem = { q: string; a: string };

const faqData: Record<string, FaqItem[]> = {
    Selling: [
        { q: 'How much does it cost to list with EcoListing?', a: 'Our flat-fee listing package includes everything from professional photography to agent-led showings and full transaction support. Contact us for current pricing — we\'re transparent with no hidden fees.' },
        { q: 'How long does it take to sell a home in BC?', a: 'The average days on market varies by city and property type. In Vancouver, homes typically sell within 30-45 days. Our marketing strategies are designed to reduce this timeline significantly.' },
        { q: 'Do I need to stage my home before selling?', a: 'While not required, staged homes typically sell faster and for higher prices. We provide staging guidance as part of our listing package to help maximize your property\'s appeal.' },
        { q: 'Can I sell my home while living in it?', a: 'Yes, most sellers continue living in their homes during the sale process. Our agents coordinate showings around your schedule and provide tips for keeping your home show-ready.' },
    ],
    Buying: [
        { q: 'How do I get pre-approved for a mortgage?', a: 'Contact a mortgage broker or your bank to start the pre-approval process. You\'ll need proof of income, employment verification, credit history, and details about your debts and assets.' },
        { q: 'What are closing costs when buying in BC?', a: 'Typical closing costs include property transfer tax (1-3%), legal fees ($1,000-2,000), home inspection ($400-600), and title insurance. Budget approximately 2-4% of the purchase price.' },
        { q: 'Should I get a home inspection?', a: 'We strongly recommend a professional home inspection for every purchase. It can reveal hidden issues and potentially save you thousands in unexpected repairs.' },
        { q: 'What is the property transfer tax in BC?', a: 'BC charges 1% on the first $200,000, 2% on the portion between $200,000-$2,000,000, and 3% on amounts above $2,000,000. First-time buyers may qualify for exemptions.' },
    ],
    'Our Services': [
        { q: 'What\'s included in the EcoListing package?', a: 'Our complete package includes MLS listing, professional photography, 3D virtual tour, drone photography, video walkthrough, yard signage, social media marketing, agent-led showings, and full transaction support.' },
        { q: 'Do you handle showings?', a: 'Yes, our licensed agents personally host every showing. We pre-qualify buyers, manage scheduling, and provide feedback after each visit.' },
        { q: 'What areas do you serve?', a: 'We currently serve all of British Columbia, with a focus on the Greater Vancouver Area, Fraser Valley, Victoria, and Kelowna markets.' },
        { q: 'Can I cancel my listing?', a: 'Yes, you can cancel your listing at any time. We believe in earning your business through results, not long-term contracts.' },
    ],
    Pricing: [
        { q: 'Are there any hidden fees?', a: 'No. Our pricing is completely transparent. The flat fee covers everything in our listing package with no surprises at closing.' },
        { q: 'Do I pay the buyer\'s agent commission?', a: 'The buyer\'s agent commission is separate from our listing fee. We\'ll discuss the best strategy for your market during your consultation.' },
        { q: 'How does your pricing compare to traditional agents?', a: 'Traditional agents typically charge 5-6% commission. Our flat-fee model can save sellers thousands while providing the same level of professional service.' },
        { q: 'Is the home evaluation really free?', a: 'Yes, our Comparative Market Analysis (CMA) is completely free with no obligation. It\'s prepared by a licensed agent using real market data.' },
    ],
    Process: [
        { q: 'How quickly can my home be listed?', a: 'Most listings go live within 3-5 business days after signing up. This includes scheduling photography, preparing marketing materials, and setting up your MLS listing.' },
        { q: 'What happens after I receive an offer?', a: 'Our agent reviews the offer with you, explains all terms and conditions, and advises on whether to accept, counter, or decline. We handle all negotiations on your behalf.' },
        { q: 'How long is the closing process?', a: 'In BC, the typical closing period is 30-90 days from acceptance of an offer, depending on the conditions and financing arrangements.' },
        { q: 'Do you help with paperwork?', a: 'Yes, our team handles all documentation from listing agreements to closing paperwork. We coordinate with lawyers, the buyer\'s agent, and all parties involved.' },
    ],
};

const categories = ['All', 'Selling', 'Buying', 'Our Services', 'Pricing', 'Process'];

export default function FaqCenter() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const filteredCategories = activeCategory === 'All'
        ? Object.keys(faqData)
        : [activeCategory];

    return (
        <>
            <Head title="FAQ Center - EcoListing.ca" />
            <Header />

            {/* ═══ Hero ═══ */}
            <section className="bg-white" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '700px' }}>
                    <p className="uppercase tracking-widest" style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '2px', marginBottom: '16px' }}>
                        HELP CENTER
                    </p>
                    <h1 style={{ fontSize: '44px', fontWeight: 800, color: '#1A1816', lineHeight: '1.15', marginBottom: '20px' }}>
                        Frequently Asked Questions
                    </h1>
                    <p style={{ fontSize: '17px', color: '#6b7280', lineHeight: '28px' }}>
                        Find answers to common questions about buying, selling, and our services.
                    </p>
                </div>
            </section>

            {/* ═══ Category Filter ═══ */}
            <section className="bg-white" style={{ paddingBottom: '48px' }}>
                <div className="mx-auto flex flex-wrap justify-center gap-3 px-4" style={{ maxWidth: '1280px' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => { setActiveCategory(cat); setOpenFaq(null); }}
                            className="rounded-2xl transition-all"
                            style={{
                                padding: '10px 22px',
                                fontSize: '14px',
                                fontWeight: 600,
                                backgroundColor: activeCategory === cat ? '#1A1816' : '#f5f5f4',
                                color: activeCategory === cat ? '#ffffff' : '#1A1816',
                                border: 'none',
                                cursor: 'pointer',
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* ═══ FAQ Accordion ═══ */}
            <section className="bg-white" style={{ paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    {filteredCategories.map((category) => (
                        <div key={category} style={{ marginBottom: '40px' }}>
                            {activeCategory === 'All' && (
                                <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#1A1816', marginBottom: '20px' }}>
                                    {category}
                                </h2>
                            )}
                            <div className="flex flex-col">
                                {faqData[category].map((faq, i) => {
                                    const key = `${category}-${i}`;
                                    const isOpen = openFaq === key;
                                    return (
                                        <div key={key} className="border-b border-gray-200">
                                            <button
                                                onClick={() => setOpenFaq(isOpen ? null : key)}
                                                className="flex w-full items-center justify-between py-5 text-left transition-colors"
                                            >
                                                <span style={{ fontSize: '15px', fontWeight: 600, color: '#1A1816', paddingRight: '16px', lineHeight: '22px' }}>
                                                    {faq.q}
                                                </span>
                                                <div
                                                    className="flex shrink-0 items-center justify-center rounded-full"
                                                    style={{
                                                        width: '28px',
                                                        height: '28px',
                                                        backgroundColor: isOpen ? '#1A1816' : '#f5f5f4',
                                                        transition: 'all 0.2s',
                                                    }}
                                                >
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#ffffff' : '#1A1816'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        {isOpen ? (
                                                            <line x1="5" y1="12" x2="19" y2="12" />
                                                        ) : (
                                                            <>
                                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                                <line x1="5" y1="12" x2="19" y2="12" />
                                                            </>
                                                        )}
                                                    </svg>
                                                </div>
                                            </button>
                                            {isOpen && (
                                                <div style={{ paddingBottom: '20px' }}>
                                                    <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '24px' }}>{faq.a}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ═══ Contact CTA ═══ */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#1A1816', lineHeight: '1.2', marginBottom: '16px' }}>
                        Can't find what you're looking for?
                    </h2>
                    <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '26px', marginBottom: '32px' }}>
                        Our team is here to help. Reach out to us directly and we'll get back to you as soon as possible.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/contact"
                            className="rounded-2xl transition-opacity hover:opacity-90"
                            style={{
                                padding: '14px 32px',
                                fontSize: '15px',
                                fontWeight: 600,
                                backgroundColor: '#1A1816',
                                color: '#ffffff',
                                display: 'inline-block',
                            }}
                        >
                            Contact Us
                        </Link>
                        <Link
                            href="/contact"
                            className="rounded-2xl transition-opacity hover:opacity-90"
                            style={{
                                padding: '14px 32px',
                                fontSize: '15px',
                                fontWeight: 600,
                                backgroundColor: 'transparent',
                                color: '#1A1816',
                                border: '1.5px solid #1A1816',
                                display: 'inline-block',
                            }}
                        >
                            Schedule A Call
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
