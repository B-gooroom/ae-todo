import { supabase } from "@/utils/supabase/client";
import { getTodayRange, getYesterdayRange } from "@/utils/getDate";

// 오늘 날짜의 메모를 가져오는 함수
export const getTodayMemo = async () => {
  const { start, end } = getTodayRange();

  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .gte("created_at", start)
    .lte("created_at", end)
    .maybeSingle(); // single() 대신 maybeSingle() 사용

  if (error) {
    console.error("Error fetching today's memo:", error);
    return null;
  }

  return data; // 데이터가 없으면 null, 있으면 데이터 반환
};

// 메모를 업데이트하거나 생성하는 함수
export const upsertMemo = async (content: string) => {
  // 먼저 오늘 메모가 있는지 확인
  const existingMemo = await getTodayMemo();

  if (existingMemo) {
    // 기존 메모가 있으면 업데이트 (빈 값도 허용)
    const { data, error } = await supabase
      .from("memos")
      .update({
        text: content || "", // null이나 undefined일 때 빈 문자열로 처리
        updated_at: new Date().toISOString(),
      })
      .eq("id", existingMemo.id)
      .select()
      .single();

    if (error) {
      console.error("Error updating memo:", error);
      throw error;
    }

    return data;
  } else {
    // 기존 메모가 없으면 새로 생성 (빈 값도 허용)
    const { data, error } = await supabase
      .from("memos")
      .insert({
        text: content || "", // null이나 undefined일 때 빈 문자열로 처리
        created_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Error inserting memo:", error);
      throw error;
    }

    return data;
  }
};

export const getYesterdayMemo = async () => {
  const { start, end } = getYesterdayRange();

  const { data, error } = await supabase
    .from("memos")
    .select("*")
    .gte("created_at", start)
    .lte("created_at", end)
    .maybeSingle(); // single() 대신 maybeSingle() 사용

  if (error) {
    console.error("Error fetching yesterday's memo:", error);
    return null;
  }

  return data; // 데이터가 없으면 null, 있으면 데이터 반환
};
