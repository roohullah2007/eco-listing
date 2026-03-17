<?php

use App\Http\Controllers\ProfileController;
use App\Services\RepliersService;
use Illuminate\Foundation\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::get('/v2', function (RepliersService $repliers) {
    $featuredListings = [];
    try {
        // Fetch from different price brackets for variety (200k-400k, 400k-600k, 600k-999k)
        $ranges = [
            ['minPrice' => 200000, 'maxPrice' => 399999],
            ['minPrice' => 400000, 'maxPrice' => 599999],
            ['minPrice' => 600000, 'maxPrice' => 999999],
        ];
        foreach ($ranges as $range) {
            $result = $repliers->searchListings(array_merge($range, [
                'resultsPerPage' => 2,
                'sortBy' => 'updatedOnDesc',
            ]));
            $listings = $result['listings'] ?? [];
            $featuredListings = array_merge($featuredListings, $listings);
        }
        // Shuffle so the price order feels natural, not ascending
        shuffle($featuredListings);
    } catch (\Exception $e) {}

    return Inertia::render('WelcomeV2', [
        'featuredListings' => $featuredListings,
    ]);
})->name('home-v2');

Route::get('/v3', function (RepliersService $repliers) {
    $featuredListings = [];
    try {
        $ranges = [
            ['minPrice' => 200000, 'maxPrice' => 399999],
            ['minPrice' => 400000, 'maxPrice' => 599999],
            ['minPrice' => 600000, 'maxPrice' => 999999],
        ];
        foreach ($ranges as $range) {
            $result = $repliers->searchListings(array_merge($range, [
                'resultsPerPage' => 2,
                'sortBy' => 'updatedOnDesc',
            ]));
            $listings = $result['listings'] ?? [];
            $featuredListings = array_merge($featuredListings, $listings);
        }
        shuffle($featuredListings);
    } catch (\Exception $e) {}

    return Inertia::render('WelcomeV3', [
        'featuredListings' => $featuredListings,
    ]);
})->name('home-v3');

Route::get('/map-search', function (Request $request, RepliersService $repliers) {
    try {
        $filters = array_filter([
            'pageNum' => (int) $request->query('page', 1),
            'resultsPerPage' => 50,
            'type' => $request->query('type', 'sale'),
            'status' => 'A',
            'city' => $request->query('city'),
            'area' => $request->query('area'),
            'minPrice' => $request->query('minPrice'),
            'maxPrice' => $request->query('maxPrice'),
            'details.numBedrooms' => $request->query('bedrooms'),
            'details.numBathrooms' => $request->query('bathrooms'),
            'minSqft' => $request->query('minSqft'),
            'maxSqft' => $request->query('maxSqft'),
            'minLotSize' => $request->query('minLotSize'),
            'maxLotSize' => $request->query('maxLotSize'),
            'minYearBuilt' => $request->query('minYearBuilt'),
            'maxYearBuilt' => $request->query('maxYearBuilt'),
            'maxMaintFee' => $request->query('maxMaintFee'),
            'daysOnMarket' => $request->query('daysOnMarket'),
            'sortBy' => $request->query('sortBy', 'updatedOnDesc'),
        ]);

        // Handle street address search — parse into streetNumber + streetName
        // Repliers stores streetName without suffix (e.g. "Bradner" not "Bradner Road")
        if ($streetAddress = $request->query('streetAddress')) {
            $streetAddress = trim($streetAddress);
            // Extract leading numbers as street number
            if (preg_match('/^(\d+)\s+(.+)/', $streetAddress, $matches)) {
                $filters['streetNumber'] = $matches[1];
                $streetPart = $matches[2];
            } else {
                $streetPart = $streetAddress;
            }
            // Strip common street suffixes so the name matches the API field
            $suffixes = ['Street', 'St', 'Avenue', 'Ave', 'Road', 'Rd', 'Drive', 'Dr',
                'Boulevard', 'Blvd', 'Crescent', 'Cres', 'Place', 'Pl', 'Court', 'Ct',
                'Lane', 'Ln', 'Way', 'Terrace', 'Circle', 'Cir', 'Highway', 'Hwy'];
            $pattern = '/\b(' . implode('|', $suffixes) . ')\.?\s*$/i';
            $filters['streetName'] = trim(preg_replace($pattern, '', $streetPart));
        }

        // Handle style filter (property type) — supports multiple styles via repeated params
        if ($styles = $request->query('style')) {
            // Styles come as comma-separated from frontend, Repliers needs repeated style= params
            // We pass as array which Laravel HTTP client will handle as style[]=...
            $styleArr = explode(',', $styles);
            if (count($styleArr) === 1) {
                $filters['style'] = $styleArr[0];
            } else {
                $filters['style'] = $styleArr;
            }
        }

        // Handle polygon search - convert pipe-delimited coords to Repliers map format
        // Repliers expects: "map": [[[lng, lat], [lng, lat], ...]] (nested array, NOT GeoJSON)
        if ($polygon = $request->query('polygon')) {
            $points = explode('|', $polygon);
            $coordinates = [];
            foreach ($points as $point) {
                $parts = explode(',', $point);
                if (count($parts) === 2) {
                    $coordinates[] = [(float) $parts[0], (float) $parts[1]];
                }
            }
            // Close the polygon if not already closed
            if (count($coordinates) >= 3) {
                $first = $coordinates[0];
                $last = end($coordinates);
                if ($first[0] !== $last[0] || $first[1] !== $last[1]) {
                    $coordinates[] = $first;
                }
                // Repliers format: array of polygons, each polygon is array of [lng, lat] pairs
                $filters['map'] = [$coordinates];
            }
        }
        // Handle map bounds search (auto-search as user pans/zooms map)
        // Format: "swLat,swLng,neLat,neLng"
        elseif ($mapBounds = $request->query('mapBounds')) {
            $parts = explode(',', $mapBounds);
            if (count($parts) === 4) {
                $swLat = (float) $parts[0];
                $swLng = (float) $parts[1];
                $neLat = (float) $parts[2];
                $neLng = (float) $parts[3];
                // Build a bounding box polygon: [lng, lat] pairs
                $filters['map'] = [[
                    [$swLng, $swLat],
                    [$neLng, $swLat],
                    [$neLng, $neLat],
                    [$swLng, $neLat],
                    [$swLng, $swLat], // close the polygon
                ]];
            }
        }

        $results = $repliers->searchListings($filters);
        $listings = $results['listings'] ?? [];
    } catch (\Exception $e) {
        $results = [];
        $listings = [];
    }

    return Inertia::render('MapSearch', [
        'listings' => $listings,
        'pagination' => [
            'page' => $results['page'] ?? 1,
            'numPages' => $results['numPages'] ?? 1,
            'count' => $results['count'] ?? 0,
            'resultsPerPage' => $results['pageSize'] ?? 20,
        ],
        'filters' => $request->only([
            'city', 'area', 'streetAddress',
            'type', 'minPrice', 'maxPrice',
            'bedrooms', 'bathrooms', 'style',
            'minSqft', 'maxSqft', 'minLotSize', 'maxLotSize',
            'minYearBuilt', 'maxYearBuilt', 'maxMaintFee', 'daysOnMarket',
            'sortBy', 'polygon', 'mapBounds',
        ]),
    ]);
})->name('map-search');

Route::get('/property/{mlsNumber}', function (string $mlsNumber, RepliersService $repliers) {
    try {
        $listing = $repliers->getListing($mlsNumber);
    } catch (\Exception $e) {
        $listing = null;
    }

    $similar = [];
    try {
        $similarResponse = $repliers->getSimilarListings($mlsNumber);
        $similar = $similarResponse['listings'] ?? [];
    } catch (\Exception) {}

    return Inertia::render('PropertyDetails', [
        'mlsNumber' => $mlsNumber,
        'listing' => $listing,
        'similarListings' => array_slice($similar, 0, 3),
    ]);
})->name('property.details');

Route::get('/research', function () {
    return Inertia::render('Research');
})->name('research');

Route::get('/cma', function () {
    return Inertia::render('Cma');
})->name('cma');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
