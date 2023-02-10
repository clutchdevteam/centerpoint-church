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
  console.log(rawDate.getDate());
  return `${
    months[rawDate.getMonth()]
  } ${rawDate.getDate()}, ${rawDate.getFullYear()}`;
};

export { formatDate };
