<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\ActivityLog;
use App\Models\OrderItem;
use App\Models\Product;
use App\Http\Resources\OrderResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with(['user', 'orderItems.product'])->latest()->paginate(20);
        return OrderResource::collection($orders);
    }

    public function myOrders(Request $request)
    {
        $orders = $request->user()->orders()->with('orderItems.product')->latest()->get();
        return OrderResource::collection($orders);
    }

    public function checkout(Request $request)
    {
        $request->validate([
            'shipping_address' => 'required|string',
        ]);

        $user = $request->user();
        $cartItems = $user->cartItems()->with('product')->get();

        if ($cartItems->isEmpty()) {
            return response()->json(['message' => 'Cart is empty.'], 400);
        }

        $totalPrice = $cartItems->sum(function ($item) {
            return $item->product->price * $item->quantity;
        });

        try {
            DB::beginTransaction();

            $order = Order::create([
                'user_id' => $user->id,
                'total_price' => $totalPrice,
                'status' => 'PENDING',
                'payment_status' => 'UNPAID',
                'shipping_address' => $request->shipping_address,
            ]);

            foreach ($cartItems as $item) {
                // Check stock
                if ($item->product->stock < $item->quantity) {
                    throw new \Exception("Insufficient stock for product: {$item->product->name}");
                }

                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price,
                ]);

                // Update stock
                $item->product->decrement('stock', $item->quantity);
            }

            // Clear cart
            $user->cartItems()->delete();

            DB::commit();

            return new OrderResource($order->load('orderItems.product'));

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:PENDING,PROCESSING,SHIPPED,DELIVERED,CANCELLED',
        ]);

        $order = Order::findOrFail($id);
        $order->update(['status' => $request->status]);

        ActivityLog::create([
            'user_id' => $request->user()->id,
            'action' => 'UPDATE_ORDER_STATUS',
            'description' => "Updated order #{$order->id} status to {$request->status}",
        ]);

        return new OrderResource($order);
    }
}
