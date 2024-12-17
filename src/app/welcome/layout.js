"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { useEffect, useState } from "react";
import { supabase } from "../createClient";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setUser(session.user);
      } else {
        window.location.href = "/login";
      }
    };

    fetchUserSession();
  }, []);

  return (
    <>
      <div>{children}</div>
    </>
  );
}


