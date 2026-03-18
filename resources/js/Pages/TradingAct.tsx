import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import Footer from '@/Components/Footer';

const sections = [
    {
        title: 'Overview',
        content:
            'The Real Estate Services Act (RESA) governs real estate trading in British Columbia. It establishes the regulatory framework under which all real estate professionals must operate, ensuring consumer protection and professional standards across the province.',
    },
    {
        title: 'Licensing Requirements',
        content:
            'All real estate agents and brokerages operating in British Columbia must be licensed under the BC Financial Services Authority (BCFSA). EcoListing operates under a fully licensed brokerage, ensuring all transactions comply with provincial regulations. Our agents maintain current licensing, complete continuing education requirements, and adhere to the Professional Standards Manual.',
    },
    {
        title: 'Consumer Protection',
        content:
            'The Act provides several key protections for consumers including: mandatory disclosure of agency relationships, requirements for written service agreements, trust account regulations for deposit handling, mandatory errors and omissions insurance, and complaint and disciplinary processes through BCFSA.',
    },
    {
        title: 'Agency Relationships',
        content:
            'Under RESA, real estate professionals must clearly disclose their agency relationship to all parties in a transaction. EcoListing agents provide clear written disclosure at the earliest practical opportunity, ensuring you understand exactly who is representing your interests throughout the buying or selling process.',
    },
    {
        title: 'Disclosure Obligations',
        content:
            'Sellers in BC are required to complete a Property Disclosure Statement (PDS) providing known material facts about the property. While not legally mandatory, it is standard practice and helps protect both buyers and sellers. Our agents guide you through completing this document accurately and thoroughly.',
    },
    {
        title: 'Dispute Resolution',
        content:
            'If a dispute arises during a real estate transaction, BC provides several avenues for resolution including mediation through the BC Real Estate Association, complaints to BCFSA, civil litigation, and the Civil Resolution Tribunal for certain matters.',
    },
];

export default function TradingAct() {
    return (
        <>
            <Head title="Real Estate Trading Act" />
            <Header />

            {/* Hero */}
            <section className="bg-white py-20">
                <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 24px' }}>
                    <div>
                        <span
                            className="inline-block tracking-widest uppercase mb-4"
                            style={{ fontSize: 13, fontWeight: 600, color: '#9ca3af', letterSpacing: '0.1em' }}
                        >
                            Compliance
                        </span>
                        <h1
                            style={{
                                fontSize: 36,
                                fontWeight: 800,
                                color: '#1A1816',
                                lineHeight: 1.2,
                                marginBottom: 16,
                            }}
                        >
                            Real Estate Trading Act
                        </h1>
                        <p style={{ fontSize: 17, color: '#6b7280', lineHeight: 1.6, marginBottom: 12 }}>
                            Understanding BC's regulatory framework for real estate transactions.
                        </p>
                        <p style={{ fontSize: 14, color: '#9ca3af' }}>Last updated: March 2026</p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="bg-white pb-20">
                <div className="mx-auto" style={{ maxWidth: '1280px', padding: '0 24px' }}>
                    {sections.map((section, index) => (
                        <div
                            key={section.title}
                            className={index < sections.length - 1 ? 'border-b border-gray-200' : ''}
                            style={{ padding: '32px 0' }}
                        >
                            <h3
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: '#1A1816',
                                    marginBottom: 12,
                                }}
                            >
                                {section.title}
                            </h3>
                            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px' }}>
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Contact CTA */}
            <section style={{ backgroundColor: '#fafaf9' }} className="py-20">
                <div className="mx-auto text-center" style={{ maxWidth: '1280px', padding: '0 24px' }}>
                    <h2
                        style={{
                            fontSize: 28,
                            fontWeight: 700,
                            color: '#1A1816',
                            marginBottom: 12,
                        }}
                    >
                        Have Questions About Compliance?
                    </h2>
                    <p style={{ fontSize: 16, color: '#6b7280', lineHeight: '26px', marginBottom: 28 }}>
                        Our team is well-versed in BC real estate regulations and can address any concerns.
                    </p>
                    <a
                        href="/contact"
                        className="inline-block rounded-2xl transition-opacity hover:opacity-90"
                        style={{
                            backgroundColor: '#1A1816',
                            color: '#ffffff',
                            fontSize: 15,
                            fontWeight: 600,
                            padding: '14px 32px',
                        }}
                    >
                        Contact Our Team
                    </a>
                </div>
            </section>

            <Footer />
        </>
    );
}
