"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function OrderForm({
  branches,
  selectedBranchId,
}: {
  branches: { id: number | string; name: string }[];
  selectedBranchId?: number | string | null;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    branchId: selectedBranchId || "",
    serviceType: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.serviceType) {
      alert("Please fill all required fields.");
      return;
    }
    console.log("Order Submitted", form);
    alert("Your order has been submitted!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-orange-100 p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl flex overflow-hidden">
        {/* Left Side */}
        <div className="hidden lg:flex w-1/2 bg-blue-500 text-white flex-col justify-center items-center p-10 space-y-6">
          <h2 className="text-4xl font-bold">Welcome to E-Laundry</h2>
          <p className="text-lg">
            Place your order quickly and easily. Choose your service, branch,
            and schedule your pickup.
          </p>
          <img
            src="/laundry-illustration.png"
            alt="Laundry Illustration"
            className="w-3/4"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 p-10">
          <h2 className="text-3xl font-semibold mb-6">Place Your Order</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Full Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter your name"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Phone Number *</label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="01XXXXXXXXX"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Pickup Address *</label>
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter pickup location"
                required
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Select Branch *</label>
              <select
                name="branchId"
                value={form.branchId}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select Branch</option>
                {branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">Service Type *</label>
              <select
                name="serviceType"
                value={form.serviceType}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              >
                <option value="">Choose Service</option>
                <option value="wash">Wash</option>
                <option value="iron">Iron</option>
                <option value="wash_iron">Wash & Iron</option>
                <option value="dry_clean">Dry Cleaning</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Pickup Date *</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">Pickup Time *</label>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block mb-1 font-medium">Additional Notes</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Any special instructions?"
              />
            </div>

            <Button
              type="submit"
              className="w-full mt-4 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
            >
              Submit Order
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
