import { supabase } from "@/utils/supabase/client";
import { getDateRange } from "@/utils/getDate";

export const getDataByDate = async (date: string) => {
  const { start, end } = getDateRange(date);

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
