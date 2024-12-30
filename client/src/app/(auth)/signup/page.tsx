"use client";
import { Input } from "@/components/ui/input";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bloodGroups, districts } from "@/app/data/search-formdata";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useCookies } from "react-cookie";
const formSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(30, "Name cannot exceed 30 characters"),
    email: z.string().email("Invalid email format"),
    blood_group: z.string().min(1, "Please select your blood group"), // Ensures a value is selected
    phone: z.string().min(8, "Please use a valid phone number"),
    gender: z.string().min(1, "Please provide your gender"),
    district: z.string().min(1, "Please provide a district"),
    dob: z.date({ required_error: "A date of birth is required" }),
    password: z
      .string()
      .min(8, "Please use a password that is at least 8 characters long"),
    repass: z.string().min(1, "Please confirm your password"),
    tnc: z.boolean().refine((val) => val, "You must accept the terms"),
  })
  .refine((data) => data.password === data.repass, {
    message: "Passwords must match",
    path: ["repass"],
  });

export default function Page() {
  const [, setCookie] = useCookies();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   name: "John Doe",
    //   email: "john.doe@example.com",
    //   blood_group: "A+",
    //   phone: "1234567890",
    //   gender: "male",
    //   district: "dhaka",
    //   dob: new Date("2000-01-01"), // Use ISO 8601 format for dates
    //   password: "abcdefgh",
    //   repass: "abcdefgh",
    //   tnc: true, // Default to false since terms must be explicitly agreed upon
    // },
    defaultValues: {
      name: "",
      email: "",
      blood_group: "",
      phone: "",
      gender: "",
      dob: new Date("2000-01-01"), // Use ISO 8601 format for dates
      password: "",
      repass: "",
      tnc: false, // Default to false since terms must be explicitly agreed upon
    },
  });

  async function registerSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
    console.log(server_url);

    const call = await fetch(`${server_url}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Add any other headers you need (e.g., authentication tokens)
      },
      body: JSON.stringify(values), // assuming 'body' is an object
    });

    const res = await call.json();

    if (!call.ok) {
      if (Array.isArray(res)) {
        for (let i = 0; i < res.length; i++) {
          form.setError(res[i].field, { message: res[i].message });
        }
      } else {
        form.setError(res.field, { message: res.message });
        console.log(res.message);
      }
    }

    if (res.token) {
      const token = res.token;

      setCookie("token", token, {
        path: "/", // The path where the cookie is accessible
        maxAge: 7 * 24 * 60 * 60, // Max age in seconds (7 days)
        secure: process.env.NODE_ENV === "production", // Set to true for HTTPS connections
        sameSite: "lax", // Controls cookie sending behavior
        httpOnly: false, // Set to true if the cookie should be HTTP-only (useful for security)
      });
      console.log(res);
    }
  }

  return (
    <>
      <main className="w-dvw h-dvh p-6 grid grid-cols-1 space-x-6 font-open lg:bg-inherit">
        <div className="w-full h-full flex flex-col justify-start items-center">
          <div className="w-full sm:w-4/5 px-6 mb-2">
            <Link href="/" className="hover:text-blue-700 hover:underline">
              &larr; Back to website
            </Link>
          </div>
          <div className="w-full sm:w-4/5 mx-auto px-6">
            <h1 className="text-4xl mb-2">Create an account</h1>
            <p>
              Already have an account?{" "}
              <Link href="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </div>
          <Form {...form}>
            <form
              className="w-full sm:w-4/5 mx-auto px-6 grid grid-cols-6 gap-6 pt-6"
              onSubmit={form.handleSubmit(registerSubmit)}
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <FormLabel>Your full name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="email@email.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="blood_group"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <FormLabel>Blood group</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your blood group" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {bloodGroups.map((item, index) => (
                          <SelectItem value={item} key={index}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <FormLabel>Phone number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="0987654321" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your Gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-3 lg:col-span-1">
                    <FormLabel>Disctrict</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your disctrict" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((item, index) => (
                          <SelectItem value={item.value} key={index}>
                            {item.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <div className="">
                      <FormLabel>Date of birth</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal mt-2",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-3">
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="abc123..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="repass"
                render={({ field }) => (
                  <FormItem className="col-span-6 sm:col-span-3">
                    <FormLabel>Re-type Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="abc123..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-6 w-full flex flex-row justify-between items-center">
                <FormField
                  control={form.control}
                  name="tnc"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <div className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            name="remember"
                            id="remember"
                            className="border-foreground checked:bg-foreground text-foreground checked:border-foreground data-[state=checked]:bg-foreground"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            Accept{" "}
                            <Link
                              href="terms-conditions"
                              className="text-primary hover:underline"
                            >
                              Terms & Conditions
                            </Link>
                          </FormLabel>
                        </div>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex items-center space-x-2"></div>
                <div className=""></div>
              </div>
              <div className="col-span-6">
                <button className="block w-full md:w-1/2 xl:w-1/3 mx-auto font-semibold text-md px-6 py-2 bg-primary rounded-lg text-background shadow-black hover:shadow-sm transition-all duration-200">
                  Register
                </button>
              </div>
            </form>
          </Form>

          <div className="w-full sm:w-4/5 px-6 mt-6 font-open">
            <div className="grid grid-cols-3  xl:grid-cols-7 justify-center items-center mb-6 text-muted-foreground text-sm">
              <hr className="xl:col-span-3" />
              <span className="h-full w-full flex justify-center items-center">
                <p className="hidden sm:block">or create with</p>
                <p className="sm:hidden">or</p>
              </span>
              <hr className="xl:col-span-3" />
            </div>
            <button className="w-full md:w-1/2 xl:w-1/3 mx-auto flex items-center justify-center gap-4 font-semibold text-sm md:text-md px-4 py-2 md:px-6 md:py-2 border border-black rounded-lg text-foreground bg-background shadow hover:shadow-md hover:bg-gray-200 transition-all duration-200">
              <Image
                width={24}
                height={24}
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
                className="h-6 w-6"
              />
              Sign up with Google
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
