import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import ReactQueryClientProvider from "@/components/react-query-client-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KusiNotes",
  description: "AI-powered meal planning with KusiNotes",
  icons: {
    icon: [
      { url: "/logo-tab.png?v=3", sizes: "16x16", type: "image/png" },
      { url: "/logo-tab.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/logo-tab.png?v=3", sizes: "48x48", type: "image/png" },
      { url: "/logo-tab.png?v=3", sizes: "192x192", type: "image/png" },
    ],
    shortcut: "/logo-tab.png?v=3",
    apple: "/logo-tab.png?v=3",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-tab.png?v=4" sizes="any" type="image/png" />
          <link rel="icon" href="/logo-tab.png?v=4" sizes="16x16" type="image/png" />
          <link rel="icon" href="/logo-tab.png?v=4" sizes="32x32" type="image/png" />
          <link rel="icon" href="/logo-tab.png?v=4" sizes="48x48" type="image/png" />
          <link rel="shortcut icon" href="/logo-tab.png?v=4" type="image/png" />
          <link rel="apple-touch-icon" href="/logo-tab.png?v=4" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900`}
        >
          <ReactQueryClientProvider>
            <Navbar />
            <div className="pt-16 min-h-screen w-full">
              {children}
            </div>
          </ReactQueryClientProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
