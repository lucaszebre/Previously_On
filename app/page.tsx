"use client";

import { Suspense } from "react";
import Home from "@/components/Home";
import "./globals.css";
export default function Page() {
  const Loader = () => {
    return <p>Loading...</p>;
  };

  return (
    <Suspense fallback={<Loader></Loader>}>
      <Home />
    </Suspense>
  );
}
