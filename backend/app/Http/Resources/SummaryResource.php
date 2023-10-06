<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SummaryResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'currency_id' => $this->currency_id,
            'name' => $this->name,
            'total_buy' => floatval($this->total_buy),
            'total_sell' => floatval($this->total_sell),
            'available_amount' => floatval($this->available_amount),
        ];
    }
}
