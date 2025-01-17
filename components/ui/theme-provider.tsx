"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect } from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
    useEffect(() => {
      const darkMode = localStorage.getItem("darkMode");
      if (darkMode === "true") {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }, []);

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
