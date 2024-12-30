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
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string({ required_error: "This field cannot be empty" }).email(),
  password: z.string({ required_error: "Please put your password to login" }),
  remember: z.boolean(),
});

export default function Page() {
  const navig = useRouter();
  const [, setCookie] = useCookies();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function submitter(values: z.infer<typeof formSchema>) {
    console.log(values);
    const server_url = process.env.NEXT_PUBLIC_SERVER_URL;
    console.log(server_url);

    const call = await fetch(`${server_url}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values), // assuming 'body' is an object
    });

    const res = await call.json();

    if (!call.ok) {
      form.setError(res.field, { message: res.message });
      console.log(res.message);
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

      navig.push("/");

      return;
    }
  }

  return (
    <>
      <main className="w-dvw h-dvh p-6 grid grid-cols-2 space-x-6 font-open">
        <div className="w-full h-full bg-foreground rounded-lg"></div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Form {...form}>
            <form
              className="w-4/5 mx-auto px-6 grid space-y-8"
              onSubmit={form.handleSubmit(submitter)}
            >
              <h1 className="text-4xl">Log in to your account</h1>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Your password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-row justify-between items-center">
                <div className="">
                  <FormField
                    control={form.control}
                    name="remember"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-3 h-auto">
                        <FormControl>
                          <Checkbox
                            id="remember"
                            className="border-foreground checked:bg-foreground text-foreground checked:border-foreground data-[state=checked]:bg-foreground"
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <label
                          htmlFor="remember"
                          className="text-sm pb-2 font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </label>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="">
                  <Link
                    href="/forgot-pass"
                    className="text-sm font-medium leading-none hover:border-b-2 hover:text-destructive"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
              <button className="font-semibold text-md w-full px-6 py-4 bg-primary rounded-lg text-background shadow-black hover:shadow-sm transition-none">
                Log In
              </button>
            </form>
          </Form>
          <div className="w-4/5 px-6 mt-6">
            <button className="w-full flex items-center justify-center gap-4 font-semibold text-sm md:text-md px-4 py-3 md:px-6 md:py-4 border border-black rounded-lg text-foreground bg-background shadow hover:shadow-md hover:bg-gray-200 transition-all duration-200">
              <Image
                width={24}
                height={24}
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
                className="h-6 w-6"
              />
              Sign in with Google
            </button>
          </div>
          <div className="mt-4 w-4/5 px-6 text-center text-sm font-semibold">
            Dont have an account yet?{" "}
            <Link href="/signup" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
