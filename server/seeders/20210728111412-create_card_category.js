'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('card_categories', [
      { name: '현대카드' },
      { name: '삼성카드' },
      { name: '하나카드' },
      { name: '신한카드' },
      { name: '롯데카드' },
      { name: '현금' },
      { name: '카카오뱅크' },
      { name: '우리카드' },
      { name: '비씨카드' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('card_categories', null, {});
  },
};
