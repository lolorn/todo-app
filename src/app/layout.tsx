import ThemeMode from "@/components/ThemeMode";
import "./globals.css";
import type { Metadata } from "next";
import Drawer from "@/components/Drawer";

export const metadata: Metadata = {
  title: "Todo App By Lolorn",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-200 dark:bg-black">
        <main className="h-screen">
          <ThemeMode>{children}</ThemeMode>
          <Drawer />
        </main>
      </body>
    </html>
  );
}
