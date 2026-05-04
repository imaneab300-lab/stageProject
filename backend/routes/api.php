<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CartController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\NotificationController;
use App\Http\Controllers\Api\FeedbackController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ReportController;

// Public Auth Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public Product Routes
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::put('/user', [AuthController::class, 'updateProfile']);

    // Cart
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);

    // Orders
    Route::post('/orders', [OrderController::class, 'checkout']);
    Route::get('/orders/my', [OrderController::class, 'myOrders']);

    // Notifications & Feedback
    Route::get('/notifications', [NotificationController::class, 'index']);
    Route::put('/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
    Route::delete('/notifications', [NotificationController::class, 'clearAll']);
    Route::post('/feedback', [FeedbackController::class, 'store']);

    // Admin Only Routes
    Route::middleware('admin')->group(function () {
        // Product Management
        Route::post('/products', [ProductController::class, 'store']);
        Route::put('/products/{id}', [ProductController::class, 'update']);
        Route::delete('/products/{id}', [ProductController::class, 'destroy']);

        // Order Management
        Route::get('/orders', [OrderController::class, 'index']);
        Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);

        // Feedback Management
        Route::get('/feedback', [FeedbackController::class, 'index']);

        // Activity Logs
        Route::get('/activity-logs', [DashboardController::class, 'activityLogs']);

        // Dashboard & Reports
        Route::get('/admin/stats', [DashboardController::class, 'stats']);
        Route::get('/admin/reports/sales', [ReportController::class, 'salesReport']);
    });

    // Payments
    Route::post('/payments/checkout', [\App\Http\Controllers\Api\PaymentController::class, 'createCheckoutSession']);
});

// Stripe Webhook (Public)
Route::post('/webhooks/stripe', [\App\Http\Controllers\Api\PaymentController::class, 'webhook']);
