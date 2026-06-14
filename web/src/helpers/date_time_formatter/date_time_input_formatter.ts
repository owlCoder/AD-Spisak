const formatDate = (dateString: string): string => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  const formatter = new Intl.DateTimeFormat(navigator.language || "en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "UTC",
  });

  return formatter.format(date);
};

const formatDateForInput = (dateString: string): string => {
  if (!dateString) return "";

  const [year, month, day] = dateString.split("-");
  if (!year || !month || !day) return "";

  return dateString;
};

const formatTime = (timeString: string): string => {
  if (!timeString) return "";

  const [hours, minutes] = timeString.split(":");
  if (!hours || !minutes) return "";

  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

export { formatDate, formatDateForInput, formatTime };
