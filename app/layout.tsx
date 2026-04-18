import type { Metadata } from "next";
import { Fredoka, DM_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";

/** Rounded display face — matches the “Fredoka / playful” direction in the brief. */
const fontDisplay = Fredoka({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-display",
  display: "swap",
});

const fontBody = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

const fontUi = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ui",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ToyVerse — Visualize First, Buy Second",
  description:
    "ToyVerse helps parents see toys in motion before checkout—built for children ages 5–12.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${fontDisplay.variable} ${fontBody.variable} ${fontUi.variable} min-h-full`}
      >
        {children}
      </body>
    </html>
  );
}
