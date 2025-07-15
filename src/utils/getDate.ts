export const getTodayRange = () => {
  const today = new Date().toISOString().split("T")[0];
  return {
    start: `${today}T00:00:00.000Z`,
    end: `${today}T23:59:59.999Z`,
  };
};

export const getYesterdayRange = () => {
  const yesterday = new Date(new Date().setDate(new Date().getDate() - 1))
    .toISOString()
    .split("T")[0];
  return {
    start: `${yesterday}T00:00:00.000Z`,
    end: `${yesterday}T23:59:59.999Z`,
  };
};
