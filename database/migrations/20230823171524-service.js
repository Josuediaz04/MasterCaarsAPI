'use strict';

const { SERVICES_TABLE, ServiceModel} = require('../models/ServiceModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(SERVICES_TABLE, ServiceModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(SERVICES_TABLE);
  }
};
