import { Table, Select } from "@mantine/core";
import { useState, useEffect } from "react";

import Menu from "./Menu";

export default function Summary() {
  const [summary, setSummary] = useState([]);
  const [period, setPeriod] = useState("day");

  useEffect(() => {
    fetch(
      "http://localhost:8000/api/summary?" +
        new URLSearchParams({
          period: period,
        }),
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((summary) => setSummary(summary.data));
  }, [period]);

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
      <Select
        label="Select transaction period"
        placeholder="Pick period"
        data={[
          { value: "day", label: "Today" },
          { value: "week", label: "1 Week" },
          { value: "month", label: "1 Month" },
        ]}
        value={period}
        onChange={setPeriod}
      />
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
    </>
  );
}
