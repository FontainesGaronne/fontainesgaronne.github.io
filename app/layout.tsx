import React from "react";
import { Inter as FontSans, Lato, Nunito } from "next/font/google";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import client from "@/tina/__generated__/client";

import "@/styles.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Comité de quartier Fontaines Garonne",
  description: "Comité de quartier Fontaines Garonne - Casselardit - Toulouse rive gauche",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalQuery = await client.queries.global({
    relativePath: "index.json",
  });
  const global = globalQuery.data.global;

  const selectFont = (fontName: string) => {
    switch (fontName) {
      case "nunito":
        return `font-nunito ${nunito.variable}`;
      case "lato":
        return `font-lato ${lato.variable}`;
      case "sans":
      default:
        return `font-sans ${fontSans.variable} `;
    }
  };
  const fontVariable = selectFont(global.theme.font);

  return (
    <html lang="fr">
      <body
        suppressHydrationWarning
        className={cn("min-h-screen flex flex-col antialiased", fontVariable)}
      >
          {children}
      </body>
    </html>
  );
}
