'use strict';

const { ROLE_TABLE, RoleModel} = require('../models/roleModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ROLE_TABLE, RoleModel);

    var fechaActual = new Date();

    var año = fechaActual.getFullYear();
    var mes = fechaActual.getMonth() + 1;
    var dia = fechaActual.getDate();
    var hora = fechaActual.getHours();
    var minutos = fechaActual.getMinutes();
    var segundos = fechaActual.getSeconds();

    var now = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    await queryInterface.bulkInsert(ROLE_TABLE, [
      {
        name: 'admin',
        created_at : now,
        status: true
      },
      {
        name: 'customer',
        created_at : now,
        status: true
      }
    ]);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ROLE_TABLE);
  }
};
