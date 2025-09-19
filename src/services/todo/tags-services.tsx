import { supabase } from "@/utils/supabase/client";

export const getTags = async (tags: string[]) => {
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .contains("tags", [`#${tags}`])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching tags:", error);
    return [];
  }

  return data;
};
