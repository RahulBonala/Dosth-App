import { Inter, Outfit } from "next/font/google";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata = {
  title: "Dosth | Your Friend, Your Guide",
  description: "All-in-one urban app for repairs, rides, and community support.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable}`}>{children}</body>
    </html>
  );
}
