export function yearOptions() {
  const currentYear = new Date().getFullYear();

  const firstYear = currentYear - stepBackInYears;
  const lastYear = currentYear + stepForwardInYears;

  const result = [];

  for (let i = firstYear; i <= lastYear; i++) {
    result.push({ value: `${i}`, label: `${i}` });
  }

  return result;
}

export const stepBackInYears = 30;
export const stepForwardInYears = 10;
