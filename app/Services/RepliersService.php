<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Cache;
use Illuminate\Http\Client\Response;
use Illuminate\Http\Client\RequestException;

class RepliersService
{
    private string $baseUrl;
    private string $apiKey;
    private const IMAGE_CDN = 'https://cdn.repliers.io/';

    public function __construct()
    {
        $this->baseUrl = rtrim(config('services.repliers.url'), '/');
        $this->apiKey = config('services.repliers.key');
    }

    /**
     * Convert relative image paths to full CDN URLs.
     */
    public static function resolveImageUrl(string $path): string
    {
        if (str_starts_with($path, 'http://') || str_starts_with($path, 'https://')) {
            return $path;
        }

        return self::IMAGE_CDN . ltrim($path, '/');
    }

    /**
     * Resolve all image URLs in a listing.
     */
    public static function resolveListingImages(array &$listing): void
    {
        if (!empty($listing['images'])) {
            $listing['images'] = array_map(
                fn(string $img) => self::resolveImageUrl($img),
                $listing['images']
            );
        }
    }

    /**
     * Strip sample data markers from listing text fields.
     */
    public static function cleanSampleMarkers(array &$listing): void
    {
        if (!empty($listing['details']['description'])) {
            $listing['details']['description'] = trim(
                preg_replace('/\*{4}\s*SAMPLE DATA\s*\*{4}\s*/i', '', $listing['details']['description'])
            );
        }
        if (!empty($listing['details']['extras'])) {
            $listing['details']['extras'] = trim(
                preg_replace('/\*{4}\s*SAMPLE DATA\s*\*{4}\s*/i', '', $listing['details']['extras'])
            );
        }
    }

    /**
     * Search listings with filters.
     */
    public function searchListings(array $filters = []): array
    {
        $defaults = [
            'status' => 'A',
            'resultsPerPage' => 20,
            'pageNum' => 1,
            'type' => 'sale',
        ];

        $params = array_merge($defaults, $filters);

        // Use GET for filtered searches (filters only work via GET).
        // Use POST only when map polygon is present (GET can't handle nested arrays).
        if (isset($params['map'])) {
            $response = $this->post('/listings', $params);
        } else {
            $response = $this->get('/listings', $params);
        }

        // Resolve image URLs and clean sample markers for all listings
        if (!empty($response['listings'])) {
            foreach ($response['listings'] as &$listing) {
                self::resolveListingImages($listing);
                self::cleanSampleMarkers($listing);
            }
        }

        return $response;
    }

    /**
     * Get a single listing by MLS number.
     */
    public function getListing(string $mlsNumber): array
    {
        $cacheKey = "listing_{$mlsNumber}";

        return Cache::remember($cacheKey, 300, function () use ($mlsNumber) {
            $listing = $this->get("/listings/{$mlsNumber}");
            self::resolveListingImages($listing);
            self::cleanSampleMarkers($listing);
            return $listing;
        });
    }

    /**
     * Get similar/comparable listings for a given MLS number.
     */
    public function getSimilarListings(string $mlsNumber): array
    {
        $response = $this->get("/listings/{$mlsNumber}/similar");

        if (!empty($response['listings'])) {
            foreach ($response['listings'] as &$listing) {
                self::resolveListingImages($listing);
                self::cleanSampleMarkers($listing);
            }
        }

        return $response;
    }

    /**
     * Get listing history for an address.
     */
    public function getListingHistory(string $mlsNumber): array
    {
        return $this->get("/listings/{$mlsNumber}/history");
    }

    /**
     * Autocomplete locations for search input.
     */
    public function autocompleteLocations(string $query, int $limit = 10): array
    {
        return $this->get('/locations/autocomplete', [
            'search' => $query,
            'limit' => $limit,
        ]);
    }

    /**
     * Get location data.
     */
    public function getLocations(array $params = []): array
    {
        return $this->get('/locations', $params);
    }

    /**
     * Make a GET request to the Repliers API.
     */
    private function get(string $endpoint, array $query = []): array
    {
        // Build query string manually to handle repeated params (e.g. style=X&style=Y)
        // Laravel's http_build_query converts arrays to style[0]=X which Repliers doesn't support
        $parts = [];
        foreach ($query as $key => $value) {
            if (is_array($value)) {
                foreach ($value as $v) {
                    $parts[] = urlencode($key) . '=' . urlencode($v);
                }
            } else {
                $parts[] = urlencode($key) . '=' . urlencode((string) $value);
            }
        }
        $url = "{$this->baseUrl}{$endpoint}" . ($parts ? '?' . implode('&', $parts) : '');

        $response = Http::withHeaders([
            'REPLIERS-API-KEY' => $this->apiKey,
            'Content-Type' => 'application/json',
        ])
            ->timeout(15)
            ->retry(2, 500)
            ->get($url);

        return $this->handleResponse($response);
    }

    /**
     * Make a POST request to the Repliers API.
     */
    private function post(string $endpoint, array $data = []): array
    {
        $response = Http::withHeaders([
            'REPLIERS-API-KEY' => $this->apiKey,
            'Content-Type' => 'application/json',
        ])
            ->timeout(15)
            ->retry(2, 500)
            ->post("{$this->baseUrl}{$endpoint}", $data);

        return $this->handleResponse($response);
    }

    /**
     * Handle API response and errors.
     */
    private function handleResponse(Response $response): array
    {
        if ($response->successful()) {
            return $response->json() ?? [];
        }

        $status = $response->status();
        $body = $response->body();

        if ($status === 401) {
            throw new \RuntimeException('Repliers API: Invalid API key');
        }

        if ($status === 429) {
            throw new \RuntimeException('Repliers API: Rate limit exceeded');
        }

        throw new \RuntimeException("Repliers API error ({$status}): {$body}");
    }
}
