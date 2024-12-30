"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTheme } from "next-themes";
import Link from "next/link";
import {
  BellIcon,
  FileText,
  LogOutIcon,
  Menu,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useRouter } from "next/navigation";
import { useCookies } from "react-cookie";
import { jwtVerify } from "jose";
import ModeToggle from "./mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

//incode
const navItems = [
  { name: "Home", href: "/" },
  {
    name: "Services",
    href: "#",
    subItems: [
      { name: "Find Donor", href: "/find-donors" },
      { name: "Donate Blood", href: "/donate" },
      { name: "Request Blood", href: "/request" },
      { name: "Blood Drive Events", href: "/blood-drive-events" },
      { name: "Donation Centers", href: "/donation-centers" },
    ],
  },
  { name: "How it Works", href: "/how-it-works" },
  {
    name: "More",
    href: "#",
    subItems: [
      { name: "About Us", href: "/about-us" },
      { name: "Contact Us", href: "/contact-us" },
      { name: "Terms and Conditions", href: "/terms-and-conditions" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "FAQ", href: "/faq" },
    ],
  },
];

export default function Navbar() {
  const { theme } = useTheme();
  const navig = useRouter();
  const [cookie, , removeCookie] = useCookies(["token"]);

  const [isSigned, setIsSigned] = useState<boolean>(false);
  // const [userData,setUserData] = useState()

  async function checkJWT() {
    if (cookie.token) {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      const verifiedToken = await jwtVerify(cookie.token, secret);

      if (verifiedToken) {
      } else {
      }
    }
  }

  function signOut() {
    removeCookie("token");
    setIsSigned(false);
    navig.push("/");
  }

  useEffect(() => {
    if (cookie.token) {
      setIsSigned(true);
    }
    checkJWT();
  }, []);

  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        className="absolute z-10 top-0 left-0 h-[96px] w-dvw flex justify-center items-center"
        suppressHydrationWarning
      >
        <div
          className="absolute -z-10 top-0 left-0 w-full h-1/2 bg-primary"
          suppressHydrationWarning
        ></div>
      </div>
    ); // Or a loading spinner, or just return nothing until theme is set
  }

  return (
    <div className="absolute z-10 top-0 left-0 h-[96px] w-dvw flex justify-center items-center">
      <div className="absolute -z-10 top-0 left-0 w-full h-1/2 bg-primary"></div>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 0.3,
          ease: "easeInOut",
          stiffness: 100,
        }}
        className="fixed h-[64px] w-[95%] bg-background shadow-sm dark:shadow-primary/20 rounded-full flex flex-row justify-between items-center px-6 font-open"
      >
        <div className="flex items-center w-[20%]">
          <Image
            src={
              theme === "dark"
                ? "/assets/logo-dark.svg"
                : "/assets/logo-light.svg"
            }
            height={40}
            width={184}
            alt="logo"
            className="h-8 w-auto"
            suppressHydrationWarning
          />
        </div>
        <div className="hidden h-full md:flex items-center space-x-6 w-auto">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  {item.subItems ? (
                    <>
                      <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.subItems.map((subItem) => (
                            <li key={subItem.name}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={subItem.href}
                                  className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                                >
                                  <div className="text-sm font-medium leading-none">
                                    {subItem.name}
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex justify-end items-center gap-x-4 md:w-[20%]">
          <ModeToggle />
          {isSigned ? (
            <div className="flex flex-row justify-end items-center space-x-2 gap-6">
              <Button variant="ghost" size="icon" className="rounded-full">
                <BellIcon size={18} />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer hover:scale-110 transition-transform hidden md:block">
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onSelect={() => navig.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    <span>View Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navig.push("/my-requests")}>
                    <FileText className="mr-2 h-4 w-4" />
                    <span>My Requests</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => navig.push("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onSelect={() => signOut()}>
                    <LogOutIcon className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="link"
                className="text-sm font-medium"
                onClick={() => {
                  navig.push("/login");
                }}
              >
                Login
              </Button>
              <Button
                variant="outline"
                className="rounded-full text-sm font-medium"
                onClick={() => {
                  navig.push("/signup");
                }}
              >
                Sign Up
              </Button>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden w-10 h-10 rounded-full"
              >
                <Menu size={18} />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="right">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col space-y-4 mt-4">
                <Accordion type="single" collapsible>
                  {navItems.map((item) => (
                    <AccordionItem value={item.name} key={item.name}>
                      {item.subItems ? (
                        <>
                          <AccordionTrigger className="text-sm font-medium text-primary hover:text-primary/80 dark:text-primary-foreground">
                            {item.name}
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col space-y-2">
                              {item.subItems.map((subItem) => (
                                <Link
                                  key={subItem.name}
                                  href={subItem.href}
                                  className="text-sm font-medium text-muted-foreground hover:text-primary pl-6 py-2"
                                >
                                  {subItem.name}
                                </Link>
                              ))}
                            </div>
                          </AccordionContent>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className="flex h-10 w-full items-center text-sm font-medium text-primary hover:text-primary/80 dark:text-primary-foreground"
                        >
                          {item.name}
                        </Link>
                      )}
                    </AccordionItem>
                  ))}
                </Accordion>
                {isSigned ? (
                  <Button
                    className="justify-start text-sm font-medium"
                    variant="secondary"
                    onClick={() => {
                      signOut();
                    }}
                  >
                    Log out
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="link"
                      className="justify-start text-sm font-medium z-20"
                      onClick={() => {
                        navig.push("/login");
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="justify-start text-sm font-medium"
                      variant="secondary"
                      onClick={() => {
                        navig.push("/signup");
                      }}
                    >
                      Sign Up
                    </Button>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </motion.nav>
    </div>
  );
}
