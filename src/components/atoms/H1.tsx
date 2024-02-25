import React from "react";

export default function H1({ children }: { children: React.ReactNode }) {
  return <h1 className="py-10 font-extrabold text-4xl mt-20">{children}</h1>;
}
