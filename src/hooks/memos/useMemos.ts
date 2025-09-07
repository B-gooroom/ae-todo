import {
  getTodayMemo,
  getYesterdayMemo,
  upsertMemo,
} from "@/services/memo/memo-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MemoData } from "@/components/Memo";

// 오늘의 메모
export const useGetTodayMemo = () => {
  return useQuery<MemoData | null>({
    queryKey: ["todayMemo"],
    queryFn: async () => await getTodayMemo(),
  });
};

export const useUpsertMemo = () => {
  const queryClient = useQueryClient();

  return useMutation<MemoData, Error, string>({
    mutationFn: async (content: string) => await upsertMemo(content),
    onSuccess: () => {
      // 메모 업데이트 후 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["todayMemo"] });
    },
  });
};

export const useGetYesterdayMemo = () => {
  return useQuery<MemoData | null>({
    queryKey: ["memos-yesterday"],
    queryFn: async () => await getYesterdayMemo(),
  });
};
