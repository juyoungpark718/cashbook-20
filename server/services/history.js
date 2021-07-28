const History = require('../models')['History'];
const Type = require('../models')['Type'];
const Card = require('../models')['Card'];
const User = require('../models')['User'];
const { Op } = require('sequelize');
const { getDateRange } = require('../utils/date');

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

  return histories;
};

const createHistory = async ({ userId, cardId, content, price, typeId }) => {
  const history = await History.create(
    {
      userId,
      cardId,
      content,
      price,
      typeId,
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
