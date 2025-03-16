import React, { PropsWithChildren } from "react";
import { LayoutProvider } from "./layout-context";
import client from "@/tina/__generated__/client";
import Header from "@/components/nav/header";
import Footer from "@/components/nav/footer";
import Breadcrumb from "@/components/breadcrumb";
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
      <div className="bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 sm:px-0 mt-2">
          <Breadcrumb data={rawPageData} />
        </div>
      </div>
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
