'use strict';

 const { USER_TABLE, UserModel} = require('../models/usersModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserModel)
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
