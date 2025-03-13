import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: 'Dashboard | Stonxis',
  description: "Generated by create next app",
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} antialiased bg-st-background text-st-text dark`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
