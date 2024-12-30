import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Calendar, DropletIcon } from "lucide-react";
import type { Donors } from "./donor-find";
type DonorsProps = {
  donors: Donors[];
};
export default function Donors({ donors }: DonorsProps) {
  return (
    <div className="container mx-auto font-open">
      <div className="font-semibold py-4 text-right">111 Donors found</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {donors.map((item, index) => (
          <Card
            key={index}
            className="p-6 bg-background dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src="https://i.pravatar.cc/100?img=3"
                  alt="Michael Johnson"
                />
                <AvatarFallback>MJ</AvatarFallback>
              </Avatar>
              <div className="text-right">
                <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                  {item.name}
                </h2>
                <div className="flex items-center justify-end mt-1">
                  <DropletIcon className="w-4 h-4 mr-1 text-primary" />
                  <span className="font-bold text-primary">
                    {item.blood_group}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Donations: {item.donation_count}
              </span>
              <Badge
                variant="outline"
                className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
              >
                {item.donation_count > 5 ? "Regular Donor" : "New Donor"}
              </Badge>
            </div>
            <div className="flex items-center mb-2">
              <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400 capitalize">
                {item.district}
              </span>
            </div>
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 mr-2 text-zinc-500" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Last donation: May 10, 2023
              </span>
            </div>
            <div className="flex items-center mb-4">
              <Phone className="w-4 h-4 mr-2 text-zinc-500" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                {item.phone_number}
              </span>
            </div>
            <Button className="w-full bg-[#C62828] hover:bg-[#B71C1C] text-white">
              Request donation
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
