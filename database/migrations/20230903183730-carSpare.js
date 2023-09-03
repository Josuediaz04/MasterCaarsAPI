'use strict';

const { SPARE_TABLE, spareModel } = require('../models/spareModel');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(SPARE_TABLE, spareModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(SPARE_TABLE);
  }
};
