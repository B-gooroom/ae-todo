import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getTodayData,
  insertTodo,
  TodoProps,
  updateCheckedTodo,
  deleteTodo,
  getYesterdayData,
  UpdateTodoProps,
  updateTodo,
} from "@/services/todo/todo-services";

export const useGetTodos = () => {
  return useQuery({
    queryKey: ["todos"],
    queryFn: async () => await getTodayData(),
  });
};

export const useGetTodosYesterday = () => {
  return useQuery({
    queryKey: ["todos-yesterday"],
    queryFn: async () => await getYesterdayData(),
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

export const useUpdateCheckedTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, checked }: { id: number; checked: boolean }) =>
      await updateCheckedTodo(id, checked),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

export const useUpdateTodos = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      updateFields,
    }: {
      id: number;
      updateFields: UpdateTodoProps;
    }) => await updateTodo(id, updateFields),
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
