import { getTodayMemo, upsertMemo } from "@/services/memo/memo-services";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// 오늘의 메모
export const useGetTodayMemo = () => {
  return useQuery({
    queryKey: ["todayMemo"],
    queryFn: async () => await getTodayMemo(),
  });
};

export const useUpsertMemo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (content: string) => await upsertMemo(content),
    onSuccess: () => {
      // 메모 업데이트 후 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["todayMemo"] });
    },
  });
};
