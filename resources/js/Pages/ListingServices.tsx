import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

/* ─── Service Data ─── */
const services = [
    {
        num: '01',
        title: 'MLS Listing',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>
        ),
        description: 'Your property gets listed on the MLS (Multiple Listing Service), which syndicates to REALTOR.ca, Zillow, and hundreds of partner sites — ensuring maximum exposure to qualified buyers across Canada.',
    },
    {
        num: '02',
        title: 'Professional Photography',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
        ),
        description: 'Our professional photographers capture your home in the best light with HDR photography, wide-angle lenses, and expert staging guidance — creating images that make buyers stop scrolling and start calling.',
    },
    {
        num: '03',
        title: '3D Virtual Tour',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
        ),
        description: 'Immersive 3D virtual tours let buyers explore your property room-by-room from anywhere in the world. Perfect for out-of-town buyers and pre-qualifying serious interest before in-person showings.',
    },
    {
        num: '04',
        title: 'Drone Photography',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" /><line x1="12" y1="22" x2="12" y2="15.5" /><polyline points="22 8.5 12 15.5 2 8.5" /><polyline points="2 15.5 12 8.5 22 15.5" /><line x1="12" y1="2" x2="12" y2="8.5" /></svg>
        ),
        description: 'Aerial drone photography and videography showcase your property\'s full lot, neighbourhood context, and surrounding amenities — giving buyers the complete picture from above.',
    },
    {
        num: '05',
        title: 'Video Walkthrough',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7" /><rect x="1" y="5" width="15" height="14" rx="2" ry="2" /></svg>
        ),
        description: 'Professionally edited video walkthroughs bring your listing to life on social media and listing platforms. Our cinematic approach highlights the flow, feel, and features that photos alone can\'t capture.',
    },
    {
        num: '06',
        title: 'Yard Signage',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
        ),
        description: 'Professional yard signage with a modern design and QR code directs drive-by traffic straight to your listing. Includes installation and removal — one less thing to worry about.',
    },
    {
        num: '07',
        title: 'Social Media Marketing',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
        ),
        description: 'Targeted social media campaigns across Instagram, Facebook, and TikTok put your listing in front of active buyers in your area. Includes professional ad creative, audience targeting, and performance reporting.',
    },
    {
        num: '08',
        title: 'Agent-Led Showings',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
        ),
        description: 'Our licensed REALTORS personally host showings, answer buyer questions, and provide feedback after every visit. No lockbox-only showings — your home gets the professional representation it deserves.',
    },
    {
        num: '09',
        title: 'Transaction Support',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" /></svg>
        ),
        description: 'From offer review and negotiation to closing coordination, our team handles every step of the transaction. We work with your lawyer, the buyer\'s agent, and all parties to ensure a smooth close.',
    },
];

/* ─── Comparison Table Data ─── */
const comparisonRows = [
    { feature: 'List on realtor.ca and all MLS sites', trad: true, eco: true, other: true },
    { feature: 'Neighbourhood Signage', trad: true, eco: true, other: false },
    { feature: 'Pricing Consultation', trad: true, eco: true, other: false },
    { feature: 'Agent led negotiations & Offers', trad: true, eco: true, other: false },
    { feature: 'Premium Marketing', trad: true, eco: true, other: false },
    { feature: 'Pre-Qualified buyers + Virtual Showings', trad: false, eco: true, other: false },
    { feature: 'Lower fees', trad: false, eco: true, other: true },
];

/* ─── FAQ Data ─── */
const faqs = [
    { q: 'Will my listing appear on all major platforms like REALTOR.ca?', a: 'Yes! Your listing will appear on REALTOR.ca, Zillow, and hundreds of partner sites through the MLS. This ensures maximum exposure to buyers across Canada and internationally.' },
    { q: 'Is the EcoListing platform purely online, or do I get human interaction as well?', a: 'While our platform leverages technology for efficiency, you always have access to a licensed REALTOR who personally handles showings, negotiations, and your questions. We combine the best of both worlds.' },
    { q: 'How long will it take to list my home once I sign up?', a: 'Most listings go live within 3-5 business days after signing up. This includes professional photography, preparing marketing materials, and setting up your MLS listing with all the details.' },
    { q: 'What happens after my property is listed—how do showings work?', a: 'Once listed, our agent coordinates all showings with interested buyers. We handle scheduling, host the showings personally, and provide you with feedback after each visit.' },
    { q: 'How is my privacy protected during showings?', a: 'We pre-qualify all buyers before showings, require identification, and our agent is present during every showing. We also follow a strict showing protocol to protect your belongings and privacy.' },
    { q: 'Do I have to pay a buyer\'s agent commission when using EcoListing?', a: 'The buyer\'s agent commission is a separate consideration from our listing fee. We\'ll discuss the best strategy for your market during your consultation to ensure competitive positioning.' },
    { q: 'What price should I list my home at with EcoListing?', a: 'Our agents provide a comprehensive Comparative Market Analysis (CMA) to help you price your home competitively. We analyze recent sales, active listings, and market conditions specific to your neighbourhood.' },
    { q: 'Are there any additional fees for changes or extensions to my listing?', a: 'No hidden fees. Our flat-fee package includes listing updates, price changes, and reasonable extensions at no additional cost. Everything is transparent from day one.' },
    { q: 'Do I have to manage the showings myself, or does EcoListing handle that?', a: 'EcoListing handles all showings. Our licensed agents personally host every showing, so you never have to worry about managing strangers in your home or answering buyer questions.' },
    { q: 'I\'m a builder—can I list multiple properties for sale with EcoListing?', a: 'Absolutely! We offer builder-friendly packages for multiple listings. Contact us for volume pricing and a dedicated agent who specializes in new construction and development projects.' },
    { q: 'Will you help me find a property to buy if I\'m also looking to purchase a new home?', a: 'Yes, our agents can assist you with both selling and buying. We offer a seamless experience and can coordinate timing between your sale and purchase to minimize stress.' },
    { q: 'Do you know any lawyers or home inspectors I can use during the process?', a: 'We maintain a trusted network of real estate lawyers, home inspectors, mortgage brokers, and other professionals. We\'re happy to provide referrals based on your location and needs.' },
    { q: 'I\'m already working with another agent—can I still get benefits or cashback from EcoListing?', a: 'If you\'re currently under contract with another agent, we recommend reviewing your agreement first. Once your contract expires, we\'d love to show you how EcoListing can save you money.' },
    { q: 'If I\'m selling my home and also buying a new one, can EcoListing help with both transactions?', a: 'Yes! We specialize in coordinating sell-and-buy transactions. Our agents help with timing, bridge financing options, and ensuring both transactions close smoothly.' },
];

/* ─── Check/X Icons ─── */
function CheckIcon() {
    return (
        <div className="flex items-center justify-center rounded-full" style={{ width: '24px', height: '24px', backgroundColor: '#dcfce7' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
    );
}
function XIcon() {
    return (
        <div className="flex items-center justify-center rounded-full" style={{ width: '24px', height: '24px', backgroundColor: '#fee2e2' }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
        </div>
    );
}

/* ─── Page ─── */
export default function ListingServices() {
    const [activeService, setActiveService] = useState(0);
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <>
            <Head title="Listing Services - EcoListing.ca" />
            <Header />

            {/* ═══ Section 1: Hero + Service Tabs ═══ */}
            <section className="bg-white" style={{ paddingTop: '72px', paddingBottom: '72px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="grid items-start gap-16 lg:grid-cols-2">
                        {/* Left: Service Tabs */}
                        <div>
                            <p className="uppercase tracking-widest" style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '2px', marginBottom: '16px' }}>
                                Your Listing Package
                            </p>
                            <h1 style={{ fontSize: '44px', fontWeight: 800, color: '#1A1816', lineHeight: '1.1', marginBottom: '12px' }}>
                                Everything included.
                            </h1>
                            <p style={{ fontSize: '16px', color: '#6b7280', lineHeight: '26px', marginBottom: '36px' }}>
                                Select each service to see what's inside your flat-fee package.
                            </p>

                            <div className="flex flex-col gap-2">
                                {services.map((s, i) => (
                                    <button
                                        key={s.num}
                                        onClick={() => setActiveService(i)}
                                        className="flex items-center gap-4 rounded-xl px-5 transition-all"
                                        style={{
                                            height: '56px',
                                            backgroundColor: activeService === i ? '#1A1816' : '#f5f5f4',
                                            border: activeService === i ? '1.5px solid #1A1816' : '1.5px solid transparent',
                                        }}
                                    >
                                        <span style={{ fontSize: '13px', fontWeight: 700, color: activeService === i ? '#6b7280' : '#d4d4d4', minWidth: '20px' }}>{s.num}</span>
                                        <span style={{ fontSize: '14px', fontWeight: 600, color: activeService === i ? '#ffffff' : '#1A1816' }}>{s.title}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Right: Active Service Detail */}
                        <div className="sticky top-24">
                            <div className="rounded-2xl border border-gray-200 bg-white" style={{ padding: '40px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
                                <div className="flex items-center justify-center rounded-2xl" style={{ width: '64px', height: '64px', backgroundColor: '#f5f5f4', marginBottom: '24px' }}>
                                    {services[activeService].icon}
                                </div>
                                <div className="flex items-center gap-3" style={{ marginBottom: '16px' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 700, color: '#9ca3af' }}>{services[activeService].num}</span>
                                    <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1A1816' }}>{services[activeService].title}</h2>
                                </div>
                                <p style={{ fontSize: '15px', color: '#6b7280', lineHeight: '26px', marginBottom: '32px' }}>
                                    {services[activeService].description}
                                </p>
                                <div className="flex items-center gap-3">
                                    <a href="#" className="inline-flex items-center justify-center rounded-xl text-white transition-opacity hover:opacity-90" style={{ backgroundColor: '#1A1816', height: '48px', paddingLeft: '28px', paddingRight: '28px', fontSize: '14px', fontWeight: 600 }}>
                                        Get Started
                                    </a>
                                    <a href="#" className="inline-flex items-center justify-center rounded-xl border border-gray-300 transition-colors hover:bg-gray-50" style={{ height: '48px', paddingLeft: '28px', paddingRight: '28px', fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>
                                        Schedule A Call
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 2: Comparison Table ═══ */}
            <section id="how-we-sell" style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <p className="uppercase tracking-widest" style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '2px', marginBottom: '16px' }}>
                            How EcoListing compares to the alternatives
                        </p>
                        <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.2' }}>
                            See exactly what you get—and what you don't—across every option.
                        </h2>
                    </div>

                    <div className="mx-auto overflow-hidden rounded-2xl border border-gray-200 bg-white" style={{ maxWidth: '900px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
                        {/* Table Header */}
                        <div className="grid items-center border-b border-gray-200" style={{ gridTemplateColumns: '1fr 130px 130px 130px', padding: '20px 28px' }}>
                            <div />
                            <div className="text-center" style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', lineHeight: '16px' }}>Traditional<br />Agent</div>
                            <div className="text-center">
                                <div className="mx-auto inline-flex items-center justify-center rounded-lg px-3 py-1" style={{ backgroundColor: '#1A1816' }}>
                                    <span style={{ fontSize: '12px', fontWeight: 700, color: '#ffffff' }}>EcoListing<br />Agent</span>
                                </div>
                            </div>
                            <div className="text-center" style={{ fontSize: '12px', fontWeight: 600, color: '#9ca3af', lineHeight: '16px' }}>Other Online<br />Platforms</div>
                        </div>

                        {/* Table Rows */}
                        {comparisonRows.map((row, i) => (
                            <div key={i} className="grid items-center border-b border-gray-100 last:border-b-0" style={{ gridTemplateColumns: '1fr 130px 130px 130px', padding: '16px 28px' }}>
                                <div style={{ fontSize: '14px', color: '#1A1816', fontWeight: 500 }}>{row.feature}</div>
                                <div className="flex justify-center">{row.trad ? <CheckIcon /> : <XIcon />}</div>
                                <div className="flex justify-center">{row.eco ? <CheckIcon /> : <XIcon />}</div>
                                <div className="flex justify-center">{row.other ? <CheckIcon /> : <XIcon />}</div>
                            </div>
                        ))}
                    </div>

                    <p className="mt-4 text-center" style={{ fontSize: '12px', color: '#9ca3af' }}>
                        *This comparison is based on typical offerings. Actual packages may vary by market and brokerage.
                    </p>
                </div>
            </section>

            {/* ═══ Section 3: FAQ ═══ */}
            <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '800px' }}>
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <p className="uppercase tracking-widest" style={{ fontSize: '12px', fontWeight: 700, color: '#9ca3af', letterSpacing: '2px', marginBottom: '16px' }}>
                            FAQ
                        </p>
                        <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.2' }}>
                            Common Questions
                        </h2>
                    </div>

                    <div className="flex flex-col">
                        {faqs.map((faq, i) => (
                            <div key={i} className="border-b border-gray-200">
                                <button
                                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                                    className="flex w-full items-center justify-between py-5 text-left transition-colors"
                                >
                                    <span style={{ fontSize: '15px', fontWeight: 600, color: '#1A1816', paddingRight: '16px', lineHeight: '22px' }}>{faq.q}</span>
                                    <div className="flex shrink-0 items-center justify-center rounded-full" style={{ width: '28px', height: '28px', backgroundColor: openFaq === i ? '#1A1816' : '#f5f5f4', transition: 'all 0.2s' }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={openFaq === i ? '#ffffff' : '#1A1816'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            {openFaq === i ? (
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            ) : (
                                                <><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></>
                                            )}
                                        </svg>
                                    </div>
                                </button>
                                {openFaq === i && (
                                    <div style={{ paddingBottom: '20px' }}>
                                        <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: '24px' }}>{faq.a}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══ Section 4: CMA CTA ═══ */}
            <section style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="grid items-center gap-16 lg:grid-cols-2">
                        {/* Left: Content */}
                        <div>
                            <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.15' }}>
                                Discover Your Home's True Market Value
                            </h2>
                            <p className="mt-4" style={{ fontSize: '16px', lineHeight: '26px', color: '#6b7280' }}>
                                Get an accurate estimate by expert agent using latest market data and comparable sales.
                            </p>
                            <a href="/cma" className="mt-4 inline-block underline" style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816' }}>See sample CMA report</a>

                            {/* CMA Input */}
                            <div className="mt-8 flex items-center overflow-hidden rounded-full border border-gray-300 bg-white" style={{ maxWidth: '480px', height: '52px' }}>
                                <input type="text" placeholder="Enter property address" className="h-full flex-1 border-0 bg-transparent pl-5 pr-2 focus:outline-none focus:ring-0" style={{ fontSize: '14px', color: '#1A1816' }} />
                                <button className="mr-1 flex items-center justify-center gap-2 rounded-full text-white transition-colors hover:bg-gray-800" style={{ width: '200px', height: '44px', backgroundColor: '#1A1816', fontSize: '13px', fontWeight: 600 }}>
                                    Get Agent CMA Report
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 flex items-center gap-6">
                                {['Licensed REALTOR\u00AE', '100% Free Market Analysis', 'No sign-up required', 'Detailed CMA Reports'].map((text) => (
                                    <div key={text} className="flex items-center gap-1.5">
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#6b7280' }}>{text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: Decorative Cards */}
                        <div className="relative" style={{ height: '380px' }}>
                            <div className="rounded-2xl border border-gray-200 bg-white" style={{ position: 'absolute', top: '30px', right: '0px', width: '320px', transform: 'rotate(2deg)', zIndex: 5, boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '24px' }}>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center justify-center rounded-xl" style={{ width: '44px', height: '44px', backgroundColor: '#dcfce7' }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#1A1816' }}>Market Analysis</div>
                                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Based on 24 comparable sales</div>
                                    </div>
                                </div>
                                <div style={{ fontSize: '32px', fontWeight: 800, color: '#1A1816' }}>$1,250,000</div>
                                <div style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>+3.2% vs last quarter</div>
                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-gray-100">
                                    <div className="h-full rounded-full" style={{ width: '78%', background: 'linear-gradient(90deg, #16a34a, #22c55e)' }} />
                                </div>
                                <div className="mt-2 flex justify-between" style={{ fontSize: '11px', color: '#9ca3af' }}>
                                    <span>$1.1M</span><span>$1.4M</span>
                                </div>
                            </div>
                            <div className="rounded-2xl border border-gray-200 bg-white" style={{ position: 'absolute', top: '10px', left: '20px', width: '280px', transform: 'rotate(-3deg)', zIndex: 10, boxShadow: '0 8px 30px rgba(0,0,0,0.12)', padding: '24px' }}>
                                <div style={{ fontSize: '11px', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase' as const, letterSpacing: '1px', marginBottom: '12px' }}>CMA Report</div>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: '#1A1816', marginBottom: '4px' }}>4508 W 12th Avenue</div>
                                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '16px' }}>Vancouver, BC V6R 2R3</div>
                                <div className="flex gap-6">
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>Beds</div>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1816' }}>4</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>Baths</div>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1816' }}>3</div>
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '11px', color: '#9ca3af' }}>Sqft</div>
                                        <div style={{ fontSize: '16px', fontWeight: 700, color: '#1A1816' }}>2,400</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ Section 5: Dark CTA Banner ═══ */}
            <section style={{ backgroundColor: '#1A1816', paddingTop: '64px', paddingBottom: '64px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '700px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '16px' }}>
                        Ready to list your property?
                    </h2>
                    <p style={{ fontSize: '17px', color: '#94a3b8', marginBottom: '32px' }}>
                        Get everything you need — professional photos, MLS listing, agent-led showings, and full transaction support — all in one flat-fee package.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <a href="#" className="inline-flex items-center justify-center rounded-full transition-opacity hover:opacity-90" style={{ backgroundColor: '#ffffff', color: '#1A1816', height: '48px', paddingLeft: '32px', paddingRight: '32px', fontSize: '15px', fontWeight: 600 }}>
                            Get Started Today
                        </a>
                        <a href="#" className="inline-flex items-center justify-center rounded-full border border-white/30 text-white transition-opacity hover:opacity-80" style={{ height: '48px', paddingLeft: '32px', paddingRight: '32px', fontSize: '15px', fontWeight: 600 }}>
                            Book A Consultation
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
