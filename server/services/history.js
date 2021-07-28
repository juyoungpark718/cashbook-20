const History = require('../models')['History'];
const { Op } = require('sequelize');
const { getDateRange } = require('../utils/date');

const findAllHistoryByDate = async ({ userId, year, month }) => {
  const [startDate, endDate] = getDateRange(year, month);

  const histories = await History.findAll({
    where: {
      [Op.and]: [
        { userId },
        {
          created_At: {
            [Op.between]: [startDate, endDate],
          },
        },
      ],
    },
  });

  return histories;
};

module.exports = {
  findAllHistoryByDate,
};
