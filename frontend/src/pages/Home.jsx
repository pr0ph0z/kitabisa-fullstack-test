import { Grid } from "@mantine/core";
import { useState, useEffect } from "react";

import Box from "../components/Box";
import BaseLayout from "../BaseLayout";
import { Heading } from "@chakra-ui/react";

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
    <BaseLayout>
      <Heading mb={12}>Home</Heading>

      {currencies !== null && (
        <Grid>
          {currencies.map((currency, index) => (
            <>
              <Grid.Col key={index} span={3}>
                <Box code={currency.code} rate={currency.rate} />
              </Grid.Col>
            </>
          ))}
        </Grid>
      )}
    </BaseLayout>
  );
}
