<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Models\ActivityLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        $monthlySales = Order::where('payment_status', 'PAID')
            ->select(DB::raw('SUM(total_price) as total'), DB::raw('DATE_FORMAT(created_at, "%Y-%m") as month'))
            ->groupBy('month')
            ->orderBy('month', 'desc')
            ->take(12)
            ->get();

        $topProducts = Product::withCount('orderItems')
            ->orderBy('order_items_count', 'desc')
            ->take(5)
            ->get();

        $newUsers = User::where('role', 'USER')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'monthly_sales' => $monthlySales,
            'top_products' => $topProducts,
            'new_users' => $newUsers,
        ]);
    }

    public function activityLogs()
    {
        $logs = ActivityLog::with('user')->latest()->paginate(50);
        return response()->json($logs);
    }
}
