import React from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Clock,
  Calendar,
  DropletIcon,
  AlertCircle,
} from "lucide-react";

export default function Cards() {
  return (
    <div className="container mx-auto p-6 bg-zinc-100 dark:bg-zinc-900">
      <h1 className="text-3xl font-bold mb-6 text-zinc-800 dark:text-zinc-100">
        Find Blood Donations
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <Card className="p-6 bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                John Doe
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                ID: BD-2023-001
              </p>
            </div>
            <Badge variant="destructive" className="bg-[#C62828]">
              Urgent
            </Badge>
          </div>
          <div className="flex items-center mb-2">
            <DropletIcon className="w-5 h-5 mr-2 text-[#C62828]" />
            <span className="font-bold text-[#C62828]">A+</span>
          </div>
          <div className="flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Central Hospital, New York
            </span>
          </div>
          <div className="flex items-center mb-4">
            <Phone className="w-4 h-4 mr-2 text-zinc-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              +1 (555) 123-4567
            </span>
          </div>
          <Button className="w-full bg-[#C62828] hover:bg-[#B71C1C] text-white">
            Contact Donor
          </Button>
        </Card>

        {/* Card 2 */}
        <Card className="p-6 bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src="https://i.pravatar.cc/100?img=2"
                alt="Jane Smith"
              />
              <AvatarFallback>JS</AvatarFallback>
            </Avatar>
            <div className="text-right">
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                Jane Smith
              </h2>
              <Badge variant="outline" className="mt-1">
                O-
              </Badge>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Last donation: 3 months ago
          </p>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">
                Boston
              </span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="w-4 h-4 mr-2 text-[#C62828]" />
              <span className="text-sm font-semibold text-[#C62828]">
                High Priority
              </span>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full border-[#C62828] text-[#C62828] hover:bg-[#C62828] hover:text-white"
          >
            Request Donation
          </Button>
        </Card>

        {/* Card 3 */}
        <Card className="p-6 bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                Blood Drive Event
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Organized by Red Cross
              </p>
            </div>
            <Badge className="bg-green-500">Upcoming</Badge>
          </div>
          <div className="flex items-center mb-2">
            <Calendar className="w-4 h-4 mr-2 text-zinc-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              July 15, 2023
            </span>
          </div>
          <div className="flex items-center mb-2">
            <Clock className="w-4 h-4 mr-2 text-zinc-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              9:00 AM - 5:00 PM
            </span>
          </div>
          <div className="flex items-center mb-4">
            <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Community Center, Chicago
            </span>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            All blood types needed. Free health check included.
          </p>
          <Button className="w-full bg-[#C62828] hover:bg-[#B71C1C] text-white">
            Register Now
          </Button>
        </Card>

        {/* Card 4 */}
        <Card className="p-6 bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
                Emergency Request
              </h2>
              <Badge variant="destructive" className="mt-1 bg-[#C62828]">
                Critical
              </Badge>
            </div>
            <DropletIcon className="w-12 h-12 text-[#C62828]" />
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Urgent need for{" "}
            <span className="font-bold text-[#C62828]">AB-</span> blood type
          </p>
          <div className="flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              St. Mary&apos;s Hospital, San Francisco
            </span>
          </div>
          <div className="flex items-center mb-4">
            <Phone className="w-4 h-4 mr-2 text-zinc-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              +1 (555) 987-6543
            </span>
          </div>
          <div className="flex space-x-2">
            <Button className="flex-1 bg-[#C62828] hover:bg-[#B71C1C] text-white">
              Respond Now
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-[#C62828] text-[#C62828] hover:bg-[#C62828] hover:text-white"
            >
              Share
            </Button>
          </div>
        </Card>

        {/* Card 5 */}
        <Card className="p-6 bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
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
                Michael Johnson
              </h2>
              <div className="flex items-center justify-end mt-1">
                <DropletIcon className="w-4 h-4 mr-1 text-[#C62828]" />
                <span className="font-bold text-[#C62828]">B+</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Donations: 15
            </span>
            <Badge
              variant="outline"
              className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
            >
              Regular Donor
            </Badge>
          </div>
          <div className="flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-2 text-zinc-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Los Angeles, CA
            </span>
          </div>
          <div className="flex items-center mb-4">
            <Calendar className="w-4 h-4 mr-2 text-zinc-500" />
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              Last donation: May 10, 2023
            </span>
          </div>
          <Button className="w-full bg-[#C62828] hover:bg-[#B71C1C] text-white">
            Schedule Donation
          </Button>
        </Card>

        {/* Card 6 */}
        <Card className="p-6 bg-white dark:bg-zinc-800 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <h2 className="text-xl font-semibold text-zinc-800 dark:text-zinc-100 mb-4">
            Blood Type Compatibility
          </h2>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="text-center p-2 bg-zinc-100 dark:bg-zinc-700 rounded">
              <span className="font-bold text-[#C62828]">A+</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Can receive from: A+, A-, O+, O-
              </p>
            </div>
            <div className="text-center p-2 bg-zinc-100 dark:bg-zinc-700 rounded">
              <span className="font-bold text-[#C62828]">B+</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Can receive from: B+, B-, O+, O-
              </p>
            </div>
            <div className="text-center p-2 bg-zinc-100 dark:bg-zinc-700 rounded">
              <span className="font-bold text-[#C62828]">AB+</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Can receive from: All types
              </p>
            </div>
            <div className="text-center p-2 bg-zinc-100 dark:bg-zinc-700 rounded">
              <span className="font-bold text-[#C62828]">O-</span>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Universal donor
              </p>
            </div>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
            Knowing your blood type is crucial for efficient donation and
            receiving processes.
          </p>
          <Button
            variant="outline"
            className="w-full border-[#C62828] text-[#C62828] hover:bg-[#C62828] hover:text-white"
          >
            Learn More About Blood Types
          </Button>
        </Card>
      </div>
    </div>
  );
}
