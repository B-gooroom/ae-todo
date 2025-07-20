import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import SideBar from "@/components/SideBar";
import Memo from "@/components/Memo";

export const metadata: Metadata = {
  title: "ae-todo",
  description: "ae-todo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex w-full">
        <QueryProvider>
          <div className="flex w-full gap-4 sm:gap-8">
            <SideBar />
            {children}
            <Memo />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
