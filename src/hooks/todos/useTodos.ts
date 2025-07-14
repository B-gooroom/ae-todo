import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTodayData,
  insertTodo,
  TodoProps,
  updateTodo,
  deleteTodo,
} from "@/services/todo/todo-services";

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodayData(),
  });
};

export const useInsertTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (todo: TodoProps) => await insertTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, checked }: { id: number; checked: boolean }) =>
      await updateTodo(id, checked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useDeleteTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => await deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
