<?php

namespace App\Http\Controllers;

use App\Services\RepliersService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ListingController extends Controller
{
    public function __construct(
        private RepliersService $repliers,
    ) {}

    /**
     * Search listings with filters.
     * POST /api/listings/search
     */
    public function search(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'pageNum' => 'integer|min:1',
            'resultsPerPage' => 'integer|min:1|max:50',
            'type' => 'string|in:sale,lease',
            'class' => 'string',
            'status' => 'string',
            'city' => 'string',
            'area' => 'string',
            'neighborhood' => 'string',
            'minPrice' => 'numeric|min:0',
            'maxPrice' => 'numeric|min:0',
            'minBedrooms' => 'integer|min:0',
            'maxBedrooms' => 'integer|min:0',
            'minBaths' => 'integer|min:0',
            'maxBaths' => 'integer|min:0',
            'minSqft' => 'string',
            'maxSqft' => 'string',
            'sortBy' => 'string',
            'search' => 'string',
            'lat' => 'numeric',
            'long' => 'numeric',
            'radius' => 'numeric',
        ]);

        try {
            $results = $this->repliers->searchListings($validated);

            return response()->json([
                'success' => true,
                'data' => $this->transformListingsResponse($results),
            ]);
        } catch (\RuntimeException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get a single listing by MLS number.
     * GET /api/listings/{mlsNumber}
     */
    public function show(string $mlsNumber): JsonResponse
    {
        try {
            $listing = $this->repliers->getListing($mlsNumber);

            return response()->json([
                'success' => true,
                'data' => $listing,
            ]);
        } catch (\RuntimeException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get similar listings for a property.
     * GET /api/listings/{mlsNumber}/similar
     */
    public function similar(string $mlsNumber): JsonResponse
    {
        try {
            $results = $this->repliers->getSimilarListings($mlsNumber);

            return response()->json([
                'success' => true,
                'data' => $results,
            ]);
        } catch (\RuntimeException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Autocomplete locations for search bar.
     * GET /api/locations/autocomplete
     */
    public function autocomplete(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'query' => 'required|string|min:3',
            'limit' => 'integer|min:1|max:20',
        ]);

        try {
            $results = $this->repliers->autocompleteLocations(
                $validated['query'],
                $validated['limit'] ?? 10,
            );

            return response()->json([
                'success' => true,
                'data' => $results,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'error' => 'Failed to fetch suggestions',
            ], 500);
        }
    }

    /**
     * Transform raw Repliers listings response into a clean format for the frontend.
     */
    private function transformListingsResponse(array $response): array
    {
        $listings = collect($response['listings'] ?? [])->map(function ($listing) {
            $address = $listing['address'] ?? [];
            $details = $listing['details'] ?? [];
            $map = $listing['map'] ?? [];
            $images = $listing['images'] ?? [];

            $streetParts = array_filter([
                $address['streetNumber'] ?? '',
                $address['streetName'] ?? '',
                $address['streetSuffix'] ?? '',
            ]);
            $streetAddress = implode(' ', $streetParts);

            $unitNumber = $address['unitNumber'] ?? null;
            if ($unitNumber) {
                $streetAddress = "#{$unitNumber} - {$streetAddress}";
            }

            $fullAddress = implode(', ', array_filter([
                $streetAddress,
                $address['city'] ?? '',
                $address['state'] ?? '',
                $address['zip'] ?? '',
            ]));

            return [
                'mlsNumber' => $listing['mlsNumber'] ?? '',
                'status' => $listing['status'] ?? '',
                'listPrice' => $listing['listPrice'] ?? '0',
                'listDate' => $listing['listDate'] ?? '',
                'type' => $listing['type'] ?? 'sale',
                'class' => $listing['class'] ?? '',
                'address' => [
                    'full' => $fullAddress,
                    'street' => $streetAddress,
                    'city' => $address['city'] ?? '',
                    'state' => $address['state'] ?? '',
                    'zip' => $address['zip'] ?? '',
                    'neighborhood' => $address['neighborhood'] ?? '',
                    'area' => $address['area'] ?? '',
                ],
                'map' => [
                    'latitude' => $map['latitude'] ?? null,
                    'longitude' => $map['longitude'] ?? null,
                ],
                'details' => [
                    'bedrooms' => $details['numBedrooms'] ?? null,
                    'bathrooms' => $details['numBathrooms'] ?? null,
                    'sqft' => $details['sqft'] ?? '',
                    'yearBuilt' => $details['yearBuilt'] ?? '',
                    'propertyType' => $details['propertyType'] ?? '',
                    'style' => $details['style'] ?? '',
                    'description' => $details['description'] ?? '',
                    'garage' => $details['garage'] ?? '',
                    'heating' => $details['heating'] ?? '',
                    'airConditioning' => $details['airConditioning'] ?? '',
                    'basement' => $details['basement1'] ?? '',
                ],
                'images' => array_slice($images, 0, 10),
                'photoCount' => $listing['photoCount'] ?? count($images),
                'daysOnMarket' => $listing['daysOnMarket'] ?? 0,
                'agents' => $listing['agents'] ?? [],
                'office' => $listing['office'] ?? [],
                'taxes' => $listing['taxes'] ?? [],
                'lot' => $listing['lot'] ?? [],
            ];
        });

        return [
            'listings' => $listings->values()->toArray(),
            'page' => $response['page'] ?? 1,
            'numPages' => $response['numPages'] ?? 1,
            'count' => $response['count'] ?? 0,
            'resultsPerPage' => $response['pageSize'] ?? 20,
            'statistics' => $response['statistics'] ?? [],
        ];
    }
}
