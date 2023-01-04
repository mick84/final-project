export const formatDate = (date) =>
  new Intl.DateTimeFormat("en-GB", {
    month: "short",
    year: "2-digit",
    day: "2-digit",
  }).format(new Date(date));
