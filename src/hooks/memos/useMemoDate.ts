import { useQuery } from "@tanstack/react-query";
import { getMemoByDate } from "@/services/memo/memo-date-services";
import { MemoData } from "@/components/Memo";

export const useGetMemoByDate = (date: string) => {
  return useQuery<MemoData[] | null>({
    queryKey: ["memos-date", date],
    queryFn: async () => await getMemoByDate(date),
  });
};
