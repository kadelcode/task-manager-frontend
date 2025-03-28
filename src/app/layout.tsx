import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

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

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
