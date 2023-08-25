'use strict';

 const { USER_TABLE, UserModel} = require('../models/usersModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserModel);

    var fechaActual = new Date();

    var año = fechaActual.getFullYear();
    var mes = fechaActual.getMonth() + 1;
    var dia = fechaActual.getDate();
    var hora = fechaActual.getHours();
    var minutos = fechaActual.getMinutes();
    var segundos = fechaActual.getSeconds();

    var now = `${año}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

    await queryInterface.bulkInsert(USER_TABLE, [
      {
        name: "Isaac Fernando",
        lastname: "Fernandez Bailon",
        email: "isaacfernandofernandez5351@gmail.com",
        password: "$2b$10$hDITxMYGHTlsqx/qGywFA./HvzUThsSMTrsXe1teFyo9dr1vWqU4G",
        status: true,
        verificationCode: 11111,
        id_role: 1,
        created_at: now
      },
      {
        name: "Josue",
        lastname: "Diaz",
        email: "josuejonathandiaz309@gmail.com",
        password: "$2b$10$VwaSYJQLF3DotCKmvmmbG.aMcAJPDiPoFPXnxMtKpLhL7kaKi7KTq",
        status: true,
        verificationCode: 11111,
        id_role: 1,
        created_at: now
      }
  ]);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
  }
};
