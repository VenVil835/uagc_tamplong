<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('videos', function () {
        return Inertia::render('videos/index');
    })->name('videos.index');

    Route::get('referrals', function () {
        return Inertia::render('referrals/index');
    })->name('referrals.index');

    Route::get('schedules', function () {
        return Inertia::render('schedules/index');
    })->name('schedules.index');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
