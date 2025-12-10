"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

/* ---------------------- Branch Type ---------------------- */
export type Branch = {
  id: number | string;
  name: string;
};

/* ---------------------- Form State Type ---------------------- */
type OrderFormState = {
  name: string;
  phone: string;
  address: string;
  branchId: number | string | "";
  serviceType: string;
  date: string;
  time: string;
  notes: string;
};

/* ---------------------- Props Type ---------------------- */
type OrderFormProps = {
  selectedBranchId?: number | string | null;
};

const branches = [
  {
    id: 1,
    name: "Dhanmondi Branch",
    address: "House 42, Road 11, Dhanmondi",
    lat: 23.746465,
    lng: 90.376015,
    phone: "+8801712345678",
    hours: "9am - 9pm",
  },
  {
    id: 2,
    name: "Gulshan Branch",
    address: "House 12, Gulshan 2",
    lat: 23.7925,
    lng: 90.4075,
    phone: "+8801711111111",
    hours: "8am - 8pm",
  },
  // add more...
];

export default function OrderForm({ selectedBranchId }: OrderFormProps) {
  const [form, setForm] = useState<OrderFormState>({
    name: "",
    phone: "",
    address: "",
    branchId: selectedBranchId || "",
    serviceType: "",
    date: "",
    time: "",
    notes: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.address || !form.serviceType) {
      alert("Please fill all required fields.");
      return;
    }
    console.log("Order Submitted", form);
    alert("Your order has been submitted!");
  };

  return (
    <div className=" flex items-center justify-center  p-6">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl flex overflow-hidden">
        {/* Left Side */}
        <div className="hidden lg:flex w-1/2 bg-blue-500 text-white flex-col justify-center items-center p-10 space-y-6">
          <h2 className="text-4xl font-bold">Welcome to E-Laundry</h2>
          <p className="text-lg">
            Place your order quickly and easily. Choose your service, branch,
            and schedule your pickup.
          </p>
          <Image
            height={1000}
            width={1000}
            src="/laundry-illustration.png"
            alt="Laundry Illustration"
            className="w-3/4"
          />
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-1/2 p-10">
          <h2 className="text-3xl font-semibold mb-6">Place Your Order</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
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

            {/* Phone Number */}
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

            {/* Pickup Address */}
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

            {/* Select Branch */}
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

            {/* Service Type */}
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

            {/* Date & Time */}
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

            {/* Notes */}
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

            {/* Submit */}
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
