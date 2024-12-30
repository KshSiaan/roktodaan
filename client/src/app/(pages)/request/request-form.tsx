"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import React from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  bloodGroups,
  districts,
  situationList,
} from "@/app/data/search-formdata";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  patient_name: z.string().min(1, "Patient name is required"),
  hospital: z.string(),
  available_phone_number: z.string().min(10, "Valid phone number is required"),
  situation: z.string().min(1, "Situation is required"),
  donation_date: z.string().min(1, "Donation date is required"),
  location: z.string().min(1, "Location is required"),
  district: z.string().min(1, "District is required"),
  blood_type: z.string().min(1, "Must select blood type for patient"),
  blood_bag_quantity: z.string().min(1, "Blood bag quantity is required"),
});

const colors = [
  "text-red-600", // Critical
  "text-orange-600", // High
  "text-blue-600", // Medium
  "text-green-600", // Low
  "text-gray-600", // Informational
];

export default function Requestform() {
  const navig = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   patient_name: "",
    //   hospital: "",
    //   available_phone_number: "",
    //   situation: "",
    //   donation_date: "",
    //   location: "",
    //   district: "",
    //   blood_bag_quantity: "",
    // },
    defaultValues: {
      patient_name: "John Doe", // Example patient name
      hospital: "", // Default hospital name
      available_phone_number: "1234567890", // Placeholder phone number
      situation: "low", // Default priority level
      donation_date: "2024-12-03", // Current date as default
      location: "123 Main St, City", // Example location
      district: "dhaka", // Example district
      blood_bag_quantity: "2", // Default number of blood bags
    },
  });

  const submitter = async (values: z.infer<typeof formSchema>) => {
    // Extract JWT from cookies
    const jwt = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!jwt) {
      console.error("JWT not found in cookies.");
      return;
    }

    const server_url = process.env.NEXT_PUBLIC_SERVER_URL;

    try {
      const call = await fetch(`${server_url}/request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(values),
      });

      const req = await call.json();

      if (!call.ok) {
        form.setError(req.field, { message: req.message });
        return;
      }

      navig.push("/donate");
    } catch (error) {
      console.error("Error during request:", error);
    }
  };

  return (
    <main className="px-[10%] py-8 font-open">
      <Form {...form}>
        <form className="grid gap-y-6" onSubmit={form.handleSubmit(submitter)}>
          <h3 className="text-center mb-6 font-bold underline underline-offset-2 text-zinc-800 dark:text-zinc-400">
            Fill this form to complete the request
          </h3>
          <FormField
            control={form.control}
            name="patient_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Patients Name</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="Patient's Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="hospital"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name of the hospital</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled
                    placeholder="Hospital name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="available_phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone number</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Urgent phone number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-full grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="situation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient&apos;s situation</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary">
                        <SelectValue placeholder="Select Priority Level" />
                      </SelectTrigger>
                      <SelectContent>
                        {situationList.map((situation, index) => (
                          <SelectItem
                            key={index}
                            value={situation.title.toLowerCase()}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={`font-semibold ${colors[index]}`}
                              >
                                {situation.title}
                              </span>
                              <span className="text-sm text-muted-foreground ml-auto">
                                {situation.description}
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="donation_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Donation Date</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      placeholder="Patient's Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Mirpur 12, Dhaka"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="blood_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blood type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-primary">
                        <SelectValue placeholder="Select Blood type" />
                      </SelectTrigger>
                      <SelectContent>
                        {bloodGroups.map((item, index) => (
                          <SelectItem key={index} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="blood_bag_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ammount of blood bags needed</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0.5,1,2.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <p className="text-sm text-foreground p-4 border rounded-lg font-bold">
            <span className="text-red-600">Note:</span> Please refrain from
            posting requests unless assistance is genuinely needed. Ensure your
            queries are well-thought-out and necessary to maintain a
            professional and efficient environment.
          </p>
          {/* {cookie.token ? (
            ""
          ) : (
            <p className="text-red-600 text-xl">
              You may proceed to submit an emergency request. however, we
              strongly encourage you to log in or sign up prior to making a
              donation request for a more streamlined experience.
            </p>
          )} */}
          <div className="flex justify-center">
            <Button
              type="submit"
              className="bg-green-600 hover:bg-green-700 hover:shadow-sm"
            >
              Post donation request
            </Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
