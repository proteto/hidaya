"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { useEffect, useState } from "react";
import { Provider } from "react-redux";
import PageLoader from "@/components/PageLoader";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../redux/store";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <html className={`${geistSans.variable} ${geistMono.variable}`}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <body>{isLoading ? <PageLoader /> : <div>{children}</div>}</body>
        </PersistGate>
      </Provider>
    </html>
  );
}
