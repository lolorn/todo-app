import ThemeMode from "@/components/ThemeMode";
import "./globals.css";
import type { Metadata } from "next";
import Drawer from "@/components/Drawer";
import QueryMode from "@/components/QueryMode";

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
          <QueryMode>
            <ThemeMode>{children}</ThemeMode>
            <Drawer />
          </QueryMode>
        </main>
      </body>
    </html>
  );
}
