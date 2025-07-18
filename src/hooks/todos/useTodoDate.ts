import { useQuery } from "@tanstack/react-query";
import { getDataByDate } from "@/services/todo/todo-date-services";

export const useGetTodosByDate = (date: string) => {
  return useQuery({
    queryKey: ["todos-date", date],
    queryFn: async () => await getDataByDate(date),
  });
};
