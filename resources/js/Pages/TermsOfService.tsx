import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

const sections = [
    {
        title: 'Acceptance of Terms',
        content:
            'By accessing and using EcoListing.ca, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.',
    },
    {
        title: 'Services Description',
        content:
            'EcoListing.ca provides an online platform for real estate listing services in British Columbia, including property listings on the MLS, professional photography, virtual tours, marketing services, and agent-led showings and transaction support. Our services are provided through licensed real estate professionals.',
    },
    {
        title: 'User Accounts',
        content:
            'To access certain features, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate and complete information and promptly update any changes.',
    },
    {
        title: 'Property Listings',
        content:
            'All property listings on EcoListing.ca are sourced from the MLS and other authorized sources. While we strive for accuracy, we do not guarantee the completeness or accuracy of listing information. Property details, pricing, and availability are subject to change without notice.',
    },
    {
        title: 'Intellectual Property',
        content:
            'All content on EcoListing.ca, including text, graphics, logos, images, and software, is the property of EcoListing or its licensors and is protected by Canadian copyright and intellectual property laws. You may not reproduce, distribute, or create derivative works without our written consent.',
    },
    {
        title: 'Limitation of Liability',
        content:
            "EcoListing.ca is provided 'as is' without warranties of any kind. To the fullest extent permitted by law, EcoListing shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the fees paid by you for our services.",
    },
    {
        title: 'Governing Law',
        content:
            'These Terms of Service are governed by the laws of the Province of British Columbia and the federal laws of Canada applicable therein. Any disputes shall be resolved in the courts of British Columbia.',
    },
    {
        title: 'Contact',
        content:
            'For questions about these Terms of Service, contact us at: EcoListing.ca, Email: legal@ecolisting.ca',
    },
];

export default function TermsOfService() {
    return (
        <>
            <Head title="Terms of Service" />
            <Header />

            {/* Hero */}
            <section className="bg-white py-20">
                <div className="mx-auto max-w-[800px] px-6 text-center">
                    <span
                        className="mb-4 inline-block text-xs font-semibold uppercase tracking-widest"
                        style={{ color: '#9ca3af' }}
                    >
                        LEGAL
                    </span>
                    <h1
                        className="mb-4"
                        style={{
                            fontSize: 36,
                            fontWeight: 800,
                            color: '#1A1816',
                            lineHeight: 1.2,
                        }}
                    >
                        Terms of Service
                    </h1>
                    <p style={{ color: '#6b7280', fontSize: 15 }}>
                        Last updated: March 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="bg-white pb-20">
                <div className="mx-auto max-w-[800px] px-6">
                    {sections.map((section, index) => (
                        <div
                            key={section.title}
                            className={
                                index < sections.length - 1
                                    ? 'border-b border-gray-200 py-8'
                                    : 'py-8'
                            }
                        >
                            <h3
                                className="mb-4"
                                style={{
                                    fontSize: 20,
                                    fontWeight: 700,
                                    color: '#1A1816',
                                }}
                            >
                                {section.title}
                            </h3>
                            <p
                                className="mb-4"
                                style={{
                                    fontSize: 15,
                                    color: '#6b7280',
                                    lineHeight: '28px',
                                }}
                            >
                                {section.content}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
