<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Http\Client\Pool;
use GuzzleHttp\Promise\Utils;
use App\Models\Currency;

class CurrencyController extends Controller
{
    private $BASE_CURRENCY = 'idr';

    public function currencies()
    {
        $currencies = Currency::all();

        $url = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/%s/%s.json";
        $promises = [];

        foreach ($currencies as $currency) {
            $promises[] = Http::async()->get(sprintf($url, $currency['code'], $this->BASE_CURRENCY));
        }

        $responses = Http::pool(function (Pool $pool) use ($url, $currencies) {
            return collect($currencies)
                ->map(fn ($currency) => $pool->get(sprintf($url, $currency['code'], $this->BASE_CURRENCY)));
        });
        $responses = collect($responses)
            ->map(fn ($response, $index) => [
                "id" => $currencies[$index]['id'],
                "code" => $currencies[$index]['code'],
                "name" => $currencies[$index]['name'],
                "rate" => round($response['idr'], 2)
            ]);

        return response()->json([
            'message' => 'Success',
            'data' => $responses
        ]);
    }
}
