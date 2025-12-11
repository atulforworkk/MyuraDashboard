import React, { useState, useMemo } from "react";
import {
  Table,
  Button,
  Text,
  Group,
  Badge,
  TextInput,
  Paper,
  Stack,
  Select,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

type Discount = {
  id: string;
  code: string;
  type: "Percentage" | "Fixed Amount";
  value: number;
  usage: number;
  status: "Active" | "Scheduled" | "Expired";
  startsOn: string;
  endsOn: string;
};

const mockDiscounts: Discount[] = [
  {
    id: "d1",
    code: "WELCOME10",
    type: "Percentage",
    value: 10,
    usage: 54,
    status: "Active",
    startsOn: "2025-01-01",
    endsOn: "2025-12-31",
  },
  {
    id: "d2",
    code: "FLAT200",
    type: "Fixed Amount",
    value: 200,
    usage: 12,
    status: "Scheduled",
    startsOn: "2025-04-01",
    endsOn: "2025-04-30",
  },
  {
    id: "d3",
    code: "SUMMER25",
    type: "Percentage",
    value: 25,
    usage: 90,
    status: "Expired",
    startsOn: "2024-06-01",
    endsOn: "2024-06-10",
  },
];

const Discounts = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    return mockDiscounts.filter((d) => {
      const matchSearch = d.code.toLowerCase().includes(search.toLowerCase());
      const matchFilter =
        filter === "all" ? true : d.status.toLowerCase() === filter.toLowerCase();
      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const getStatusColor = (status: Discount["status"]) => {
    if (status === "Active") return "green";
    if (status === "Scheduled") return "blue";
    return "red";
  };

  const rows = filtered.map((d) => (
    <Table.Tr
      key={d.id}
      onClick={() => navigate(`/home/discounts/${d.id}`)}
      style={{ cursor: "pointer" }}
    >
      <Table.Td>
        <Text fw={500}>{d.code}</Text>
        <Text size="xs" c="dimmed">
          {d.type === "Percentage" ? `${d.value}% off` : `₹${d.value} off`}
        </Text>
      </Table.Td>

      <Table.Td>
        <Badge color={getStatusColor(d.status)}>{d.status}</Badge>
      </Table.Td>

      <Table.Td>{d.usage}</Table.Td>
      <Table.Td>{d.startsOn}</Table.Td>
      <Table.Td>{d.endsOn}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack>
      <Group justify="space-between">
        <div>
          <Text size="xl" fw={700}>
            Discounts
          </Text>
          <Text size="sm" c="dimmed">
            Manage discount codes · {filtered.length} total
          </Text>
        </div>

        <Button onClick={() => navigate("/home/discounts/new")}>
          + Create discount
        </Button>
      </Group>

      <Group>
        <TextInput
          placeholder="Search discount code"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          w="100%"
        />

        <Select
          value={filter}
          onChange={(e) => setFilter(e || "all")}
          data={[
            { value: "all", label: "All" },
            { value: "Active", label: "Active" },
            { value: "Scheduled", label: "Scheduled" },
            { value: "Expired", label: "Expired" },
          ]}
          w={180}
        />
      </Group>

      <Paper withBorder radius="md" p="0">
        <Table highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Code</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Usage</Table.Th>
              <Table.Th>Start</Table.Th>
              <Table.Th>End</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
};

export default Discounts;
