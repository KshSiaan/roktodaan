"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
const formSchema = z.object({
  name: z.string({ required_error: "This field cannot be empty" }),
  email: z
    .string({ required_error: "This field cannot be empty" })
    .email("Please use a valid email"),
  subject: z.string({ required_error: "This field cannot be empty" }),
  message: z.string({ required_error: "This field cannot be empty" }),
});

export default function Page() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {
    //   username: "",
    // },
  });
  return (
    <>
      <header className="text-center py-12 font-open">
        <h1 className="text-4xl font-semibold text-gray-900 dark:text-gray-100">
          Get in Touch with Us
        </h1>
        <p className="mt-3 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Have questions or need support? We’re here to help! Reach out to us,
          and our team will get back to you promptly.
        </p>
      </header>
      <main className="px-[10%] py-6 font-open">
        <Form {...form}>
          <form className="flex flex-col justify-start items-stretch gap-6 bg-zinc-200 dark:bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-2xl text-center">
              Let us know what&apos;s on your mind
            </h2>
            <div className="w-full h-auto grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
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
            </div>
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject of your message</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Subject of the message"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      className="resize-y"
                      placeholder="Your message..."
                      {...field}
                      rows={5}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button>Send Message</Button>
            </div>
          </form>
        </Form>
      </main>
    </>
  );
}
