"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import {
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  ArrowRight,
  Map,
} from "lucide-react";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import Link from "next/link";

// Default Leaflet Marker Fix
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  iconUrl: "/leaflet/marker-icon.png",
  shadowUrl: "/leaflet/marker-shadow.png",
});

const BranchMap = dynamic(
  () => import("../../../components/shared/BranchMapView"),
  { ssr: false }
);

interface Branch {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  services: string[];
}

export default function BranchDetailsPage() {
  // Mock data — replace with API fetch
  const branch: Branch = {
    id: "BR-001",
    name: "E-Londri Dhanmondi Branch",
    phone: "+8801700000000",
    address: "Road 27, Dhanmondi, Dhaka",
    hours: "9 AM – 10 PM",
    lat: 23.7461,
    lng: 90.3742,
    services: [
      "Wash & Fold",
      "Iron Service",
      "Dry Cleaning",
      "Express Delivery",
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
      <h1 className="text-3xl font-bold mb-6">{branch.name}</h1>

      {/* Basic Info */}
      <Card className="mb-6 shadow">
        <CardHeader>
          <CardTitle>Branch Information</CardTitle>
        </CardHeader>

        <CardContent className="text-gray-700 space-y-3">
          <p className="flex items-center gap-2">
            <MapPin className="text-blue-600 h-5 w-5" />
            {branch.address}
          </p>

          <p className="flex items-center gap-2">
            <Phone className="text-blue-600 h-5 w-5" />
            {branch.phone}
          </p>

          <p className="flex items-center gap-2">
            <Clock className="text-blue-600 h-5 w-5" />
            {branch.hours}
          </p>

          <div className="flex gap-2 mt-3">
            <Button className="bg-blue-600 text-white flex items-center gap-2">
              <Phone className="h-5 w-5" /> Call Branch
            </Button>

            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() =>
                window.open(
                  `https://www.google.com/maps/search/?api=1&query=${branch.lat},${branch.lng}`
                )
              }
            >
              <Map className="h-5 w-5" /> View on Map
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ⭐ Map Section */}
      <Card className="mb-6 shadow">
        <CardHeader>
          <CardTitle>Branch Location</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="h-[340px] w-full rounded-lg overflow-hidden">
            Map view
          </div>
        </CardContent>
      </Card>

      {/* ⭐ Services */}
      <Card className="shadow">
        <CardHeader>
          <CardTitle>Available Services</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-wrap gap-2 mt-2">
            {branch.services.map((service, idx) => (
              <Badge
                key={idx}
                className="px-3 py-1 bg-blue-100 text-blue-700 flex items-center gap-1"
              >
                <CheckCircle className="h-4 w-4" /> {service}
              </Badge>
            ))}
          </div>

          <Button className="mt-6 bg-blue-600 text-white flex gap-2">
            Book Order <ArrowRight className="h-5 w-5" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
