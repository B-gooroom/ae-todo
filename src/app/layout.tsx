import type { Metadata } from "next";
import "./globals.css";
import QueryProvider from "@/providers/QueryProvider";
import SideBar from "@/components/SideBar";

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
      <body className="antialiased flex h-screen w-full">
        <QueryProvider>
          <div className="flex h-screen w-full gap-8">
            <SideBar />
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
