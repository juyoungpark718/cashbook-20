const Type = require('../models')['Type'];
const CardCategory = require('../models')['CardCategory'];

const findAllCategories = async () => {
  const [types, cardCategories] = await Promise.all([Type.findAll(), CardCategory.findAll()]);
  return { types, cardCategories };
};

module.exports = {
  findAllCategories,
};
