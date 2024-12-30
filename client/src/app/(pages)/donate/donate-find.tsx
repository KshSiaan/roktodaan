"use client";

import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  bloodGroups,
  districts,
  situationList,
} from "@/app/data/search-formdata";
import Bleed from "@/components/ui/bleed";
import Donors from "./donate-cards";
import { fetchDonationRequests, BloodDonationRequest } from "@/lib/api";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const priorityColors = {
  critical: "text-red-600",
  high: "text-orange-600",
  medium: "text-blue-600",
  low: "text-green-600",
  informational: "text-gray-600",
};

const formSchema = z.object({
  group: z.string(),
  district: z.string(),
  priority: z.string(),
});

export default function DonorFind() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [data, setData] = useState<BloodDonationRequest[]>([]);

  useEffect(() => {
    refetch();
  }, []);

  async function refetch(values?: z.infer<typeof formSchema> | undefined) {
    setLoading(true);
    setError(false);
    setErrorMessage("");

    try {
      const data = await fetchDonationRequests(values || undefined);
      setData(data);
    } catch {
      setError(true);
      setErrorMessage("Data Fetch Failed");
    } finally {
      setLoading(false);
    }
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      group: "",
      district: "",
      priority: "",
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    if (
      values.group !== "" ||
      values.district !== "" ||
      values.priority !== ""
    ) {
      console.log(values);
      console.log("submitted");
      refetch(values);
    }
  };

  return (
    <main className="px-[5%] mt-[48px] pb-8">
      <h1 className="text-3xl font-bold mb-6">Donate blood</h1>
      <div className="bg-background shadow-md rounded-lg py-6 mb-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            onReset={() => {
              form.reset(); // Reset the form fields
              refetch(); // Call your refetch function
            }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
          >
            <FormField
              name="group"
              render={({ field }) => (
                <Select
                  name="bloodGroup"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
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
              )}
            />
            <FormField
              name="district"
              render={({ field }) => (
                <Select
                  name="district"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select District" />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map((district) => (
                      <SelectItem key={district.value} value={district.value}>
                        {district.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FormField
              name="priority"
              render={({ field }) => (
                <Select
                  name="priority"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Priority Level" />
                  </SelectTrigger>
                  <SelectContent>
                    {situationList.map((situation) => (
                      <SelectItem
                        key={situation.title}
                        value={situation.title.toLowerCase()}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={`font-semibold ${
                              priorityColors[
                                situation.title.toLowerCase() as keyof typeof priorityColors
                              ]
                            }`}
                          >
                            {situation.title}
                          </span>
                          <span className="text-sm text-gray-500">
                            {situation.description}
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <div className="w-full grid grid-cols-2 gap-4">
              <Button type="submit" className="">
                Find Request
              </Button>
              <Button variant="secondary" type="reset">
                Reset
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Bleed amm={0.5} />

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      ) : error ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline"> {errorMessage}</span>
        </div>
      ) : (
        <Donors data={data || []} />
      )}
    </main>
  );
}
