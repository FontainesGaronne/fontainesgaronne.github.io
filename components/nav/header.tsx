"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";
import { tinaField } from "tinacms/dist/react";
import NavItems from "@/components/nav/nav-items";
import { useLayout } from "@/components/layout/layout-context";

const headerColor = {
  default:
    "text-black dark:text-white from-gray-50 to-white dark:from-gray-800 dark:to-gray-900",
  primary: {
    blue: "text-white from-blue-300 to-blue-500",
    teal: "text-white from-teal-400 to-teal-500",
    green: "text-white from-green-400 to-green-500",
    red: "text-white from-red-400 to-red-500",
    pink: "text-white from-pink-400 to-pink-500",
    purple: "text-white from-purple-400 to-purple-500",
    orange: "text-white from-orange-400 to-orange-500",
    yellow: "text-white from-yellow-400 to-yellow-500",
  },
};

export default function Header() {
  const { globalSettings, theme } = useLayout();
  const header = globalSettings.header;

  const headerColorCss =
    header.color === "primary"
      ? headerColor.primary[theme.color]
      : headerColor.default;

  return (
    <header
      className={`relative overflow-hidden bg-gradient-to-b ${headerColorCss}`}
    >
      <Container size="custom" className="py-0 relative z-10 max-w-8xl">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <p className="select-none text-lg font-bold tracking-tight xs:my-4 transition duration-150 ease-out transform">
            <Link
              href="/"
              className="flex gap-2 items-center tracking-[.002em]"
            >
              <Image
                src="/logo.png"
                alt=""
                width={80}
                height={80}
              />
              <span data-tina-field={tinaField(header, "name")}>
                {header.name}
              </span>
            </Link>
          </p>
          <NavItems navs={header.nav} />
        </div>
        <div
          className={cn(
            `absolute h-1 bg-gradient-to-r from-transparent`,
            theme.darkMode === "primary"
              ? `via-white`
              : `via-black dark:via-white`,
            "to-transparent bottom-0 left-4 right-4 -z-1 opacity-5"
          )}
        />
      </Container>
    </header>
  );
}
