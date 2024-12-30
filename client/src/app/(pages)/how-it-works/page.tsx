import { processData } from "@/app/data/how-to-process";
import React from "react";

export default function Page() {
  return (
    <>
      <header className="text-center py-6 font-open">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          How RoktoDaan Works
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Discover the simple process of connecting blood donors and recipients.
          Join our mission to save lives effortlessly and securely.
        </p>
      </header>
      <main className="px-[10%] py-6">
        {processData.map((item, index) => (
          <div className="grid grid-cols-5 gap-6 py-6" key={index}>
            <div
              className={`w-full h-[300px] col-span-2 bg-emerald-500 ${
                index % 2 === 0 ? "order-2" : ""
              }`}
            ></div>
            <div className="w-full h-[300px] col-span-3">
              <h2 className="font-bold text-4xl mb-4 text-zinc-800">
                {item.title}
              </h2>
              <div className="w-full h-auto text-zinc-700">
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </main>
    </>
  );
}
