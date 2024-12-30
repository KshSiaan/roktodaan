import React from "react";
import Donorfind from "./donor-find";

export default function Page() {
  return (
    <>
      <header className="text-center py-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Find Blood Donors Easily
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Browse a list of available donors ready to save lives. Connect quickly
          and securely.
        </p>
      </header>
      <Donorfind />
    </>
  );
}
