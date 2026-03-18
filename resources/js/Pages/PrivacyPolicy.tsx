import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';

export default function PrivacyPolicy() {
    const sections = [
        {
            title: 'Introduction',
            content: (
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                    EcoListing.ca (&apos;we&apos;, &apos;our&apos;, or &apos;us&apos;) is committed to protecting the privacy of our users. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
                </p>
            ),
        },
        {
            title: 'Information We Collect',
            content: (
                <>
                    <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        We may collect personal information that you voluntarily provide when using our services, including:
                    </p>
                    <ul className="list-disc pl-6" style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        <li>Name and contact information (email, phone number, address)</li>
                        <li>Property details for listing purposes</li>
                        <li>Financial information related to transactions</li>
                        <li>Account credentials</li>
                        <li>Communication preferences</li>
                        <li>Browsing and usage data</li>
                    </ul>
                </>
            ),
        },
        {
            title: 'How We Use Your Information',
            content: (
                <>
                    <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        We use collected information to:
                    </p>
                    <ul className="list-disc pl-6" style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        <li>Provide and maintain our real estate services</li>
                        <li>Process transactions and send related information</li>
                        <li>Send marketing communications (with your consent)</li>
                        <li>Improve our website and user experience</li>
                        <li>Comply with legal obligations</li>
                        <li>Protect against fraudulent or unauthorized activity</li>
                    </ul>
                </>
            ),
        },
        {
            title: 'Information Sharing',
            content: (
                <>
                    <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        We may share your information with:
                    </p>
                    <ul className="list-disc pl-6" style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        <li>Licensed real estate agents facilitating your transaction</li>
                        <li>The Multiple Listing Service (MLS) for property listings</li>
                        <li>Legal and financial professionals involved in transactions</li>
                        <li>Service providers who assist our operations (photography, marketing)</li>
                        <li>Regulatory bodies as required by law</li>
                    </ul>
                    <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        We do not sell your personal information to third parties.
                    </p>
                </>
            ),
        },
        {
            title: 'Data Security',
            content: (
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                    We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
            ),
        },
        {
            title: 'Cookies & Tracking',
            content: (
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                    Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences.
                </p>
            ),
        },
        {
            title: 'Your Rights',
            content: (
                <>
                    <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        Under applicable privacy laws, you have the right to:
                    </p>
                    <ul className="list-disc pl-6" style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        <li>Access your personal information</li>
                        <li>Request correction of inaccurate data</li>
                        <li>Request deletion of your data</li>
                        <li>Opt out of marketing communications</li>
                        <li>Withdraw consent at any time</li>
                    </ul>
                    <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                        To exercise these rights, contact us at privacy@ecolisting.ca.
                    </p>
                </>
            ),
        },
        {
            title: 'Contact Us',
            content: (
                <p style={{ fontSize: 15, color: '#6b7280', lineHeight: '28px', marginBottom: 16 }}>
                    If you have questions about this Privacy Policy, please contact us at:<br />
                    EcoListing.ca<br />
                    Email: privacy@ecolisting.ca<br />
                    Phone: 1-800-ECO-LIST
                </p>
            ),
        },
    ];

    return (
        <>
            <Head title="Privacy Policy" />
            <Header />

            {/* Hero */}
            <section className="bg-white py-20">
                <div className="mx-auto text-center" style={{ maxWidth: 800 }}>
                    <p className="uppercase tracking-widest mb-4" style={{ fontSize: 13, fontWeight: 600, color: '#9ca3af' }}>
                        LEGAL
                    </p>
                    <h1 style={{ fontSize: 36, fontWeight: 800, color: '#1A1816', marginBottom: 12 }}>
                        Privacy Policy
                    </h1>
                    <p style={{ fontSize: 15, color: '#6b7280' }}>
                        Last updated: March 2026
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="bg-white pb-20">
                <div className="mx-auto px-6" style={{ maxWidth: 800 }}>
                    {sections.map((section, index) => (
                        <div
                            key={section.title}
                            className={index < sections.length - 1 ? 'border-b border-gray-200' : ''}
                            style={{ paddingTop: 32, paddingBottom: 32 }}
                        >
                            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#1A1816', marginBottom: 16 }}>
                                {section.title}
                            </h3>
                            {section.content}
                        </div>
                    ))}
                </div>
            </section>

            <Footer />
        </>
    );
}
