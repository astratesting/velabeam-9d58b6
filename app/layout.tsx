import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "VelaBeam — AI-Powered Pipeline for Local-Business Sites",
  description: "Find businesses without websites and generate polished, industry-specific sites in minutes. Built for freelance web developers and small agencies.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
