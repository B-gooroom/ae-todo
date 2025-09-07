import { supabase } from "@/utils/supabase/client";
import { getDateRange } from "@/utils/getDate";

export const getMemoByDate = async (date: string) => {
  const { start, end } = getDateRange(date);

  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .gte("created_at", start)
    .lte("created_at", end)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching memos data:", error);
    return [];
  }

  return data;
};
