export const formatDate = (dateString: string, dayAgo?: boolean) => {
  const date = new Date(dateString);
  // Subtract one day (24 hours in milliseconds)
  if(dayAgo)
    date.setDate(date.getDate() - 1);
  
  return date.toLocaleDateString("sr-RS", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export const formatTime = (timeString: string) => {
  const date = new Date(`2000-01-01 ${timeString}`);
  return date.toLocaleTimeString("sr-RS", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};