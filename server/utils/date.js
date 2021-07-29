const validDate = (year, month) => month >= 1 && month <= 12 && year >= 1900;

const isLeapYear = year => {
  if (year % 4 === 0 && year % 100 === 0 && year % 400 === 0) return true;
  if (year % 4 === 0 && year % 100 === 0) return false;
  if (year % 4 === 0) return true;
  return false;
};

const dayOfMonth = (month, isLeap = false) => {
  switch (+month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      if (isLeap) {
        return 29;
      }
      return 28;
  }
};

const createDayObj = (year, month) => {
  const day = dayOfMonth(month, isLeapYear(year));
  const dayObj = {};
  for (let i = 1; i <= day; i++) {
    dayObj[`${year}-${month.padStart(2, '0')}-${i.toString().padStart(2, '0')}`] = [];
  }
  return dayObj;
};

const createMonthObj = year => {
  const month = 12;
  const monthObj = {};
  for (let i = 1; i <= month; i++) {
    monthObj[`${year}-${i.toString().padStart(2, '0')}`] = { expediture: [], income: [] };
  }
  return monthObj;
};

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
    const startDate = new Date(`${year}-${month}-1`);
    const endDate = new Date(`${getYearMonth(year, month)}-1`);
    return [startDate, endDate];
  }

  const startDate = new Date(`${year}-1-1`);
  const endDate = new Date(`${+year + 1}-1-1`);

  return [startDate, endDate];
};

module.exports = {
  validDate,
  getDateRange,
  createDayObj,
  createMonthObj,
};
