import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "@/tina/__generated__/client";
import Header from "@/components/nav/header";
import Footer from "@/components/nav/footer";
import { cn } from "@/lib/utils";

type LayoutProps = PropsWithChildren & {
  rawPageData?: any;
};

export default async function Layout({ children, rawPageData }: LayoutProps) {
  const { data: globalData } = await client.queries.global({
    relativePath: "index.json",
  });

  return (
    <LayoutProvider globalSettings={globalData.global} pageData={rawPageData}>
      <Header />
      <main
        className={cn(
          "font-sans flex-1 text-gray-800 bg-gray-50 dark:bg-gray-900 flex flex-col"
        )}
      >
        {children}
      </main>
      <Footer />
    </LayoutProvider>
  );
}
