import React from "react";

export default function Bleed({ amm }: { amm: number }) {
  const space = 100 * amm;
  return <div className={`w-full`} style={{ height: space + "px" }}></div>;
}
