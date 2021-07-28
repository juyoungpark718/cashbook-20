const validDate = (year, month) => month >= 1 && month <= 12 && year >= 1900;

const getYearMonth = (year, month) => {
  year = +year;
  month = +month;

  if (month + 1 === 13) {
    ++year;
    month = 1;
  } else {
    ++month;
  }
  return `${year}-${month}`;
};

const getDateRange = (year, month) => {
  const startDate = new Date(`${year}-${month}-2`);
  const endDate = new Date(`${getYearMonth(year, month)}-1`);

  console.log(startDate);
  console.log(endDate);

  return [startDate, endDate];
};

module.exports = {
  validDate,
  getDateRange,
};
