import { useQuery } from "@tanstack/react-query";
import { getMemoByDate } from "@/services/memo/memo-date-services";

export const useGetMemoByDate = (date: string) => {
  return useQuery({
    queryKey: ["memos-date", date],
    queryFn: async () => await getMemoByDate(date),
  });
};
