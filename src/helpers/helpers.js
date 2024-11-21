export const formatData = (date) => {
  return new Date(date).toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { formatData };
