export const getTodayRange = () => {
  const today = new Date().toISOString().split("T")[0];
  return {
    start: `${today}T00:00:00.000Z`,
    end: `${today}T23:59:59.999Z`,
  };
};
