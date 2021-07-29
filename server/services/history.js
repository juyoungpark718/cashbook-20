const History = require('../models')['History'];
const Type = require('../models')['Type'];
const Card = require('../models')['Card'];
const User = require('../models')['User'];
const { Op } = require('sequelize');
const { getDateRange, createDayObj, createMonthObj } = require('../utils/date');

const createHistoryPerDay = (year, month, histories) => {
  const dayObj = createDayObj(year, month);
  histories.forEach(history => dayObj[history.createdAt].push(history));
  return dayObj;
};

const createHistoryPerMonth = (year, histories) => {
  let monthObj = createMonthObj(year);
  monthObj = histories.reduce((acc, val) => {
    const { price, createdAt } = val;
    const [year, month] = createdAt.split('-');
    const date = `${year}-${month}`;
    price >= 0 ? acc[date].income.push(val) : acc[date].expediture.push(val);
    return acc;
  }, monthObj);
  return monthObj;
};

const findAllHistoryByDate = async ({ userId, year, month }) => {
  const [startDate, endDate] = getDateRange(year, month);

  const histories = await History.findAll({
    attributes: ['id', 'content', 'price', 'createdAt'],
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
    include: [
      { model: Type, as: 'type' },
      { model: User, as: 'user' },
      { model: Card, as: 'card', attributes: ['id', 'name'], include: ['cardCategory'] },
    ],
  });

  if (month) {
    const historiesPerDay = createHistoryPerDay(year, month, histories);
    return historiesPerDay;
  } else {
    const historiesPerMonth = createHistoryPerMonth(year, histories);
    return historiesPerMonth;
  }
};

const createHistory = async ({ userId, cardId, content, price, typeId, createdAt }) => {
  const history = await History.create(
    {
      userId,
      cardId,
      content,
      price,
      typeId,
      createdAt,
    },
    {
      include: ['type', 'user', 'card'],
    }
  );
  const finded = await History.findOne({
    attributes: ['id', 'content', 'price', 'createdAt'],
    where: { id: history.id },
    include: [
      { model: Type, as: 'type' },
      { model: User, as: 'user' },
      { model: Card, as: 'card', attributes: ['id', 'name'], include: ['cardCategory'] },
    ],
  });

  return finded;
};

module.exports = {
  findAllHistoryByDate,
  createHistory,
};
