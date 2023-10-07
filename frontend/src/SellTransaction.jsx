import { Select, NumberInput, Button } from "@mantine/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Menu from "./Menu";

export default function Summary() {
  const [currencies, setCurrencies] = useState([]);
  const [currency, setCurrency] = useState("");
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/api/currencies")
      .then((response) => response.json())
      .then((currencies) => setCurrencies(currencies.data));
  }, []);

  function resetState() {
    setAmount(0);
    setTotal(0);
  }

  function calculateTotal(currency, amount) {
    let rate = 0;
    const selectedCurrency = currencies.find(
      (curr) => currency === curr.id.toString()
    );
    if (selectedCurrency !== undefined) rate = selectedCurrency.rate;
    setTotal(rate * amount);
  }

  async function submitTransaction() {
    fetch("http://localhost:8000/api/sell", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ currency_id: parseInt(currency), amount }),
    })
      .then(async (response) => {
        const res = await response.json();
        if (!response.ok) throw new Error(res.message);
      })
      .then(() => {
        navigate("/home");
      })
      .catch((error) => setError(error.message));
  }

  return (
    <>
      <Menu />
      <Select
        label="Currency"
        placeholder="Select Currency"
        data={currencies.map((currency) => ({
          value: currency.id.toString(),
          label: currency.name,
        }))}
        value={currency}
        onChange={(value) => {
          setCurrency(value);
          calculateTotal(value, amount);
        }}
      />
      <NumberInput
        label="Amount"
        placeholder="Input amount"
        allowNegative={false}
        allowDecimal={false}
        value={amount}
        onChange={(value) => {
          setAmount(value);
          calculateTotal(currency, value);
        }}
      />
      <NumberInput
        disabled={true}
        label="Total in IDR"
        placeholder="Total"
        allowNegative={false}
        decimalScale={2}
        value={total}
      />

      <div style={{ marginTop: "5px" }}>
        <Button variant="filled" color="red" onClick={resetState}>
          Reset
        </Button>
        <Button
          variant="filled"
          ml={5}
          color="green"
          onClick={submitTransaction}
        >
          Submit
        </Button>
      </div>

      {error && <span>Error: {error}</span>}
    </>
  );
}
