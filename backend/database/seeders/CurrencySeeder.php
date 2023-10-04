<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CurrencySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('currencies')->insert([[
            'code' => 'usd',
            'name' => 'US dollar'
        ], [
            'code' => 'eur',
            'name' => 'Euro'
        ], [
            'code' => 'jpy',
            'name' => 'Japanese yen'
        ], [
            'code' => 'gbp',
            'name' => 'Pound sterling'
        ], [
            'code' => 'aud',
            'name' => 'Australian dollar'
        ], [
            'code' => 'cad',
            'name' => 'Canadian dollar'
        ], [
            'code' => 'chf',
            'name' => 'Swiss franc'
        ], [
            'code' => 'cny',
            'name' => 'Chinese yuan'
        ], [
            'code' => 'hkd',
            'name' => 'Hong Kong dollar'
        ], [
            'code' => 'nzd',
            'name' => 'New Zealand dollar'
        ]]);
    }
}
