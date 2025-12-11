import React, { useMemo, useState } from "react";
import {
  Table,
  Badge,
  Button,
  Group,
  Text,
  TextInput,
  Select,
  Checkbox,
  Paper,
  Stack,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalSpend: string;
  orders: number;
  status: "Active" | "Inactive";
};

const mockCustomers: Customer[] = [
  {
    id: "c-1001",
    name: "Atul Kumar",
    email: "atul@example.com",
    phone: "+91 9876543210",
    location: "Lucknow, Uttar Pradesh",
    totalSpend: "₹12,499",
    orders: 5,
    status: "Active",
  },
  {
    id: "c-1002",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 9123456780",
    location: "Delhi, India",
    totalSpend: "₹8,299",
    orders: 3,
    status: "Active",
  },
  {
    id: "c-1003",
    name: "Priya Singh",
    email: "priya@example.com",
    phone: "+91 8855664477",
    location: "Mumbai, Maharashtra",
    totalSpend: "₹2,499",
    orders: 1,
    status: "Inactive",
  },
];

const Customers: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // FILTERING
  const filteredCustomers = useMemo(() => {
    return mockCustomers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase()) ||
        customer.phone.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || statusFilter === null
          ? true
          : customer.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const allVisibleIds = filteredCustomers.map((c) => c.id);
  const allSelected =
    allVisibleIds.length > 0 &&
    allVisibleIds.every((id) => selectedIds.includes(id));

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds((prev) => prev.filter((id) => !allVisibleIds.includes(id)));
    } else {
      setSelectedIds((prev) => Array.from(new Set([...prev, ...allVisibleIds])));
    }
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const getStatusColor = (status: Customer["status"]) =>
    status === "Active" ? "green" : "gray";

  const rows = filteredCustomers.map((customer) => (
    <Table.Tr
      key={customer.id}
      style={{ cursor: "pointer" }}
      onClick={() => navigate(`/home/customer/${customer.id}`)}
    >
      <Table.Td onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={selectedIds.includes(customer.id)}
          onChange={() => toggleSelectOne(customer.id)}
        />
      </Table.Td>

      <Table.Td>
        <Text fw={500}>{customer.name}</Text>
        <Text size="xs" c="dimmed">
          {customer.email}
        </Text>
      </Table.Td>

      <Table.Td>{customer.phone}</Table.Td>

      <Table.Td>{customer.location}</Table.Td>

      <Table.Td>{customer.totalSpend}</Table.Td>

      <Table.Td>{customer.orders}</Table.Td>

      <Table.Td>
        <Badge variant="light" color={getStatusColor(customer.status)}>
          {customer.status}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      {/* HEADER */}
      <Group justify="space-between" align="flex-end">
        <div>
          <Text size="xl" fw={600}>
            Customers
          </Text>
          <Text size="sm" c="dimmed">
            All customers · {filteredCustomers.length} records
          </Text>
        </div>

        <Group>
          <Button variant="default">Export</Button>
          <Button>+ Add customer</Button>
        </Group>
      </Group>

      {/* SEARCH / FILTERS */}
      <Group align="flex-end">
        <TextInput
          label="Search"
          placeholder="Search customers"
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          w="100%"
        />

        <Select
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          data={[
            { value: "all", label: "All" },
            { value: "Active", label: "Active" },
            { value: "Inactive", label: "Inactive" },
          ]}
          w={180}
        />
      </Group>

      {/* BULK ACTION BAR */}
      {selectedIds.length > 0 && (
        <Paper withBorder radius="md" p="xs">
          <Group justify="space-between">
            <Text size="sm">
              {selectedIds.length} customer(s) selected
            </Text>
            <Group gap="xs">
              <Button size="xs" variant="subtle">
                Disable
              </Button>
              <Button size="xs" variant="subtle" color="red">
                Delete
              </Button>
            </Group>
          </Group>
        </Paper>
      )}

      {/* TABLE */}
      <Paper withBorder radius="md" shadow="xs">
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={
                    selectedIds.length > 0 && !allSelected
                  }
                  onChange={toggleSelectAll}
                />
              </Table.Th>
              <Table.Th>Customer</Table.Th>
              <Table.Th>Phone</Table.Th>
              <Table.Th>Location</Table.Th>
              <Table.Th>Total Spend</Table.Th>
              <Table.Th>Orders</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>

          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
};

export default Customers;
