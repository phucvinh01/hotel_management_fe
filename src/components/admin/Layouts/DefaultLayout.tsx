"use client";
import React, { useState, ReactNode } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div>
      <div className="flex h-screen overflow-hidden ">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className="mx-auto min-h-screen shadow-sm max-w-screen-2xl p-4 md:p-6 2xl:p-10 border rounded-3xl">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
