'use client'

import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import ReactQueryProvider from "@/hooks/useQuery";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <main suppressHydrationWarning={true}>
        <div className="dark:bg-black dark:text-white">
          {children}
        </div>
      </main>
      </ReactQueryProvider>
  );
}
