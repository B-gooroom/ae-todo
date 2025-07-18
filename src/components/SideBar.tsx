"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { format, subDays } from "date-fns";

const routes = [
  {
    path: "/yesterday",
    label: "예스터데이",
  },
  {
    path: "/",
    label: "투데이",
  },
  // {
  //   path: "/tomorrow",
  //   label: "투모로우",
  // },
];

export default function SideBar() {
  const router = usePathname();

  const today = new Date();
  // 어제 날짜 구하기
  const yesterday = subDays(today, 1);

  // 최근 7일(어제 이전) 날짜 리스트 만들기
  const recentDates = Array.from({ length: 3 }, (_, i) => {
    const date = subDays(yesterday, i + 1);
    return {
      url: format(date, "yyyy-MM-dd"),
      label: format(date, "MM.dd _E"),
    };
  }).reverse();

  return (
    <div className="w-1/4 h-full bg-[#2B2D32] border-r-2 border-gray-500 py-6 px-2 sm:px-6">
      <div className="flex flex-col gap-4">
        <p className="text-sm sm:text-base font-bold">æ-todo</p>
        <div className="mt-6">
          <p className="text-xs text-gray-400 mb-2">비포</p>
          <div className="flex flex-col gap-1 text-[12px] sm:text-sm whitespace-nowrap">
            {recentDates.map((date) => {
              const isActive = router === `/date/${date.url}`;
              return (
                <Link
                  key={date.url}
                  href={`/date/${date.url}`}
                  className={`
                  border-b-2
                  ${isActive ? "border-gray-500" : "border-transparent"}
                  transition-all duration-200
                `}
                >
                  {date.label}
                </Link>
              );
            })}
          </div>
        </div>
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
