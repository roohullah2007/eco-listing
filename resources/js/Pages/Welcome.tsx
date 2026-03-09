import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface FeaturedListing {
    id: number;
    title: string;
    price: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    image: string;
    ecoScore: number;
}

const sampleListings: FeaturedListing[] = [
    {
        id: 1,
        title: 'Modern Eco-Friendly Condo',
        price: '$549,000',
        location: 'Toronto, ON',
        bedrooms: 2,
        bathrooms: 2,
        sqft: 950,
        image: '',
        ecoScore: 92,
    },
    {
        id: 2,
        title: 'Energy-Efficient Family Home',
        price: '$879,000',
        location: 'Vancouver, BC',
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2200,
        image: '',
        ecoScore: 88,
    },
    {
        id: 3,
        title: 'Solar-Powered Townhouse',
        price: '$675,000',
        location: 'Ottawa, ON',
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1600,
        image: '',
        ecoScore: 95,
    },
    {
        id: 4,
        title: 'LEED Certified Loft',
        price: '$425,000',
        location: 'Montreal, QC',
        bedrooms: 1,
        bathrooms: 1,
        sqft: 780,
        image: '',
        ecoScore: 90,
    },
    {
        id: 5,
        title: 'Net-Zero Heritage Home',
        price: '$1,200,000',
        location: 'Calgary, AB',
        bedrooms: 5,
        bathrooms: 4,
        sqft: 3100,
        image: '',
        ecoScore: 97,
    },
    {
        id: 6,
        title: 'Green Certified Bungalow',
        price: '$389,000',
        location: 'Halifax, NS',
        bedrooms: 3,
        bathrooms: 2,
        sqft: 1400,
        image: '',
        ecoScore: 85,
    },
];

function EcoScoreBadge({ score }: { score: number }) {
    const color =
        score >= 90
            ? 'bg-green-500'
            : score >= 80
              ? 'bg-green-400'
              : 'bg-yellow-500';
    return (
        <span
            className={`${color} inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold text-white`}
        >
            Eco {score}
        </span>
    );
}

function ListingCard({ listing }: { listing: FeaturedListing }) {
    return (
        <div className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="relative h-48 bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900 dark:to-emerald-800">
                <div className="absolute inset-0 flex items-center justify-center text-green-600 dark:text-green-300">
                    <svg
                        className="h-16 w-16 opacity-30"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
                        />
                    </svg>
                </div>
                <div className="absolute top-3 left-3">
                    <EcoScoreBadge score={listing.ecoScore} />
                </div>
                <button className="absolute top-3 right-3 rounded-full bg-white/80 p-2 text-gray-500 transition hover:bg-white hover:text-red-500 dark:bg-gray-800/80 dark:hover:bg-gray-800">
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                    </svg>
                </button>
            </div>
            <div className="p-4">
                <div className="mb-1 flex items-center justify-between">
                    <span className="text-lg font-bold text-green-700 dark:text-green-400">
                        {listing.price}
                    </span>
                </div>
                <h3 className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">
                    {listing.title}
                </h3>
                <p className="mb-3 text-xs text-gray-500 dark:text-gray-400">
                    {listing.location}
                </p>
                <div className="flex items-center gap-4 border-t border-gray-100 pt-3 text-xs text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    <span>{listing.bedrooms} Beds</span>
                    <span>{listing.bathrooms} Baths</span>
                    <span>{listing.sqft.toLocaleString()} sqft</span>
                </div>
            </div>
        </div>
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
                <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <svg
                                className="h-8 w-8 text-green-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                EcoListing<span className="text-green-600">.ca</span>
                            </span>
                        </div>

                        <div className="hidden items-center gap-6 md:flex">
                            <a
                                href="#listings"
                                className="text-sm text-gray-600 transition hover:text-green-600 dark:text-gray-300"
                            >
                                Listings
                            </a>
                            <a
                                href="#how-it-works"
                                className="text-sm text-gray-600 transition hover:text-green-600 dark:text-gray-300"
                            >
                                How It Works
                            </a>
                            <a
                                href="#about"
                                className="text-sm text-gray-600 transition hover:text-green-600 dark:text-gray-300"
                            >
                                About
                            </a>
                        </div>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="text-sm font-medium text-gray-700 transition hover:text-green-600 dark:text-gray-300"
                                    >
                                        Log in
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
                                    >
                                        Sign up
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700">
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.4%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]" />
                    </div>
                    <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                                Find Your{' '}
                                <span className="text-green-200">Eco-Friendly</span>{' '}
                                Home
                            </h1>
                            <p className="mt-6 text-lg text-green-100 sm:text-xl">
                                Discover sustainable, energy-efficient properties
                                across Canada. Every listing rated with our exclusive
                                Eco Score.
                            </p>
                            <div className="mt-10">
                                <div className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row">
                                    <input
                                        type="text"
                                        placeholder="Search by city, neighbourhood, or address..."
                                        className="flex-1 rounded-lg border-0 px-4 py-3 text-gray-900 shadow-lg placeholder:text-gray-400 focus:ring-2 focus:ring-green-300"
                                    />
                                    <button className="rounded-lg bg-gray-900 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-gray-800">
                                        Search
                                    </button>
                                </div>
                            </div>
                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                {['Toronto', 'Vancouver', 'Ottawa', 'Montreal', 'Calgary'].map(
                                    (city) => (
                                        <button
                                            key={city}
                                            className="rounded-full border border-white/30 px-4 py-1.5 text-sm text-white transition hover:bg-white/20"
                                        >
                                            {city}
                                        </button>
                                    ),
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Bar */}
                <section className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
                        {[
                            { label: 'Eco-Rated Listings', value: '12,500+' },
                            { label: 'Cities Covered', value: '150+' },
                            { label: 'Happy Homeowners', value: '3,200+' },
                            { label: 'Avg Energy Savings', value: '35%' },
                        ].map((stat) => (
                            <div key={stat.label} className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {stat.value}
                                </div>
                                <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Featured Listings */}
                <section id="listings" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Featured Eco Listings
                            </h2>
                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                Top-rated sustainable homes across Canada
                            </p>
                        </div>
                        <Link
                            href="#"
                            className="text-sm font-medium text-green-600 transition hover:text-green-700"
                        >
                            View all listings &rarr;
                        </Link>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {sampleListings.map((listing) => (
                            <ListingCard key={listing.id} listing={listing} />
                        ))}
                    </div>
                </section>

                {/* How It Works */}
                <section
                    id="how-it-works"
                    className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                        <h2 className="mb-12 text-center text-2xl font-bold text-gray-900 dark:text-white">
                            How EcoListing Works
                        </h2>
                        <div className="grid gap-8 md:grid-cols-3">
                            {[
                                {
                                    step: '1',
                                    title: 'Browse Listings',
                                    description:
                                        'Search thousands of eco-rated properties across Canada with detailed sustainability metrics.',
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                        />
                                    ),
                                },
                                {
                                    step: '2',
                                    title: 'Save & Compare',
                                    description:
                                        'Favourite listings, save searches, and compare Eco Scores to find the perfect green home.',
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    ),
                                },
                                {
                                    step: '3',
                                    title: 'Connect & Move In',
                                    description:
                                        'Connect with sellers and agents directly. Start living sustainably in your new home.',
                                    icon: (
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1h-2z"
                                        />
                                    ),
                                },
                            ].map((item) => (
                                <div key={item.step} className="text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                                        <svg
                                            className="h-8 w-8 text-green-600 dark:text-green-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            {item.icon}
                                        </svg>
                                    </div>
                                    <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {item.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-green-600">
                    <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
                        <h2 className="text-3xl font-bold text-white">
                            Ready to Find Your Green Home?
                        </h2>
                        <p className="mx-auto mt-4 max-w-xl text-green-100">
                            Join thousands of Canadians who have found their perfect
                            eco-friendly property through EcoListing.ca
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg bg-white px-8 py-3 font-semibold text-green-700 shadow transition hover:bg-green-50"
                                >
                                    Go to Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="rounded-lg bg-white px-8 py-3 font-semibold text-green-700 shadow transition hover:bg-green-50"
                                    >
                                        Get Started Free
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="rounded-lg border-2 border-white px-8 py-3 font-semibold text-white transition hover:bg-white/10"
                                    >
                                        Log In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer
                    id="about"
                    className="border-t border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-2">
                                    <svg
                                        className="h-6 w-6 text-green-600"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                        />
                                    </svg>
                                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                                        EcoListing<span className="text-green-600">.ca</span>
                                    </span>
                                </div>
                                <p className="mt-3 max-w-md text-sm text-gray-500 dark:text-gray-400">
                                    Canada's premier marketplace for eco-friendly and
                                    sustainable real estate. Making green living
                                    accessible for everyone.
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                                    Platform
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                    <li>
                                        <a href="#" className="hover:text-green-600">
                                            Browse Listings
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-green-600">
                                            Eco Score Guide
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-green-600">
                                            For Agents
                                        </a>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="mb-3 text-sm font-semibold text-gray-900 dark:text-white">
                                    Company
                                </h4>
                                <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
                                    <li>
                                        <a href="#" className="hover:text-green-600">
                                            About Us
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-green-600">
                                            Contact
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="hover:text-green-600">
                                            Privacy Policy
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-gray-400 dark:border-gray-700">
                            &copy; {new Date().getFullYear()} EcoListing.ca. All
                            rights reserved.
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
