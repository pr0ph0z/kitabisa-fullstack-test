<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Http;
use Illuminate\Http\Request;
use Illuminate\Http\Client\Pool;
use GuzzleHttp\Promise\Utils;

class CurrencyController extends Controller
{
    private $BASE_CURRENCY = 'idr';

    public function currencies()
    {
        $currencies = [[
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
        ]];

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
                "code" => $currencies[$index]['code'],
                "rate" => round($response['idr'], 2)
            ]);


        return response()->json([
            'message' => 'Success',
            'data' => $responses
        ]);
    }
}
