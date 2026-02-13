import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BLVCKMVGICK | Luxury Underground Utility",
  description: "High-end underground clothing for those who walk in the shadows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-void text-bone`}
      >
        <div className="grain-overlay" />
        <div className="vignette" />
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
