<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Stripe\StripeClient;
use Stripe\Webhook;

class PaymentController extends Controller
{
    private $stripe;

    public function __construct()
    {
        $this->stripe = new StripeClient(config('cashier.secret') ?? env('STRIPE_SECRET'));
    }

    public function createCheckoutSession(Request $request)
    {
        $request->validate([
            'order_id' => 'required|exists:orders,id',
        ]);

        $order = Order::with('orderItems.product')->findOrFail($request->order_id);

        if ($order->payment_status === 'PAID') {
            return response()->json(['message' => 'Order already paid.'], 400);
        }

        $lineItems = [];
        foreach ($order->orderItems as $item) {
            $lineItems[] = [
                'price_data' => [
                    'currency' => 'usd',
                    'product_data' => [
                        'name' => $item->product->name,
                    ],
                    'unit_amount' => $item->price * 100,
                ],
                'quantity' => $item->quantity,
            ];
        }

        $session = $this->stripe->checkout->sessions->create([
            'payment_method_types' => ['card'],
            'line_items' => $lineItems,
            'mode' => 'payment',
            'success_url' => env('FRONTEND_URL') . '/checkout/success?session_id={CHECKOUT_SESSION_ID}',
            'cancel_url' => env('FRONTEND_URL') . '/checkout/cancel',
            'metadata' => [
                'order_id' => $order->id,
            ],
        ]);

        $order->update(['stripe_id' => $session->id]);

        return response()->json(['url' => $session->url]);
    }

    public function webhook(Request $request)
    {
        $endpoint_secret = env('STRIPE_WEBHOOK_SECRET');
        $payload = $request->getContent();
        $sig_header = $request->header('Stripe-Signature');

        try {
            $event = Webhook::constructEvent($payload, $sig_header, $endpoint_secret);
        } catch (\UnexpectedValueException $e) {
            return response()->json(['error' => 'Invalid payload'], 400);
        } catch (\Stripe\Exception\SignatureVerificationException $e) {
            return response()->json(['error' => 'Invalid signature'], 400);
        }

        if ($event->type === 'checkout.session.completed') {
            $session = $event->data->object;
            $orderId = $session->metadata->order_id;

            $order = Order::find($orderId);
            if ($order) {
                $order->update(['payment_status' => 'PAID', 'status' => 'PROCESSING']);
            }
        }

        return response()->json(['status' => 'success']);
    }
}
