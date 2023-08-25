'use strict';

const { EMPLOYEE_TABLE, EmployeeModel } = require('../models/employeesModel')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(EMPLOYEE_TABLE, EmployeeModel);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(EMPLOYEE_TABLE);
  }
};
