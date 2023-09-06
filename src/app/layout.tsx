import ThemeMode from "@/components/ThemeMode";
import "./globals.css";
import type { Metadata } from "next";

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
      <body className="bg-slate-200">
        <main className="h-screen">
          <ThemeMode>{children}</ThemeMode>
        </main>
      </body>
    </html>
  );
}
