'use strict';

const { SERVICES_DETAILS_TABLE, ServiceDetailsModel} = require('../models/servicesDetailsModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(SERVICES_DETAILS_TABLE, ServiceDetailsModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(SERVICES_DETAILS_TABLE);
  }
};
