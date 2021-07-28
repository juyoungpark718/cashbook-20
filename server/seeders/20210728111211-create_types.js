'use strict';
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('types', [
      { name: '생활' },
      { name: '식비' },
      { name: '교통' },
      { name: '쇼핑/뷰티' },
      { name: '의료/건강' },
      { name: '문화/여가' },
      { name: '미분류' },
      { name: '월급' },
      { name: '용돈' },
      { name: '기타수입' },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('types', null, {});
  },
};
