<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create Admin User
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@luxury.com',
            'password' => Hash::make('admin123'),
            'role' => 'ADMIN',
        ]);

        // 2. Create Categories
        $categories = [
            ['name' => 'Timepieces', 'slug' => 'watches'],
            ['name' => 'Leather Goods', 'slug' => 'bags'],
            ['name' => 'Fine Jewelry', 'slug' => 'jewelry'],
            ['name' => 'Fragrances', 'slug' => 'fragrances'],
        ];

        foreach ($categories as $cat) {
            $category = Category::create($cat);

            // 3. Create Products for each category
            if ($cat['slug'] === 'watches') {
                Product::create([
                    'category_id' => $category->id,
                    'name' => 'Royal Oak Chronograph',
                    'description' => 'A masterpiece of precision and elegance, featuring a classic octagonal bezel and integrated bracelet.',
                    'price' => 45000.00,
                    'stock' => 5,
                    'image' => null,
                ]);
                Product::create([
                    'category_id' => $category->id,
                    'name' => 'Nautilus 5711',
                    'description' => 'The ultimate sports watch, embodying casual elegance with its blue-black gradated dial.',
                    'price' => 125000.00,
                    'stock' => 2,
                    'image' => null,
                ]);
            } elseif ($cat['slug'] === 'bags') {
                Product::create([
                    'category_id' => $category->id,
                    'name' => 'Birkin 35 Togo',
                    'description' => 'The gold standard of luxury handbags, crafted from the finest Togo leather.',
                    'price' => 15000.00,
                    'stock' => 3,
                    'image' => null,
                ]);
            } elseif ($cat['slug'] === 'jewelry') {
                Product::create([
                    'category_id' => $category->id,
                    'name' => 'Diamond Tennis Bracelet',
                    'description' => '10 carats of brilliantly cut diamonds set in 18k white gold.',
                    'price' => 8500.00,
                    'stock' => 10,
                    'image' => null,
                ]);
            }
        }
    }
}
