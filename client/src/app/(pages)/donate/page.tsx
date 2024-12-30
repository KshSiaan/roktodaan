import React from "react";
import Donorfind from "./donate-find";

export default function Page() {
  return (
    <>
      <header className="text-center py-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
          Help those who needs
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Browse a list of blood requests that you can help. Connect quickly and
          securely.
        </p>
      </header>
      <Donorfind />
    </>
  );
}
