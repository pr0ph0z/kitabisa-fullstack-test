<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
            'type' => 'sell',
            'status' => 'completed'
        ]);

        return response()->json([
            'message' => 'Success'
        ]);
    }
}
