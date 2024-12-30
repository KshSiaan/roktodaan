import React from "react";
import Requestform from "./request-form";

export default function Page() {
  return (
    <>
      <header className="text-center py-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Request Blood Donation
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Share your need and connect with donors who are ready to help. Quick,
          secure, and lifesaving.
        </p>
      </header>
      <Requestform />
    </>
  );
}
