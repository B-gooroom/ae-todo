"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  {
    path: "/yesterday",
    label: "예스터데이",
  },
  {
    path: "/",
    label: "투데이",
  },
  {
    path: "/tomorrow",
    label: "투모로우",
  },
];

export default function SideBar() {
  const router = usePathname();

  return (
    <div className="w-1/4 h-full bg-[#2B2D32] border-r-2 border-gray-500 p-4">
      <div className="flex flex-col gap-4">
        <p className="text-sm sm:text-base font-bold">æ-todo</p>
        <div className="flex flex-col gap-2 text-[12px] sm:text-sm">
          {routes.map((route) => {
            const { path, label } = route;
            const isActive = router === path;

            return (
              <Link
                key={path}
                href={path}
                className={`
                  border-b-2
                  ${isActive ? "border-gray-500" : "border-transparent"}
                  transition-all duration-200
                `}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
