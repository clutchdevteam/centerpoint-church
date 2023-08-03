const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const formatDate = (date) => {
  const rawDate = new Date(date);
  return `${
    months[rawDate.getMonth()]
  } ${rawDate.getDate()}, ${rawDate.getFullYear()}`;
};

const formatDateWithoutTime = (date) => {
  const rawDate = new Date(date);
  return `${rawDate.getFullYear()}-${
    rawDate.getMonth() + 1
  }-${rawDate.getDate()}`;
};

export { formatDate, formatDateWithoutTime };
