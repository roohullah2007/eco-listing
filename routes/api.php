<?php

use App\Http\Controllers\ListingController;
use Illuminate\Support\Facades\Route;

Route::prefix('listings')->group(function () {
    Route::post('/search', [ListingController::class, 'search']);
    Route::get('/{mlsNumber}', [ListingController::class, 'show']);
    Route::get('/{mlsNumber}/similar', [ListingController::class, 'similar']);
});

Route::get('/locations/autocomplete', [ListingController::class, 'autocomplete']);
