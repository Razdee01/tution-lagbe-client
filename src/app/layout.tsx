import type { Metadata } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import JwtSync from "@/components/JwtSync";
import { Toaster } from "sonner";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MentorLagbe",
  description:
    "Find trusted tutors and tuition opportunities across Bangladesh",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <JwtSync />
        <NavBar />
        <main className="flex-1">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
