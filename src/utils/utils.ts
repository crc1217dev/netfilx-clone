export function makeImagePath(id: string, format?: string) {
  if (!id) return "http://via.placeholder.com/376X200";
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
export const changeDateFormat = (prevDate: Date) => {
  const year = prevDate.getFullYear();
  const month = ("0" + (prevDate.getMonth() + 1)).slice(-2);
  const day = ("0" + prevDate.getDate()).slice(-2);
  const dateStr = `${year}-${month}-${day}`;
  console.log(dateStr);
  return dateStr;
};
