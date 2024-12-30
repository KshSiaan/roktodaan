"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChevronLeft, Loader2Icon } from "lucide-react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
type User = {
  _id: string;
  name: string;
  role: string;
  email: string;
  phone_number: string;
  blood_group: string;
  date_of_birth: string;
  gender: "male" | "female" | "other";
  district: string;
  is_donor: boolean;
  donation_count: number;
  emergency_donor: boolean;
};

function formatDate(dateString: string): string {
  const day = dateString.slice(0, 2);
  const month = dateString.slice(2, 4);
  const year = dateString.slice(4, 8);
  return `${day}/${month}/${year}`;
}

function ProfileField({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="text-sm font-medium text-muted-foreground">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}

export function UserProfileDisplay({ user }: { user: User }) {
  const [confirm, setConfirm] = useState<string>("");
  const [pending, setPending] = useState<boolean>(false);
  const [cookies] = useCookies(["token"]);
  const navig = useRouter();
  const { toast } = useToast();

  async function confirmer() {
    try {
      setPending(true);

      if (confirm !== user.name) {
        console.error(
          "Confirmation mismatch: User name does not match the confirmation input."
        );
        setPending(false);
        return;
      }

      const jwt = cookies.token;
      console.log(jwt);

      if (!jwt) {
        console.error("No valid JWT token found in cookies.");
        setPending(false);
        return;
      }

      const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

      if (!serverUrl) {
        console.error("Server URL is not defined in environment variables.");
        setPending(false);
        return;
      }

      const response = await fetch(`${serverUrl}/become-donor`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Failed to become donor:", errorResponse);
        setPending(false);
        return;
      }

      const data = await response.json();
      console.log(data);
      toast({
        title: `${data.name} Donor Profile`,
        description: "You have successfully been signed as a blood donor",
      });
      navig.push("/profile");
    } catch (error) {
      console.error("An unexpected error occurred during confirmation:", error);
    } finally {
      setPending(false);
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto bg-background">
      <CardHeader>
        <div className="">
          <Button
            className="text-muted-foreground hover:text-foreground"
            variant="link"
            asChild
          >
            <Link href="/profile" className="px-0">
              <ChevronLeft className="h-4 w-4" />
              Back to profile
            </Link>
          </Button>
        </div>
        <CardTitle className="text-2xl font-bold">Donor Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProfileField label="Name" value={user.name} />
          <ProfileField
            label="Date of Birth"
            value={formatDate(user.date_of_birth)}
          />
          <ProfileField label="Blood Group" value={user.blood_group} />
          <ProfileField label="Email" value={user.email} />
          <ProfileField label="Gender" value={user.gender} />
          <ProfileField label="Phone Number" value={user.phone_number} />
          <ProfileField label="District" value={user.district} />
          <ProfileField
            label="Donor Status"
            value={
              <Badge variant={user.is_donor ? "default" : "secondary"}>
                {user.is_donor ? "Active Donor" : "Not a Donor"}
              </Badge>
            }
          />
          {user.is_donor && (
            <ProfileField
              label="Donation Count"
              value={user.donation_count.toString()}
            />
          )}
          {user.emergency_donor && (
            <ProfileField
              label="Emergency Donor"
              value={
                <Badge variant="destructive">Available for Emergency</Badge>
              }
            />
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        {!user.is_donor && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className="w-full sm:w-auto">
                Become a Donor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[625px]">
              <DialogHeader>
                <DialogTitle>Donor Request Confirmation</DialogTitle>
                <DialogDescription>
                  To confirm your interest in becoming a donor, please enter
                  your name, &quot;
                  <span className="font-bold">{user.name}</span>&quot; in the
                  input field below to proceed.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="">
                  <Input
                    id="name"
                    value={confirm}
                    onChange={(e) => {
                      setConfirm(e.target.value); // Use e.target.value to update the state
                    }}
                    className=""
                  />
                </div>
              </div>
              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-green-600"
                  onClick={confirmer}
                >
                  {pending ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    "Accept & Become donor"
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
