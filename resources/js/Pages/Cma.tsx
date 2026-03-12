import Header from '@/Components/Header';
import Footer from '@/Components/Footer';
import { Head } from '@inertiajs/react';
import { useState } from 'react';

export default function Cma() {
    const [form, setForm] = useState({
        address: '',
        propertyType: '',
        propertyStyle: '',
        yearBuilt: '',
        squareFeet: '',
        beds: '',
        baths: '',
        parking: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleReset = () => {
        setForm({
            address: '',
            propertyType: '',
            propertyStyle: '',
            yearBuilt: '',
            squareFeet: '',
            beds: '',
            baths: '',
            parking: '',
        });
    };

    return (
        <>
            <Head title="CMA - Comparative Market Analysis" />
            <Header />

            {/* Section 1 - Hero */}
            <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto flex items-center gap-12 px-4" style={{ maxWidth: '1280px' }}>
                    {/* Left side */}
                    <div style={{ width: '55%' }}>
                        <p
                            className="uppercase tracking-widest"
                            style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', letterSpacing: '2px', marginBottom: '16px' }}
                        >
                            Comparative Market Analysis
                        </p>
                        <h1
                            style={{ fontSize: '44px', fontWeight: 800, color: '#1A1816', lineHeight: '1.15', marginBottom: '20px' }}
                        >
                            Find the most comparable homes on or off the market
                        </h1>
                        <p
                            style={{ fontSize: '17px', lineHeight: '28px', color: '#6b7280', marginBottom: '32px', maxWidth: '520px' }}
                        >
                            Know that you're getting ALL of the key insights needed to inform your decision making.
                            When you sell with EcoListing, you are working with a team of experts that sells thousands
                            of properties across the country.
                        </p>
                        <a
                            href="#cma-form"
                            className="inline-flex items-center justify-center rounded-xl text-white transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#1A1816', height: '48px', paddingLeft: '32px', paddingRight: '32px', fontSize: '15px', fontWeight: 600 }}
                        >
                            Start Listing
                        </a>
                    </div>

                    {/* Right side - Overlapping cards */}
                    <div style={{ width: '45%', position: 'relative', height: '420px' }}>
                        {/* Card 2 (behind) */}
                        <div
                            className="rounded-2xl border border-gray-200 bg-white"
                            style={{
                                position: 'absolute',
                                top: '40px',
                                right: '0px',
                                width: '300px',
                                transform: 'rotate(2deg)',
                                zIndex: 5,
                                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <img
                                    src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=400"
                                    alt="Comparable property"
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <div
                                    className="flex items-center gap-1 rounded-lg"
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        backgroundColor: '#16a34a',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        padding: '5px 10px',
                                    }}
                                >
                                    Match Score 84%
                                </div>
                            </div>
                            <div style={{ padding: '16px' }}>
                                <p style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>$1,250,000</p>
                                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>3 bd | 2 ba | 2,100 sqft</p>
                            </div>
                        </div>

                        {/* Card 1 (front) */}
                        <div
                            className="rounded-2xl border border-gray-200 bg-white"
                            style={{
                                position: 'absolute',
                                top: '20px',
                                left: '20px',
                                width: '300px',
                                transform: 'rotate(-3deg)',
                                zIndex: 10,
                                boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
                                overflow: 'hidden',
                            }}
                        >
                            <div style={{ position: 'relative' }}>
                                <img
                                    src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=400"
                                    alt="Comparable property"
                                    style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                />
                                <div
                                    className="flex items-center gap-1 rounded-lg"
                                    style={{
                                        position: 'absolute',
                                        top: '12px',
                                        right: '12px',
                                        backgroundColor: '#16a34a',
                                        color: 'white',
                                        fontSize: '12px',
                                        fontWeight: 700,
                                        padding: '5px 10px',
                                    }}
                                >
                                    Match Score 93%
                                </div>
                            </div>
                            <div style={{ padding: '16px' }}>
                                <p style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816' }}>$1,250,000</p>
                                <p style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>3 bd | 2 ba | 2,100 sqft</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 2 - CMA Search Form */}
            <section id="cma-form" style={{ backgroundColor: '#fafaf9', paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="text-center" style={{ marginBottom: '40px' }}>
                        <p
                            className="uppercase tracking-widest"
                            style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', letterSpacing: '2px', marginBottom: '16px' }}
                        >
                            Find Comparables
                        </p>
                        <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.2' }}>
                            Enter an address to get information on comparable homes
                        </h2>
                    </div>

                    <div
                        className="mx-auto rounded-2xl border border-gray-200 bg-white"
                        style={{ maxWidth: '900px', padding: '32px', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                    >
                        {/* Row 1: Address */}
                        <div style={{ marginBottom: '20px' }}>
                            <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>
                                Address *
                            </label>
                            <input
                                type="text"
                                name="address"
                                value={form.address}
                                onChange={handleChange}
                                placeholder="Enter property address..."
                                className="w-full rounded-xl border border-gray-300 px-4 outline-none transition-colors focus:border-gray-500"
                                style={{ height: '48px', fontSize: '15px', color: '#1A1816' }}
                            />
                        </div>

                        {/* Row 2: Property Type, Property Style, Year Built */}
                        <div className="grid grid-cols-3 gap-4" style={{ marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>
                                    Property Type
                                </label>
                                <select
                                    name="propertyType"
                                    value={form.propertyType}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 outline-none transition-colors focus:border-gray-500"
                                    style={{ height: '48px', fontSize: '15px', color: form.propertyType ? '#1A1816' : '#9ca3af' }}
                                >
                                    <option value="">Select type</option>
                                    <option value="detached">Detached</option>
                                    <option value="semi-detached">Semi-Detached</option>
                                    <option value="townhouse">Townhouse</option>
                                    <option value="condo">Condo</option>
                                    <option value="duplex">Duplex</option>
                                    <option value="triplex">Triplex</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>
                                    Property Style
                                </label>
                                <select
                                    name="propertyStyle"
                                    value={form.propertyStyle}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 outline-none transition-colors focus:border-gray-500"
                                    style={{ height: '48px', fontSize: '15px', color: form.propertyStyle ? '#1A1816' : '#9ca3af' }}
                                >
                                    <option value="">Select style</option>
                                    <option value="bungalow">Bungalow</option>
                                    <option value="two-storey">Two-Storey</option>
                                    <option value="split-level">Split-Level</option>
                                    <option value="multi-level">Multi-Level</option>
                                    <option value="bachelor">Bachelor / Studio</option>
                                    <option value="1-bedroom">1 Bedroom</option>
                                    <option value="2-bedroom">2 Bedroom</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>
                                    Year Built
                                </label>
                                <select
                                    name="yearBuilt"
                                    value={form.yearBuilt}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 outline-none transition-colors focus:border-gray-500"
                                    style={{ height: '48px', fontSize: '15px', color: form.yearBuilt ? '#1A1816' : '#9ca3af' }}
                                >
                                    <option value="">Select year</option>
                                    <option value="2020-present">2020 - Present</option>
                                    <option value="2010-2019">2010 - 2019</option>
                                    <option value="2000-2009">2000 - 2009</option>
                                    <option value="1990-1999">1990 - 1999</option>
                                    <option value="1980-1989">1980 - 1989</option>
                                    <option value="pre-1980">Before 1980</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 3: Square Feet, Beds, Baths */}
                        <div className="grid grid-cols-3 gap-4" style={{ marginBottom: '20px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>
                                    Square Feet
                                </label>
                                <select
                                    name="squareFeet"
                                    value={form.squareFeet}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 outline-none transition-colors focus:border-gray-500"
                                    style={{ height: '48px', fontSize: '15px', color: form.squareFeet ? '#1A1816' : '#9ca3af' }}
                                >
                                    <option value="">Select size</option>
                                    <option value="0-1000">Under 1,000 sqft</option>
                                    <option value="1000-1500">1,000 - 1,500 sqft</option>
                                    <option value="1500-2000">1,500 - 2,000 sqft</option>
                                    <option value="2000-2500">2,000 - 2,500 sqft</option>
                                    <option value="2500-3000">2,500 - 3,000 sqft</option>
                                    <option value="3000+">3,000+ sqft</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>
                                    Beds
                                </label>
                                <select
                                    name="beds"
                                    value={form.beds}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 outline-none transition-colors focus:border-gray-500"
                                    style={{ height: '48px', fontSize: '15px', color: form.beds ? '#1A1816' : '#9ca3af' }}
                                >
                                    <option value="">Any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5+</option>
                                </select>
                            </div>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>
                                    Baths
                                </label>
                                <select
                                    name="baths"
                                    value={form.baths}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 outline-none transition-colors focus:border-gray-500"
                                    style={{ height: '48px', fontSize: '15px', color: form.baths ? '#1A1816' : '#9ca3af' }}
                                >
                                    <option value="">Any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4+</option>
                                </select>
                            </div>
                        </div>

                        {/* Row 4: Parking */}
                        <div className="grid grid-cols-3 gap-4" style={{ marginBottom: '28px' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '13px', fontWeight: 500, color: '#6b7280', marginBottom: '6px' }}>
                                    Parking
                                </label>
                                <select
                                    name="parking"
                                    value={form.parking}
                                    onChange={handleChange}
                                    className="w-full appearance-none rounded-xl border border-gray-300 bg-white px-4 outline-none transition-colors focus:border-gray-500"
                                    style={{ height: '48px', fontSize: '15px', color: form.parking ? '#1A1816' : '#9ca3af' }}
                                >
                                    <option value="">Any</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4+</option>
                                </select>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="inline-flex items-center justify-center rounded-xl text-white transition-opacity hover:opacity-90"
                                style={{ backgroundColor: '#1A1816', height: '48px', paddingLeft: '32px', paddingRight: '32px', fontSize: '15px', fontWeight: 600 }}
                            >
                                Find Comparables
                            </button>
                            <button
                                type="button"
                                onClick={handleReset}
                                className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white transition-colors hover:bg-gray-50"
                                style={{ height: '48px', paddingLeft: '24px', paddingRight: '24px', fontSize: '15px', fontWeight: 600, color: '#1A1816' }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <p className="mt-4 text-center" style={{ fontSize: '13px', color: '#9ca3af' }}>
                        <a href="#" className="underline transition-colors hover:text-gray-600">
                            Find out more about the sources of our data
                        </a>
                    </p>
                </div>
            </section>

            {/* Section 3 - How It Works */}
            <section className="bg-white" style={{ paddingTop: '80px', paddingBottom: '80px' }}>
                <div className="mx-auto px-4" style={{ maxWidth: '1280px' }}>
                    <div className="text-center" style={{ marginBottom: '48px' }}>
                        <p
                            className="uppercase tracking-widest"
                            style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', letterSpacing: '2px', marginBottom: '16px' }}
                        >
                            How It Works
                        </p>
                        <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1A1816', lineHeight: '1.2' }}>
                            Three simple steps to your CMA report
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                        {/* Step 1 */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                            <div
                                className="mx-auto mb-5 flex items-center justify-center rounded-2xl border border-gray-200"
                                style={{ width: '64px', height: '64px', backgroundColor: '#f5f5f4' }}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                            </div>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#9ca3af', marginBottom: '8px' }}>01</p>
                            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816', marginBottom: '12px' }}>Enter Your Address</h3>
                            <p style={{ fontSize: '15px', lineHeight: '24px', color: '#6b7280' }}>
                                Start by entering your property address and details to find the most relevant comparables.
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                            <div
                                className="mx-auto mb-5 flex items-center justify-center rounded-2xl border border-gray-200"
                                style={{ width: '64px', height: '64px', backgroundColor: '#f5f5f4' }}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="20" x2="18" y2="10" />
                                    <line x1="12" y1="20" x2="12" y2="4" />
                                    <line x1="6" y1="20" x2="6" y2="14" />
                                </svg>
                            </div>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#9ca3af', marginBottom: '8px' }}>02</p>
                            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816', marginBottom: '12px' }}>Review Comparables</h3>
                            <p style={{ fontSize: '15px', lineHeight: '24px', color: '#6b7280' }}>
                                Our algorithm finds the most similar properties and ranks them with a match score.
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center">
                            <div
                                className="mx-auto mb-5 flex items-center justify-center rounded-2xl border border-gray-200"
                                style={{ width: '64px', height: '64px', backgroundColor: '#f5f5f4' }}
                            >
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1A1816" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                    <line x1="16" y1="13" x2="8" y2="13" />
                                    <line x1="16" y1="17" x2="8" y2="17" />
                                    <polyline points="10 9 9 9 8 9" />
                                </svg>
                            </div>
                            <p style={{ fontSize: '14px', fontWeight: 700, color: '#9ca3af', marginBottom: '8px' }}>03</p>
                            <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#1A1816', marginBottom: '12px' }}>Get Your Report</h3>
                            <p style={{ fontSize: '15px', lineHeight: '24px', color: '#6b7280' }}>
                                Receive a detailed CMA report with pricing insights and market data for your area.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 4 - CTA */}
            <section style={{ backgroundColor: '#1A1816', paddingTop: '64px', paddingBottom: '64px' }}>
                <div className="mx-auto px-4 text-center" style={{ maxWidth: '1280px' }}>
                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#ffffff', lineHeight: '1.2', marginBottom: '16px' }}>
                        Ready to know what your home is worth?
                    </h2>
                    <p style={{ fontSize: '17px', color: '#94a3b8', marginBottom: '32px' }}>
                        Get a comprehensive market analysis backed by real data.
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <a
                            href="#cma-form"
                            className="inline-flex items-center justify-center rounded-xl transition-opacity hover:opacity-90"
                            style={{ backgroundColor: '#ffffff', color: '#1A1816', height: '48px', paddingLeft: '32px', paddingRight: '32px', fontSize: '15px', fontWeight: 600 }}
                        >
                            Get Free CMA
                        </a>
                        <a
                            href="#"
                            className="inline-flex items-center justify-center rounded-xl border border-white text-white transition-opacity hover:opacity-80"
                            style={{ height: '48px', paddingLeft: '32px', paddingRight: '32px', fontSize: '15px', fontWeight: 600 }}
                        >
                            Talk to an Agent
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    );
}
