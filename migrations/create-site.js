'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Site', {
      SiteID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      SiteCity: {
        type: Sequelize.STRING(50)
      },
      SiteFullname: {
        type: Sequelize.STRING(50),
      },
      SiteState: {
        type: Sequelize.STRING(20)
      },
      RoofType: {
        type: Sequelize.STRING(50)
      },
      RowInsertDate: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      RowUpdateDate: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sites');
  }
};
