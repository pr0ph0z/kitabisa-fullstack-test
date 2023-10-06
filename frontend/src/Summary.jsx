import { Table } from "@mantine/core";
import { useState, useEffect } from "react";

import Menu from "./Menu";

export default function Summary() {
  const [summary, setSummary] = useState([]);

  useEffect(() => {
    fetch(
      "http://localhost:8000/api/summary?" +
        new URLSearchParams({
          period: "week",
        }),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((currencies) => setSummary(currencies.data));
  }, []);

  const rows = summary.map((summaryTx) => (
    <Table.Tr key={summaryTx.currency_id}>
      <Table.Td>{summaryTx.name}</Table.Td>
      <Table.Td>{summaryTx.total_buy}</Table.Td>
      <Table.Td>{summaryTx.total_sell}</Table.Td>
      <Table.Td>{summaryTx.available_amount}</Table.Td>
    </Table.Tr>
  ));

  return (
    <>
      <Menu />
      <Table highlightOnHover withTableBorder withColumnBorders>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Currency</Table.Th>
            <Table.Th>Total Buy</Table.Th>
            <Table.Th>Total Sell</Table.Th>
            <Table.Th>Available Amount</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
      {/* {summary !== null &&
        currencies.map((currency, index) => (
          <>
            <Grid.Col key={index} span={4}>
              <Box code={currency.code} rate={currency.rate} />
            </Grid.Col>
          </>
        ))} */}
    </>
  );
}
