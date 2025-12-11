import React from "react";
import { Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";

type Props = {};

const Orders = (props: Props) => {
  const navigate = useNavigate();
  const elements = [
    {
      orderId: "1001",
      date: "2025-01-10",
      customer: "Atul Kumar",
      total: "₹1,299",
      paymentStatus: "Paid",
      fulfillmentStatus: "Shipped",
      tags: "Priority",
    },
    {
      orderId: "1002",
      date: "2025-01-11",
      customer: "Rahul Sharma",
      total: "₹899",
      paymentStatus: "Pending",
      fulfillmentStatus: "Unfulfilled",
      tags: "New",
    },
    {
      orderId: "1003",
      date: "2025-01-12",
      customer: "Priya Singh",
      total: "₹2,499",
      paymentStatus: "Paid",
      fulfillmentStatus: "Processing",
      tags: "Repeat Customer",
    },
  ];

  const rows = elements.map((order) => (
<Table.Tr
  key={order.orderId}
  onClick={() => navigate(`/home/customer/${order.orderId}`)}
  style={{ cursor: "pointer" }}
>
      <Table.Td>{order.orderId}</Table.Td>
      <Table.Td>{order.date}</Table.Td>
      <Table.Td>{order.customer}</Table.Td>
      <Table.Td>{order.total}</Table.Td>
      <Table.Td>{order.paymentStatus}</Table.Td>
      <Table.Td>{order.fulfillmentStatus}</Table.Td>
      <Table.Td>{order.tags}</Table.Td>
    </Table.Tr>
  ));

  return (
    <Table highlightOnHover>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Order ID</Table.Th>
          <Table.Th>Date</Table.Th>
          <Table.Th>Customer</Table.Th>
          <Table.Th>Total</Table.Th>
          <Table.Th>Payment Status</Table.Th>
          <Table.Th>Fulfillment Status</Table.Th>
          <Table.Th>Tags</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>{rows}</Table.Tbody>
    </Table>
  );
};

export default Orders;
