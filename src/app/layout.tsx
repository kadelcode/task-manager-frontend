"use client";

import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useNavigationStore } from "@/store/useNavigationStore";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // Specify the font weights you need
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //const pathname = usePathname();
  const setNavigating = useNavigationStore((state) => state.setNavigating);

  useEffect(() => {
    setNavigating(true);
    setTimeout(() => setNavigating(false), 1500); // Simulate skeleton loading
  })

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.className} antialiased`}
      >
        {children}
        <Toaster
          toastOptions={{
            success: {
              style: {
                background: 'lightgreen',
                color: 'black',
                maxWidth: '368px'
              },
            },
            error: {
              style: {
                background: 'lightcoral',
                color: 'white',
                maxWidth: '368px',
              },
            },
          }}
        />
      </body>
    </html>
  );
}
