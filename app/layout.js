import { Inter } from "next/font/google";
import "./globals.css";
import PageAnimatePresence from "./components/HOC/PageAnimatePresence";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Metereological Dashboard",
  description: "A dashboard for metereologists to understand and analyze cyclones over the Indian Ocean with INSAT3D images.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black">
        <PageAnimatePresence>{children}</PageAnimatePresence>
      </body>
    </html>
  );
}

//inter.classname