<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategoiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::transaction(function () {

            Category::insert([
                [
                    'category_id' => '1',
                    'category_name' => 'Games',
                    'created_at' => '2023/06/19',
                    'updated_at' => '2023/06/19',
                ]
            ]);
            Category::insert([
                [
                    'category_id' => '2',
                    'category_name' => 'Sports',
                    'created_at' => '2023/06/19',
                    'updated_at' => '2023/06/19',
                ]
            ]);

            Category::insert([
                [
                    'category_id' => '3',
                    'category_name' => 'Music',
                    'created_at' => '2023/06/19',
                    'updated_at' => '2023/06/19',
                ]
            ]);
            Category::insert([
                [
                    'category_id' => '4',
                    'category_name' => 'Pets & Animals',
                    'created_at' => '2023/06/19',
                    'updated_at' => '2023/06/19',
                ]
            ]);
            Category::insert([
                [
                    'category_id' => '5',
                    'category_name' => 'Social Activites',
                    'created_at' => '2023/06/19',
                    'updated_at' => '2023/06/19',
                ]
            ]);
            Category::insert([
                [
                    'category_id' => '6',
                    'category_name' => 'Travel & outdoor',
                    'created_at' => '2023/06/19',
                    'updated_at' => '2023/06/19',
                ]
            ]);

            Category::insert([
                [
                    'category_id' => '7',
                    'category_name' => 'Techology',
                    'created_at' => '2023/06/19',
                    'updated_at' => '2023/06/19',
                ]
            ]);
            Category::insert([
                [
                    'category_id' => '8',
                    'category_name' => 'Art & Culture',
                    'created_at' => '2023/06/19',
                    'updated_at' => '2023/06/19',
                ]
            ]);
            Category::insert([
                [
                    'category_id' => '9',
                    'category_name' => 'Career & buisness',
                    'created_at' => '2023/06/19',
                    'updated_at' => '2023/06/19',
                ]
            ]);
        });
    }
}
