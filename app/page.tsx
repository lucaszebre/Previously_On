"use client";

import { Suspense } from "react";
import Home from "@/components/Home";
import "./globals.css";

const Loader = () => {
  return <p>Loading...</p>;
};

export default function Page() {
  return (
    <Suspense fallback={<Loader></Loader>}>
      <Home />
    </Suspense>
  );
}
