"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { bloodGroups, districts } from "../../data/search-formdata";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Bleed from "@/components/ui/bleed";
import Donors from "./donor-cards";

export interface Donors {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone_number: string;
  blood_group: string;
  date_of_birth: string; // You might want to use Date type, depending on how it's handled
  gender: string;
  district: string;
  is_donor: boolean;
  donation_count: number;
  emergency_donor: boolean;
}

export default function Donorfind() {
  const [date, setDate] = useState<Date>();
  const [donors, setDonors] = useState<Donors[]>([]);

  const fetchDonors = async () => {
    const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
    const call = await fetch(`${server_url}/donors`);
    const res = await call.json();

    if (!call.ok) {
      throw new Error(res);
      return;
    }
    console.log(res);
    setDonors(res.data);
    return res.data;
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  return (
    <main className="px-[10%] mt-[48px] pb-8">
      <div className="w-full py-6">
        <form className="w-full h-auto grid grid-cols-5 gap-4">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Blood Group" />
            </SelectTrigger>
            <SelectContent>
              {bloodGroups.map((group) => (
                <SelectItem key={group} value={group}>
                  {group}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select District" />
            </SelectTrigger>
            <SelectContent>
              {districts.map((group) => (
                <SelectItem key={group.value} value={group.value}>
                  {group.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Donor type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="eligible">Eligible</SelectItem>
            </SelectContent>
          </Select>
          <Button type="submit"> Find Donor </Button>
        </form>
      </div>
      <Bleed amm={0.5} />
      <Donors donors={donors} />
    </main>
  );
}
