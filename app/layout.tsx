import type { Metadata } from "next";
import DarkVeil from "../components/DarkVeil";
import {
  Geist,
  Geist_Mono,
  Schibsted_Grotesk,
  Martian_Mono,
} from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

import { PostHogProvider } from "./providers";

const schibstedGrotesk = Schibsted_Grotesk({
  variable: "--font-schibsted-grotesk",
  subsets: ["latin"],
});

const martianMono = Martian_Mono({
  variable: "--font-martian-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Hub for Eveything Next.js",
  description:
    "A comprehensive Next.js application showcasing layouts, routing, and data fetching.  ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${schibstedGrotesk.variable} ${martianMono.variable} min-h-screen antialiased  `}
      >
        {/* https://reactbits.dev/backgrounds/dark-veil */}
        <div
          className="min-h-screen antialiased absolute top-0 left-0 w-full h-full pointer-events-none
        z-[-1] mx-auto inset-0
        "
        >
          <DarkVeil />
        </div>

        <PostHogProvider>
          <NavBar />

          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}

/*   return (
    <>
      <h2>Main NavBar</h2>
      <div>Layout Main</div>
      <h2>Main Footer</h2>
    </>
  ); */
