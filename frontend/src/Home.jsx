import { Grid } from "@mantine/core";
import { useState, useEffect } from "react";

import Box from "./Box";
import Menu from "./Menu";

export default function Home() {
  const [currencies, setCurrencies] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/currencies", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((currencies) => setCurrencies(currencies.data));
  }, []);

  console.log(currencies);

  return (
    <>
      <Menu />
      <Grid>
        {currencies !== null &&
          currencies.map((currency) => (
            <>
              <Grid.Col span={4}>
                <Box code={currency.code} rate={currency.rate} />
              </Grid.Col>
            </>
          ))}
      </Grid>
    </>
  );
}
