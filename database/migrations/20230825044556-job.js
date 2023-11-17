'use strict';

const { JOB_TABLE, JobModel} = require('../models/jobModel');

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up (queryInterface) {
    await queryInterface.createTable(JOB_TABLE, JobModel);

    var fechaActual = new Date();
    var year = fechaActual.getFullYear();
    var month = fechaActual.getMonth();
    var day = fechaActual.getDay();
    var hour = fechaActual.getHours();
    var minute = fechaActual.getMinutes();
    var second = fechaActual.getSeconds();

    var now = `${year}-${month}-${day} ${hour}:${minute}:${second}`;

    await queryInterface.bulkInsert(JOB_TABLE,[
      {
        name: "mecanico automotriz",
        status: true,
        created_at: now
      },
      {
        name: "soldador",
        status: true,
        created_at: now
      }
    ]);
  },


  async down (queryInterface) {
    await queryInterface.dropTable(JOB_TABLE);
  }
};
