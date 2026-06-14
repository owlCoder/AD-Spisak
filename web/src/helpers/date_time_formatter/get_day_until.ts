export const getDaysUntil = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const diffTime = date.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "danas";
  if (diffDays === 1) return "sutra";
  if (diffDays === -1) return "juče";

  if (diffDays > 0) {
    return `još ${diffDays} ${
      diffDays === 1 ? "dan" : diffDays < 5 ? "dana" : "dana"
    }`;
  }
  return `pre ${Math.abs(diffDays)} ${
    Math.abs(diffDays) === 1 ? "dan" : Math.abs(diffDays) < 5 ? "dana" : "dana"
  }`;
};
