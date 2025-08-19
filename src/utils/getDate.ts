export const getTodayRange = () => {
  // 한국 시간대(KST) 기준으로 오늘 날짜 계산
  const now = new Date();
  // 한국 시간대로 변환하여 날짜 계산
  const kstDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  const year = kstDate.getFullYear();
  const month = String(kstDate.getMonth() + 1).padStart(2, "0");
  const date = String(kstDate.getDate()).padStart(2, "0");
  const today = `${year}-${month}-${date}`;

  return {
    start: `${today}T00:00:00`, // KST 시간대로 변경
    end: `${today}T23:59:59.999`, // KST 시간대로 변경
  };
};

export const getYesterdayRange = () => {
  // 한국 시간대(KST) 기준으로 어제 날짜 계산
  const now = new Date();
  const kstDate = new Date(
    now.toLocaleString("en-US", { timeZone: "Asia/Seoul" })
  );

  // 어제 날짜 계산 (월/년 경계 자동 처리)
  const yesterdayDate = new Date(kstDate);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);

  const year = yesterdayDate.getFullYear();
  const month = String(yesterdayDate.getMonth() + 1).padStart(2, "0");
  const date = String(yesterdayDate.getDate()).padStart(2, "0");
  const yesterday = `${year}-${month}-${date}`;

  return {
    start: `${yesterday}T00:00:00`, // KST 시간대로 변경
    end: `${yesterday}T23:59:59.999`, // KST 시간대로 변경
  };
};

export const getDateRange = (date: string) => {
  return {
    start: `${date}T00:00:00`, // KST 시간대로 변경
    end: `${date}T23:59:59.999`, // KST 시간대로 변경
  };
};
