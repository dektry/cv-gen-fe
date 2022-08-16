export const getFormatDate = (dateStr: string) => {
  const parsedDate = new Date(dateStr);
  const day = (parsedDate.getDate() < 10 ? '0' : '') + parsedDate.getDate();
  const month =
    (parsedDate.getMonth() + 1 < 10 ? '0' : '') + (parsedDate.getMonth() + 1);
  const year = parsedDate.getFullYear();
  return `${day}-${month}-${year}`;
};
