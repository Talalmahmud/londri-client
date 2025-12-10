"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Loader,
  Truck,
  User,
  Phone,
  MapPin,
  FileText,
} from "lucide-react";
import Link from "next/link";

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

interface OrderDetails {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  status: "pending" | "processing" | "ready" | "completed";
  createdAt: string;
  pickupDate: string;
  items: OrderItem[];
  totalAmount: number;
  paymentStatus: "paid" | "unpaid";
}

export default function OrderDetailsPage() {
  // Mock order data (replace with API fetch)
  const order: OrderDetails = {
    id: "ORD-10023",
    customerName: "John Doe",
    phone: "+123456789",
    address: "123 Main Street, City",
    createdAt: "2025-01-14",
    pickupDate: "2025-01-15",
    status: "processing",
    paymentStatus: "unpaid",
    totalAmount: 45,
    items: [
      { name: "Shirt (Wash & Fold)", qty: 3, price: 6 },
      { name: "Pant (Iron)", qty: 2, price: 4 },
      { name: "Jacket (Dry Cleaning)", qty: 1, price: 12 },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-6 py-10">
      <nav className="flex items-center justify-between px-10 py-4 backdrop-blur-xl bg-white/60 rounded-xl shadow-md">
        <Link
          href={"/"}
          className="text-2xl font-bold flex items-center gap-2 text-blue-900"
        >
          E-Londri <span className="text-3xl">🌀</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-700">
          <span className="hover:text-black cursor-pointer">Services</span>
          <span className="hover:text-black cursor-pointer">Help</span>
          <span className="hover:text-black cursor-pointer">Pricing</span>
          <span className="hover:text-black cursor-pointer">Recyclers</span>
        </div>

        <Button className="rounded-full px-6 py-5 shadow bg-blue-600 text-white hover:bg-blue-700">
          Get the App ▶️
        </Button>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      {/* Order Summary */}
      <Card className="mb-6 shadow">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Order #{order.id}</span>
            <Badge className="text-sm px-3 py-1 capitalize">
              {order.status}
            </Badge>
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-700">
            <div>
              <p className="font-semibold">Order Date</p>
              <p>{order.createdAt}</p>
            </div>
            <div>
              <p className="font-semibold">Pickup Date</p>
              <p>{order.pickupDate}</p>
            </div>
            <div>
              <p className="font-semibold">Payment</p>
              <Badge
                className={`mt-1 capitalize ${
                  order.paymentStatus === "paid" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {order.paymentStatus}
              </Badge>
            </div>
            <div>
              <p className="font-semibold">Total Amount</p>
              <p className="text-lg font-bold">${order.totalAmount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Details */}
      <Card className="mb-6 shadow">
        <CardHeader>
          <CardTitle>Customer Details</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-700 space-y-2">
          <p className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-600" />
            {order.customerName}
          </p>

          <p className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-blue-600" />
            {order.phone}
          </p>

          <p className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            {order.address}
          </p>
        </CardContent>
      </Card>

      {/* Order Progress */}
      <Card className="mb-6 shadow">
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between w-full max-w-3xl mx-auto mt-3">
            {STATUS_STEPS.map((step) => {
              const isActive =
                STATUS_ORDER.indexOf(order.status) >=
                STATUS_ORDER.indexOf(step.key);

              return (
                <div
                  key={step.key}
                  className="flex flex-col items-center text-center"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center text-white ${
                      isActive ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <step.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm mt-1">{step.label}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className="shadow">
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y">
            {order.items.map((item, idx) => (
              <div key={idx} className="py-3 flex justify-between">
                <p>
                  {item.name} (x{item.qty})
                </p>
                <p>${item.price}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-between font-semibold mt-4 text-lg">
            <p>Total</p>
            <p>${order.totalAmount}</p>
          </div>
        </CardContent>
      </Card>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        <Button className="bg-blue-600 text-white flex gap-2">
          <FileText className="h-5 w-5" /> Download Invoice
        </Button>

        <Button variant="outline" className="flex gap-2">
          <Truck className="h-5 w-5" /> Track Order
        </Button>
      </div>
    </div>
  );
}

// Status Steps
const STATUS_STEPS = [
  { key: "pending", label: "Pending", icon: Loader },
  { key: "processing", label: "Processing", icon: CheckCircle },
  { key: "ready", label: "Ready", icon: Truck },
  { key: "completed", label: "Completed", icon: CheckCircle },
];

const STATUS_ORDER = ["pending", "processing", "ready", "completed"];
