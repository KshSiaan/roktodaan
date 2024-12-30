import React from "react";
import { cookies } from "next/headers";
import { UserProfileDisplay } from "./profileData";

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

async function fetchUser(): Promise<User> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("token");
  const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

  const response = await fetch(`${server_url}/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt?.value}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }

  return response.json();
}

export default async function UserProfilePage() {
  const user = await fetchUser();

  return (
    <div className="container mx-auto px-4 py-8">
      <UserProfileDisplay user={user} />
    </div>
  );
}
