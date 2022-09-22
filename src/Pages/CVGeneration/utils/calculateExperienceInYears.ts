export const calcExperienceInYears = (startDate: string | null): number => {
  if (!startDate) return 0;

  const start = new Date(startDate);
  const diff = Date.now() - start.getTime();

  return new Date(diff).getFullYear() - 1970;
};
