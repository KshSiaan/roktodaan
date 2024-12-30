"use client";

import * as React from "react";
import {
  Bot,
  Frame,
  HandshakeIcon,
  HeartPulseIcon,
  LogOutIcon,
  Map,
  PieChart,
  Settings,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "Admin",
    email: "admin@admin.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Manage donations",
          url: "#",
        },
        {
          title: "Manage requests",
          url: "#",
        },
      ],
    },
    {
      title: "Users & Accounts",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Manage Users",
          url: "#",
        },
        {
          title: "Manage Hospitals",
          url: "#",
        },
      ],
    },
    {
      title: "Roles & Permissions",
      url: "#",
      icon: HandshakeIcon,
      items: [
        {
          title: "Manage roles",
          url: "#",
        },
        {
          title: "Manage permissions",
          url: "#",
        },
        {
          title: "Overview R&P",
          url: "#",
        },
      ],
    },
    {
      title: "Account",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Notes",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Logout",
      url: "#",
      icon: LogOutIcon,
    },
  ],
  projects: [
    {
      name: "Messages",
      url: "#",
      icon: Frame,
    },
    {
      name: "FAQ",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Aboout Us",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-foreground">
                  <HeartPulseIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">RoktoDaan</span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
