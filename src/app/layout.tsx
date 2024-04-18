import { Work_Sans } from "next/font/google";
import { Chivo } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const work_sans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-work_sans",
});
const chivo = Chivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chivo",
});

export const metadata: Metadata = {
  title: "Password Hasher",
  description: "Generate and verify password hashes",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={work_sans.variable + chivo.variable}>{children}</body>
    </html>
  );
}
