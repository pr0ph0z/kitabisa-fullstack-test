<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $seedCount = 1000;
        $baseRates = [
            15590.86,
            16361.28,
            104.03,
            18869.93,
            9857.33,
            11405.12,
            16962.35,
            2172.11,
            1996.91,
            9196.15
        ];

        for ($i = 0; $i < $seedCount; $i++) {
            $currencyId = random_int(0, 9);
            $buyAmount = random_int(20, 29);
            $sellAmount = random_int(10, 19);
            $type = random_int(0, 1) === 0 ? "buy" : "sell";
            $amount = $type === 'buy' ? $buyAmount : $sellAmount;
            $date = Carbon::now()->subHours(random_int(0, 720));

            DB::table('transactions')->insert([
                "user_id" => 1,
                "currency_id" => $currencyId + 1,
                "amount" => $amount,
                "rate" => $baseRates[$currencyId],
                "total" => round($baseRates[$currencyId] * $amount, 2),
                "type" => $type,
                "status" => 'completed',
                "created_at" => $date,
                "updated_at" => $date
            ]);
        }
    }
}
