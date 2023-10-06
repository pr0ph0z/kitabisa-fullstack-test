<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\SummaryResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use App\Models\Currency;
use App\Models\Transaction;

class TransactionController extends Controller
{
    private $BASE_CURRENCY = 'idr';

    public function buy(Request $request)
    {
        $currencyId = $request->integer('currency_id');
        $amount = $request->integer('amount');

        $currency = Currency::findOrFail($currencyId);

        $currencyRate = Http::get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{$currency->code}/{$this->BASE_CURRENCY}.json")->json('idr');
        $currencyRate = round($currencyRate, 2);

        $total = $currencyRate * $amount;

        Transaction::create([
            'user_id' => auth()->id(),
            'currency_id' => $currencyId,
            'amount' => $amount,
            'rate' => $currencyRate,
            'total' => $total,
            'type' => 'buy',
            'status' => 'completed'
        ]);

        return response()->json([
            'message' => 'Success'
        ]);
    }

    public function sell(Request $request)
    {
        $currencyId = $request->integer('currency_id');
        $amount = $request->integer('amount');

        $currency = Currency::find($currencyId);

        if ($currency === null) abort(404, "Invalid currency ID");

        $availableSellAmount = $this->findAvailableSellAmount(auth()->id(), $currencyId);

        $currencyRate = Http::get("https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/{$currency->code}/{$this->BASE_CURRENCY}.json")->json('idr');
        $currencyRate = round($currencyRate, 2);

        $total = $currencyRate * $amount;

        if ($availableSellAmount <= $total) abort(429, "Insufficient balance");

        Transaction::create([
            'user_id' => auth()->id(),
            'currency_id' => $currencyId,
            'amount' => $amount,
            'rate' => $currencyRate,
            'total' => $total,
            'type' => 'sell',
            'status' => 'completed'
        ]);

        return response()->json([
            'message' => 'Success'
        ]);
    }

    public function findAvailableSellAmount(int $userId, int $currencyId)
    {
        $amount = DB::select("
            SELECT SUM(CASE WHEN type = 'buy' THEN total ELSE total * -1 END) amount from transactions
            WHERE user_id = {$userId}
            AND currency_id = {$currencyId}
        ");

        if ($amount[0]->amount === null) return 0;
        return round($amount[0]->amount, 2);
    }

    public function summary(Request $request)
    {
        $period = $request->query('period');
        if (!in_array($period, ['week', 'month'])) abort(400, "Invalid period value");
        $userId = auth()->id();

        $summary = DB::select("
            SELECT currencies.name, summaries.* FROM (SELECT
                currency_id,
                COUNT(currency_id),
                ROUND(SUM(CASE WHEN type = 'buy' THEN total ELSE 0 END)::numeric, 2) total_buy,
                ROUND(SUM(CASE WHEN type = 'sell' THEN total ELSE 0 END)::numeric, 2) total_sell,
                ROUND(SUM(CASE WHEN type = 'buy' THEN total ELSE total * -1 END)::numeric, 2) available_amount
                FROM transactions
                WHERE user_id = {$userId}
                AND created_at >= NOW() - interval '1 {$period}' AND created_at <= NOW()
                GROUP BY currency_id) summaries
            INNER JOIN currencies on summaries.currency_id = currencies.id
        ");

        return SummaryResource::collection($summary);
    }
}
