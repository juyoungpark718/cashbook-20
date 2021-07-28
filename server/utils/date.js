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
  if (month) {
    const startDate = new Date(`${year}-${month}-2`);
    const endDate = new Date(`${getYearMonth(year, month)}-1`);
    return [startDate, endDate];
  }

  const startDate = new Date(`${year}-1-2`);
  const endDate = new Date(`${+year + 1}-1-1`);

  return [startDate, endDate];
};

module.exports = {
  validDate,
  getDateRange,
};
