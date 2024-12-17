"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useEffect, useState } from "react";
import { supabase } from "../createClient";
import SideBar from "@/components/ui/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export default function HomeLayout({ children }) {
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar toggle

  useEffect(() => {
    const fetchUserSession = async () => {
      const {
        data: { session }
      } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      } else {
        window.location.href = "/login";
      }
    };

    fetchUserSession();
  }, []);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-row items-start justify-start bg-gray-900 overflow-x-hidden">
      <div
        className={`fixed top-0 left-0  bg-gray-900 border-r-2 border-green-500/20 z-50 transition-transform duration-300 shadow-xl
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:w-64
          `}
      >
        <SideBar onToggle={handleToggleSidebar} isOpen={isSidebarOpen} />
      </div>
      <div className="flex flex-col w-full max-w-7xl mx-auto">
        {/* Content area */}
        <div
          className={`w-full min-h-screen overflow-hidden px-4 md:px-0 transition-all duration-300 ${
            isSidebarOpen
              ? "pointer-events-none md:pointer-events-auto opacity-50 md:opacity-100"
              : "opacity-100"
          }`}
        >
          {/* if sidebar is active then we reduce the main content opacity and add pointer events so you cannot click */}
          <div className="flex flex-col rounded-xl overflow-hidden h-fit py-10 px-5 md:px-10">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
