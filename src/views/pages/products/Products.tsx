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

type Product = {
  id: string;
  title: string;
  status: "Active" | "Draft" | "Archived";
  inventory: number;
  type: string;
  vendor: string;
  price: string;
};

// mockProducts populated from your CSV export (top 10 products)
const mockProducts: Product[] = [
  {
    id: "bone-joint-support",
    title: "BONE & JOINT SUPPORT",
    status: "Active",
    inventory: 250,
    type: "Health & Beauty > Health Care > Fitness & Nutrition > Vitamins & Supplements > Collagen",
    vendor: "Myura Wellness",
    price: "₹1299",
  },
  {
    id: "dia-care",
    title: "DIA CARE",
    status: "Active",
    inventory: 245,
    type: "Health & Beauty > Health Care > Fitness & Nutrition > Vitamins & Supplements > Herbal Supplements",
    vendor: "Myura Wellness",
    price: "₹1190",
  },
  {
    id: "gut-digestion",
    title: "GUT & DIGESTION",
    status: "Active",
    inventory: 180,
    type: "Health & Beauty > Health Care > Fitness & Nutrition > Herbal Supplements",
    vendor: "Myura Wellness",
    price: "₹999",
  },

  {
    id: "pro-womens-health-plus",
    title: "PRO WOMEN’S HEALTH PLUS",
    status: "Active",
    inventory: 100,
    type: "Health & Beauty > Vitamins & Supplements > Herbal Supplements",
    vendor: "Myura Wellness",
    price: "₹2599",
  },
  {
    id: "womens-health-plus",
    title: "WOMEN'S HEALTH PLUS",
    status: "Active",
    inventory: 241,
    type: "Health & Beauty > Vitamins & Supplements > Multivitamin Supplements",
    vendor: "Myura Wellness",
    price: "₹1260",
  },
  {
    id: "multivitamin-adult",
    title: "MULTIVITAMIN ADULT",
    status: "Active",
    inventory: 400,
    type: "Health & Beauty > Vitamins & Supplements > Multivitamin Supplements",
    vendor: "Myura Wellness",
    price: "₹1399",
  },
];

const Products: React.FC = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>("all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filtered products (search + status)
  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(search.toLowerCase()) ||
        product.vendor.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || statusFilter === null
          ? true
          : product.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const allVisibleIds = filteredProducts.map((p) => p.id);
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

  const getStatusBadgeColor = (status: Product["status"]) => {
    switch (status) {
      case "Active":
        return "green";
      case "Draft":
        return "yellow";
      case "Archived":
        return "gray";
      default:
        return "gray";
    }
  };

  const rows = filteredProducts.map((product) => (
    <Table.Tr key={product.id} style={{ cursor: "pointer" }}>
      <Table.Td onClick={(e) => e.stopPropagation()}>
        <Checkbox
          checked={selectedIds.includes(product.id)}
          onChange={() => toggleSelectOne(product.id)}
        />
      </Table.Td>
      <Table.Td>
        <Text fw={500}>{product.title}</Text>
        <Text size="xs" c="dimmed">
          {product.vendor}
        </Text>
      </Table.Td>
      <Table.Td>
        <Badge size="sm" variant="light" color={getStatusBadgeColor(product.status)}>
          {product.status}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Text>{product.inventory}</Text>
        <Text size="xs" c="dimmed">
          in stock
        </Text>
      </Table.Td>
      <Table.Td>{product.type}</Table.Td>
      <Table.Td>{product.price}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Stack gap="md">
      {/* Header */}
      <Group justify="space-between" align="flex-end">
        <div>
          <Text size="xl" fw={600}>
            Products
          </Text>
          <Text size="sm" c="dimmed">
            All products · {filteredProducts.length} items
          </Text>
        </div>

        <Group>
          <Button variant="default">Export</Button>
          <Button>+ Add product</Button>
        </Group>
      </Group>

      {/* Filters / Search */}
      <Group align="flex-end">
        <TextInput
          label="Search"
          placeholder="Search products"
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          w="100%"
        />

        <Select
          label="Status"
          value={statusFilter}
          onChange={setStatusFilter}
          data={[
            { value: "all", label: "All" },
            { value: "Active", label: "Active" },
            { value: "Draft", label: "Draft" },
            { value: "Archived", label: "Archived" },
          ]}
          w={180}
        />
      </Group>

      {/* Bulk actions bar */}
      {selectedIds.length > 0 && (
        <Paper withBorder radius="md" p="xs">
          <Group justify="space-between">
            <Text size="sm">{selectedIds.length} product(s) selected</Text>
            <Group gap="xs">
              <Button size="xs" variant="subtle">
                Archive
              </Button>
              <Button size="xs" variant="subtle">
                Set as draft
              </Button>
              <Button size="xs" variant="subtle" color="red">
                Delete
              </Button>
            </Group>
          </Group>
        </Paper>
      )}

      {/* Products table */}
      <Paper withBorder radius="md" shadow="xs">
        <Table highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th w={40}>
                <Checkbox
                  checked={allSelected}
                  indeterminate={
                    selectedIds.length > 0 && !allSelected && allVisibleIds.length > 0
                  }
                  onChange={toggleSelectAll}
                />
              </Table.Th>
              <Table.Th>Product</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Inventory</Table.Th>
              <Table.Th>Type</Table.Th>
              <Table.Th>Price</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Paper>
    </Stack>
  );
};

export default Products;
