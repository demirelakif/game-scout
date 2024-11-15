import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Hero from "@/components/Hero";

const gramatikaBold = localFont({
  src: "./fonts/gramatikaBold.otf",
  variable: "--font-bold",
  weight: "100 900",
});
const gramatikaBlack = localFont({
  src: "./fonts/gramatikaBlack.otf",
  variable: "--font-black",
  weight: "100 900",
});
const gramatikaExtraLight = localFont({
  src: "./fonts/gramatikaExtraLight.otf",
  variable: "--font-extra-light",
  weight: "100 900",
});
const gramatikaRegular = localFont({
  src: "./fonts/gramatikaRegular.otf",
  variable: "--font-regular",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Akif's Game Scout",
  description: "Game Scout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${gramatikaBold.variable} ${gramatikaBlack.variable} ${gramatikaExtraLight.variable} ${gramatikaRegular.variable} bg-background antialiased`}
      >
        <div>
        <Hero />
        {children}
        </div>
        
      </body>
    </html>
  );
}
