import React from "react";
import { useParams, useNavigate } from "react-router-dom";

type Order = {
  orderId: string;
  date: string;
  customer: string;
  total: string;
  paymentStatus: string;
  fulfillmentStatus: string;
  tags: string;
};

const mockOrders: Order[] = [
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

const CustomerPage: React.FC = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const navigate = useNavigate();

  const order = mockOrders.find((o) => o.orderId === customerId);

  if (!order) {
    return (
      <div className="p-6">
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-blue-600 underline mb-4"
        >
          ← Back
        </button>
        <div className="text-lg font-semibold">Order not found</div>
        <p className="text-sm text-gray-500 mt-2">
          We couldn&apos;t find any order with ID {customerId}.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 underline mb-2"
          >
            ← Orders
          </button>
          <h1 className="text-2xl font-semibold">
            {order.customer}
          </h1>
          <p className="text-sm text-gray-500">
            Customer for order #{order.orderId}
          </p>
        </div>

        <div className="flex gap-2">
          <button className="border px-3 py-1 rounded text-sm">
            More actions
          </button>
          <button className="bg-black text-white px-3 py-1 rounded text-sm">
                Full Fill Order 
          </button>
        </div>
      </div>

      {/* Main layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column – order details & timeline */}
        <div className="lg:col-span-2 space-y-4">
          {/* Latest order card */}
          <div className="border rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold">Latest order</h2>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                #{order.orderId}
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Order date</p>
                <p>{order.date}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Total spent</p>
                <p className="font-medium">{order.total}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Payment status</p>
                <p>{order.paymentStatus}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Fulfillment</p>
                <p>{order.fulfillmentStatus}</p>
              </div>
            </div>
          </div>

          {/* Timeline / notes */}
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-semibold mb-3">Timeline</h2>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="font-medium">
                  {order.fulfillmentStatus} · {order.date}
                </p>
                <p className="text-gray-500">
                  Order #{order.orderId} was {order.fulfillmentStatus.toLowerCase()}.
                </p>
              </li>
              <li>
                <p className="font-medium">Customer created</p>
                <p className="text-gray-500">
                  {order.customer} became a customer when this order was placed.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Right column – customer profile */}
        <div className="space-y-4">
          {/* Customer overview */}
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-semibold mb-3">Customer overview</h2>
            <p className="text-sm font-medium">{order.customer}</p>
            <p className="text-xs text-gray-500 mb-3">
              1 order · {order.total} total spent (mock data)
            </p>

            <div className="text-xs text-gray-500 mb-1">Tags</div>
            <div className="flex flex-wrap gap-2">
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100">
                {order.tags}
              </span>
            </div>
          </div>

          {/* Contact */}
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-semibold mb-3">Contact</h2>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Email</p>
                <p>{order.customer.toLowerCase().split(" ").join(".")}@example.com</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Phone</p>
                <p>+91-9876543210</p>
              </div>
            </div>
          </div>

          {/* Addresses */}
          <div className="border rounded-lg p-4 bg-white">
            <h2 className="font-semibold mb-3">Default address</h2>
            <p className="text-sm">
              {order.customer}
              <br />
              123 Example Street
              <br />
              New Delhi, Delhi 110001
              <br />
              India
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
