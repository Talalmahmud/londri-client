"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import BranchMapView from "@/components/shared/BranchMapView";
import OrderForm from "@/components/shared/OrderForm";
import Footer from "@/components/shared/Footer";

const sampleBranches = [
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
export default function Home() {
  const shirts = ["/shirt.png", "/shirt2.png", "/shirt3.png"]; // add your images
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % shirts.length);
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [shirts.length]);

  return (
    <main className="min-h-screen bg-linear-to-r from-blue-100 to-orange-100 flex flex-col">
      {/* NAVBAR */}
      <nav className="flex items-center justify-between px-10 py-6">
        <div className="text-xl font-semibold flex items-center gap-2">
          <span>E-Londri</span>
          <span className="text-2xl">🌀</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-gray-700">
          <span className="cursor-pointer hover:text-black">Services </span>
          <span className="cursor-pointer hover:text-black">Help</span>
          <span className="cursor-pointer hover:text-black">Pricing </span>
          <span className="cursor-pointer hover:text-black">Recyclers</span>
        </div>

        <Button className="rounded-full px-6 py-5 shadow bg-white text-gray-700 border hover:bg-gray-100">
          Get the App <span className="ml-2">▶️</span>
        </Button>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col lg:flex-row items-center justify-between px-10 min-h-screen md:px-20  gap-10 relative">
        {/* Left Text */}
        <div className="flex-1">
          <div className="flex items-center gap-1 mb-2 text-yellow-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            The New
            <br />
            Level of Care
            <br />
            for Your
            <br />
            Wardrobe
          </h1>

          {/* <div className="flex items-center gap-2 mt-6">
            <Image
              src="/avatars.png" // replace with your images
              width={150}
              height={40}
              alt="users"
            />
            <span className="text-gray-700 text-lg">5k+</span>
          </div> */}
        </div>

        {/* Center Shirt Image */}
        <div className="flex-1 relative">
          <div className="transition-all duration-700 ease-in-out">
            <Image
              key={current} // Smooth fade animation
              src={shirts[current]}
              alt="clean shirt"
              width={1000}
              height={1000}
              priority
              className="drop-shadow-lg object-contain  animate-fade"
            />
          </div>

          <p className="absolute -left-6 top-10 text-sm w-[200px] font-medium text-gray-700 bg-white/60 px-3 py-2 rounded-lg shadow">
            Tough stains? We’ll make your clothes flawless! ✨
          </p>

          <p className="absolute w-[200px] right-0 top-32 text-sm font-medium text-gray-700 bg-white/60 px-3 py-2 rounded-lg shadow">
            We&apos;ll Handle Any Stain — Guaranteed Removal 🧼
          </p>
        </div>

        {/* Right Card */}
        <div className="">
          <div className="w-64 h-64 bg-white/50 backdrop-blur-md rounded-2xl shadow p-6 flex flex-col items-center justify-center">
            <Image
              src="/stacked-clothes.png"
              alt="cloth stack"
              width={120}
              height={120}
              className="rounded-lg"
            />

            <h3 className="text-3xl font-bold mt-4">2.7k+</h3>
            <p className="text-gray-700 text-center text-sm mt-1">
              Just Trust Us — We’ll Take Care of It
            </p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      {/* <div className="w-full bg-gray-900 text-white py-8 mt-16 px-10 md:px-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image src="/avatars.png" width={150} height={40} alt="users" />
          <span className="text-lg">5k+ happy users</span>
        </div>

        <Button className="bg-white text-gray-900 rounded-full px-8 py-6 shadow hover:bg-gray-200">
          Reserve Service →
        </Button>
      </div> */}
      <div className="  p-4  ">
        <p className=" text-center font-bold text-[24px] py-6 font-sans underline">
          Choose Your Branches
        </p>
        <BranchMapView
          branches={sampleBranches}
          initialCenter={[23.8103, 90.4125]}
        />
      </div>
    </main>
  );
}
