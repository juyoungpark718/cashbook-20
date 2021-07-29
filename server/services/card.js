const Card = require('../models')['Card'];

const findAllByUserId = async userId => {
  const cards = await Card.findAll({
    attributes: ['id', 'name'],
    where: {
      userId,
    },
    include: ['cardCategory'],
  });

  return cards;
};

module.exports = {
  findAllByUserId,
};
