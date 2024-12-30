"use server";
import { PhoneIcon } from "lucide-react";
import { CalendarIcon, DropletIcon, UserIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserType {
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

export default async function Page() {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("token");
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
  const call = await fetch(`${server_url}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt?.value}`,
    },
  });

  if (!call.ok) {
    return redirect("/");
  }
  const req = await call.json();

  const user: UserType = req;

  const dobDay = user.date_of_birth.slice(0, 2);
  const dobMonth = user.date_of_birth.slice(2, 4);
  const dobYear = user.date_of_birth.slice(4, 8);

  const dob = new Date(`${dobYear}-${dobMonth}-${dobDay}`);

  // Get the current date
  const today = new Date();

  // Calculate the age
  let ageNow = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();
  const dayDifference = today.getDate() - dob.getDate();

  // Adjust age if the birthday hasn't occurred yet this year
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    ageNow--;
  }

  console.log(req);

  return (
    <main className="grid grid-cols-7 gap-6 p-6 font-open">
      <div className="col-span-2 relative ">
        <Card className="w-full max-w-md mx-auto bg-zinc-50 dark:bg-zinc-900 overflow-hidden border-none sticky top-[98px]">
          <CardHeader className="relative pb-0">
            <div className="absolute inset-0 h-20 bg-gradient-to-r from-red-600 to-red-400" />
            <Avatar className="relative z-10 w-24 h-24 mx-auto border-4 border-zinc-50 dark:border-zinc-900 shadow-lg">
              <AvatarImage src={user.name} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="pt-4 text-center">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
              {user.name}
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="flex items-center justify-center space-x-2">
                <PhoneIcon className="w-4 h-4 text-zinc-400" />
                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                  {user.phone_number}
                </span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <DropletIcon className="w-4 h-4 text-red-500" />
                <span className="text-sm font-semibold text-red-500">
                  {user.blood_group}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center justify-center space-x-2">
                <UserIcon className="w-4 h-4 text-zinc-400" />
                <span>{user.gender}</span>
              </div>
              <div className="flex items-center justify-center space-x-2">
                <CalendarIcon className="w-4 h-4 text-zinc-400" />
                <span>
                  {dobDay + "-" + dobMonth + "-" + dobYear} ({ageNow} years old)
                </span>
              </div>
            </div>

            <div className="mt-6 flex flex-col justify-center items-center gap-y-6">
              <Badge
                variant={user.is_donor ? "default" : "secondary"}
                className="text-xs"
              >
                {user.is_donor ? "Blood Donor" : "Not a Donor"}
              </Badge>
              {user.is_donor ? (
                <Button variant="outline" className="" asChild>
                  <Link href="/profile/donor-profile">Donor Profile</Link>
                </Button>
              ) : (
                <Button
                  className="text-sm text-foreground"
                  variant="outline"
                  asChild
                >
                  <Link href="/profile/donor-profile">Become a donor</Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="col-span-5 h-dvh bg-zinc-50 dark:bg-zinc-900 rounded-lg p-4">
        <div className="h-[200px] w-full mb-4 grid grid-cols-3 gap-4">
          <div className="h-full text-center flex flex-col justify-center items-center">
            <h1 className="text-4xl">32</h1>
            <p>Donations made</p>
          </div>
          <div className="h-full text-center flex flex-col justify-center items-center">
            <h1 className="text-4xl">32</h1>
            <p>Requests made</p>
          </div>
          <div className="h-full text-center flex flex-col justify-center items-center">
            <h1 className="text-4xl">32</h1>
            <p>Donations Shared</p>
          </div>
        </div>
        <div className="grid gap-2">
          <h2 className="text-3xl border-b border-muted-foreground/30 pb-2">
            About me
          </h2>
          <p className="text-sm">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            omnis repellendus, quisquam et obcaecati, animi harum blanditiis,
            voluptatibus eveniet vitae adipisci atque laborum quia odio fuga?
            Laboriosam nemo modi magnam.
          </p>
        </div>
      </div>
    </main>
  );
}
