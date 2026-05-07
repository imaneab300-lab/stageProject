<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User (Using credentials from user screenshot)
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@gmail.com',
            'password' => Hash::make('admin12345'),
            'role' => 'ADMIN',
        ]);

        // 2. Define Categories and their Products based on the frontend data
        $data = [
            'jewelry' => [
                'name' => 'Fine Jewelry',
                'products' => [
                    [
                        'name' => "Star-Dust Sapphire & Diamond Collier",
                        'price' => 48200,
                        'description' => "Sculpted in 18k white gold, featuring 12 carats of ethically sourced Ceylon sapphires and pavé-set VVS1 diamonds.",
                        'stock' => 3,
                    ],
                    [
                        'name' => "Rose Eternelle Bangle",
                        'price' => 12800,
                        'description' => "18k rose gold bangle adorned with pavé diamonds and hand-engraved floral motifs.",
                        'stock' => 6,
                    ],
                    [
                        'name' => "Obsidian Drop Earrings",
                        'price' => 6950,
                        'description' => "Hand-carved obsidian drops suspended from 18k black rhodium chains. Bold, architectural, timeless.",
                        'stock' => 2,
                    ],
                    [
                        'name' => "Celestial Moonstone Ring",
                        'price' => 8400,
                        'description' => "Ethereal moonstone set in a halo of diamonds and 18k white gold.",
                        'stock' => 5,
                    ],
                ]
            ],
            'accessories' => [
                'name' => 'Artisan Accessories',
                'products' => [
                    [
                        'name' => "Quilted Bijou Bag",
                        'price' => 2850,
                        'description' => "Italian pebble leather with chrome hardware. Hand-stitched diamond quilting by Florentine artisans.",
                        'stock' => 8,
                    ],
                    [
                        'name' => "Midnight Croco Satchel",
                        'price' => 4350,
                        'description' => "Hand-embossed crocodile leather with 24k gold-plated fixtures. Fully hand-stitched silk interior.",
                        'stock' => 4,
                    ],
                    [
                        'name' => "Ceinture Dorée Belt",
                        'price' => 890,
                        'description' => "Full-grain calfskin belt with an 18k gold vermeil buckle engraved with the GLACIER crest.",
                        'stock' => 15,
                    ],
                    [
                        'name' => "Sienna Suede Tote",
                        'price' => 1950,
                        'description' => "Ultra-soft Italian suede tote in a warm sienna hue. Spacious interior for the modern traveler.",
                        'stock' => 7,
                    ],
                ]
            ],
            'watches' => [
                'name' => 'Heritage Timepieces',
                'products' => [
                    [
                        'name' => "The Meridian Timepiece",
                        'price' => 4200,
                        'description' => "18k gold mesh with mother of pearl dial. Swiss automatic movement, 42-hour power reserve.",
                        'stock' => 2,
                    ],
                    [
                        'name' => "Celestis Chronograph",
                        'price' => 9800,
                        'description' => "Skeleton dial revealing a hand-wound tourbillon movement. Sapphire crystal case, titanium bracelet.",
                        'stock' => 1,
                    ],
                    [
                        'name' => "Carbon Stealth Watch",
                        'price' => 3600,
                        'description' => "Forged carbon case with a matte black finish. Indestructible, lightweight, and precise.",
                        'stock' => 4,
                    ],
                    [
                        'name' => "Aeon Platinum Watch",
                        'price' => 15400,
                        'description' => "Solid platinum casing with a midnight blue sunray dial.",
                        'stock' => 1,
                    ],
                ]
            ],
            'perfume' => [
                'name' => 'Maison Fragrances',
                'products' => [
                    [
                        'name' => "Oud & Sandalwood",
                        'price' => 180,
                        'description' => "Premium soy wax candle with ocean crystal infusion. 80-hour burn time with hand-poured finish.",
                        'stock' => 40,
                    ],
                    [
                        'name' => "Essence d'Aether",
                        'price' => 1240,
                        'description' => "Rare floral extracts in hand-blown crystal. A signature scent available in limited quantities.",
                        'stock' => 5,
                    ],
                    [
                        'name' => "Nuit de Minuit Eau de Parfum",
                        'price' => 620,
                        'description' => "A rich, smoky blend of black pepper, vetiver, and dark amber.",
                        'stock' => 22,
                    ],
                    [
                        'name' => "Jardin de Verre",
                        'price' => 450,
                        'description' => "Crisp notes of green apple and white rose, reminiscent of a glass greenhouse in spring.",
                        'stock' => 12,
                    ],
                ]
            ],
            'beauty' => [
                'name' => 'Luminous Beauty',
                'products' => [
                    [
                        'name' => "Luminous Pearl Elixir",
                        'price' => 785,
                        'description' => "Formulated with deep-sea pearl extract and 24k gold nanoparticles for ultimate radiance.",
                        'stock' => 84,
                    ],
                    [
                        'name' => "Caviar Lip Treatment",
                        'price' => 220,
                        'description' => "Ultra-luxurious lip balm enriched with Siberian caviar extract and rare Moroccan argan oil.",
                        'stock' => 50,
                    ],
                    [
                        'name' => "24K Gold Eye Mask",
                        'price' => 150,
                        'description' => "Rejuvenating eye masks infused with 24k gold and collagen.",
                        'stock' => 100,
                    ],
                    [
                        'name' => "Royal Orchid Cream",
                        'price' => 1200,
                        'description' => "Extracted from rare orchids, this cream regenerates skin at the molecular level.",
                        'stock' => 15,
                    ],
                ]
            ],
            'fashion' => [
                'name' => 'Maison Couture',
                'products' => [
                    [
                        'name' => "Baroque Velvet Blazer",
                        'price' => 3400,
                        'description' => "Structured blazer in crushed midnight velvet with baroque embroidery on lapels and cuffs.",
                        'stock' => 3,
                    ],
                    [
                        'name' => "Cashmere Infinity Coat",
                        'price' => 5200,
                        'description' => "Oversize coat in double-faced Mongolian cashmere. Hand-stitched by master tailors.",
                        'stock' => 5,
                    ],
                    [
                        'name' => "Silk Charmeuse Gown",
                        'price' => 4800,
                        'description' => "Fluid silk charmeuse gown with a draped neckline and hand-finished seams.",
                        'stock' => 3,
                    ],
                    [
                        'name' => "Midnight Tuxedo",
                        'price' => 6500,
                        'description' => "Bespeak tuxedo in deep midnight wool with silk grosgrain lapels.",
                        'stock' => 2,
                    ],
                ]
            ],
        ];

        foreach ($data as $slug => $categoryData) {
            $category = Category::create([
                'name' => $categoryData['name'],
                'slug' => $slug,
            ]);

            foreach ($categoryData['products'] as $index => $productData) {
                // Generate a unique Unsplash image for variety
                $images = [
                    'jewelry' => 'https://images.unsplash.com/photo-1515562141207-7a1886ce96c3?w=800',
                    'accessories' => 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=800',
                    'watches' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
                    'perfume' => 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
                    'beauty' => 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800',
                    'fashion' => 'https://images.unsplash.com/photo-1539109132382-381bb3f1c2b3?w=800',
                ];

                Product::create([
                    'category_id' => $category->id,
                    'name' => $productData['name'],
                    'description' => $productData['description'],
                    'price' => $productData['price'],
                    'stock' => $productData['stock'],
                    'image' => $images[$slug] ?? null,
                    'collection' => $categoryData['name'] . ' 2024',
                    'badge' => ($index === 0) ? 'NEW' : (($index === 1) ? 'LIMITED' : null),
                ]);
            }
        }
    }
}
