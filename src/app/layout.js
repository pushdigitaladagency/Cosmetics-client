import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Preloader from "./Components/Preloader";
import ScrollRevealInit from "./Components/ScrollRevealInit";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Organic Cosmetics",
  description: "Natural and Organic Cosmetic Products",
  icons: {
    icon: "/images/Organic_logo.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} data-scroll-behavior="smooth">
      <body>
        <Preloader />
        <ScrollRevealInit />
        {children}
      </body>
    </html>
  );
}