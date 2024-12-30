"use client";
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function AvailableBlood() {
  const chartData = [
    { bloodGroup: "A+", bloodBags: 186 },
    { bloodGroup: "O+", bloodBags: 305 },
    { bloodGroup: "B+", bloodBags: 237 },
    { bloodGroup: "AB+", bloodBags: 73 },
    { bloodGroup: "A-", bloodBags: 209 },
    { bloodGroup: "O-", bloodBags: 130 },
    { bloodGroup: "B-", bloodBags: 214 },
    { bloodGroup: "AB-", bloodBags: 90 },
  ];

  const chartConfig = {
    desktop: {
      label: "bloodBags",
      color: "#C62828",
    },
  } satisfies ChartConfig;
  return (
    <div className="w-1/2 block mx-auto">
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="bloodGroup"
            // tickLine={false}
            tickMargin={10}
            // axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent indicator="dot" />} />
          <Bar dataKey="bloodBags" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
