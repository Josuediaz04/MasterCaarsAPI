'use strict';

const { JOB_TABLE, JobModel} = require('../models/jobModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(JOB_TABLE, JobModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(JOB_TABLE);
  }
};
