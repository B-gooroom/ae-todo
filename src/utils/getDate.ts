export const getTodayRange = () => {
  // 한국 시간대(KST) 기준으로 오늘 날짜 계산
  const now = new Date();
  // 한국 시간대로 변환하여 날짜 계산
  const kstDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
  const today = kstDate.toISOString().split("T")[0];

  return {
    start: `${today}T00:00:00+09:00`, // KST 시간으로 변경
    end: `${today}T23:59:59.999+09:00`, // KST 시간으로 변경
  };
};

export const getYesterdayRange = () => {
  // 한국 시간대(KST) 기준으로 어제 날짜 계산
  const now = new Date();
  const kstDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );
  const yesterday = new Date(kstDate.setDate(kstDate.getDate() - 1))
    .toISOString()
    .split("T")[0];

  return {
    start: `${yesterday}T00:00:00+09:00`, // KST 시간으로 변경
    end: `${yesterday}T23:59:59.999+09:00`, // KST 시간으로 변경
  };
};

export const getDateRange = (date: string) => {
  return {
    start: `${date}T00:00:00+09:00`, // KST 시간으로 변경
    end: `${date}T23:59:59.999+09:00`, // KST 시간으로 변경
  };
};
