"use client";

import React, { useRef } from "react";
import {
  ComponentIcon,
  HeartHandshakeIcon,
  MapPinnedIcon,
  UsersIcon,
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

// Array of statistics data
const stats = [
  { Icon: UsersIcon, label: "Donors", value: 500 },
  { Icon: HeartHandshakeIcon, label: "Lives Saved", value: 1000 },
  { Icon: MapPinnedIcon, label: "Districts", value: 64 },
  { Icon: ComponentIcon, label: "Blood Groups", value: 8 },
];

export default function HomeCommunity() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div
      ref={ref}
      className="flex flex-wrap justify-around items-center w-full mt-12 gap-4"
    >
      {stats.map(({ Icon, label, value }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: [0.21, 1.11, 0.81, 0.99], // spring-like easing
          }}
          className="border rounded-md flex flex-col justify-around items-center space-y-4 p-8 w-full sm:w-2/5 lg:w-1/5"
        >
          <Icon size={48} className="text-primary" />
          <p className="text-xl font-semibold text-center">
            <CountUp end={value} duration={4} separator="," />
            {value > 100 ? "+" : ""} {label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
