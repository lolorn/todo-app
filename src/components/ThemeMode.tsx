"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

function ThemeMode({ children }: { children: ReactNode }) {
  const themeConfig = {
    attribute: "class",
    storageKey: "theme",
    themes: ["system", "dark", "light"],
  };
  return <ThemeProvider {...themeConfig}>{children}</ThemeProvider>;
}

export default ThemeMode;
