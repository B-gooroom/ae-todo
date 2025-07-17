import { supabase } from "@/utils/supabase/client";
import { getTodayRange, getYesterdayRange } from "@/utils/getDate";

export interface TodoProps {
  text: string;
  memo: string;
  tags: string[];
  checked: boolean;
}

export interface UpdateTodoProps {
  text?: string;
  memo?: string;
  tags?: string[];
}

export const getTodayData = async () => {
  const { start, end } = getTodayRange();

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .gte("created_at", start)
    .lte("created_at", end)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching todos data:", error);
    return [];
  }

  return data;
};

export const getYesterdayData = async () => {
  const { start, end } = getYesterdayRange();

  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .gte("created_at", start)
    .lte("created_at", end)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching todos data:", error);
    return [];
  }

  return data;
};

export const insertTodo = async (todo: TodoProps) => {
  const { data, error } = await supabase.from("todos").insert({
    text: todo.text,
    memo: todo.memo,
    tags: todo.tags,
    checked: todo.checked,
  });

  if (error) {
    console.error("Error inserting todo:", error);
    return [];
  }

  return data;
};

export const updateCheckedTodo = async (id: number, checked: boolean) => {
  const { data, error } = await supabase
    .from("todos")
    .update({ checked: !checked })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating checked todo:", error);
    return [];
  }

  return data;
};

export const updateTodo = async (id: number, updateFields: UpdateTodoProps) => {
  const filteredFields = Object.fromEntries(
    Object.entries(updateFields).filter(([_, v]) => v !== undefined && v !== "")
  );

  const { data, error } = await supabase
    .from("todos")
    .update(filteredFields)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating todo:", error);
    return [];
  }

  return data;
};

export const deleteTodo = async (id: number) => {
  const { data, error } = await supabase.from("todos").delete().eq("id", id);

  if (error) {
    console.error("Error deleting todo:", error);
    return [];
  }

  return data;
};
