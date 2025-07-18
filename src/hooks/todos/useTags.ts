import { useQuery } from "@tanstack/react-query";
import { getTags } from "@/services/todo/tags-services";

export const useGetTodosByTags = (tags: string[]) => {
  return useQuery({
    queryKey: ["tags", tags],
    queryFn: async () => await getTags(tags),
  });
};
