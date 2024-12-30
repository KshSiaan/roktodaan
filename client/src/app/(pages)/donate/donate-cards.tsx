import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, DropletIcon, HandHelpingIcon } from "lucide-react";
const colorsForSituation = [
  { title: "critical", color: "bg-red-600" },
  { title: "high", color: "bg-orange-600" },
  { title: "medium", color: "bg-blue-600" },
  { title: "low", color: "bg-green-600" },
  { title: "informational", color: "bg-gray-600" },
];
const getColorForSituation = (situation: string) => {
  const match = colorsForSituation.find(
    (c) => c.title === situation.toLowerCase()
  );
  return match ? match.color : "text-gray-600"; // Default color if no match
};

type BloodDonationRequest = {
  blood_type: string;
  blood_bag_quantity: string;
  createdAt: string; // ISO date string
  district: string;
  donation_date: string; // ISO date string
  location: string;
  patient_name: string;
  phone_number: string;
  situation: string; // e.g., "low"
  status: string; // e.g., "new"
  updatedAt: string; // ISO date string
  user_id: string;
  __v: number;
  _id: string;
};

export default function Donors({ data }: { data: BloodDonationRequest[] }) {
  if (data.length == 0 || undefined) {
    return (
      <div className="h-[50dvh] w-full flex justify-center items-center">
        No result found
      </div>
    );
  }

  return (
    <div className="container mx-auto font-open">
      <div className="font-semibold py-4 text-right">
        {data.length} Requests found
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <Card
            className="p-6 bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
            key={index}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                  {item.patient_name}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  ID: {item._id}
                </p>
              </div>
              <Badge
                className={`capitalize ${getColorForSituation(item.situation)}`}
              >
                {item.situation}
              </Badge>
            </div>
            <div className="flex items-center mb-2">
              <DropletIcon className="w-5 h-5 mr-2 text-[#C62828]" />
              <span className="font-bold text-[#C62828]">
                {item.blood_type}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <HandHelpingIcon className="w-5 h-5 mr-2 text-zinc-500" />
              <span className="text-zinc-600 dark:text-zinc-400">
                {item.blood_bag_quantity}{" "}
                {parseFloat(item.blood_bag_quantity) === 1 ||
                parseFloat(item.blood_bag_quantity) < 1
                  ? "bag"
                  : "bags"}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
                {item.location} , {item.district}
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="w-4 h-4 mr-2 text-zinc-500" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.phone_number}
              </span>
            </div>

            <div className="flex space-x-2">
              <Button className="flex-1 bg-[#C62828] hover:bg-[#B71C1C] text-white">
                View request
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[#C62828] text-[#C62828] hover:bg-green-600 hover:border-green-700 hover:text-white"
              >
                Share
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
