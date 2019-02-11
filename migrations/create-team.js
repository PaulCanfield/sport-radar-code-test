'use strict';
// 	"homeTeam": {
// 	    "season": 2018,
// 		"teamId": "0325",
// 		"abbr": "BAL",
// 		"cityState": "Baltimore",
// 		"fullName": "Baltimore Ravens",
// 		"nick": "Ravens",
// 		"teamType": "TEAM",
// 		"conferenceAbbr": "AFC",
// 		"divisionAbbr": "ACN"
// },

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Team', {
      TeamID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      Abbr: {
        type: Sequelize.STRING(10)
      },
      CityState: {
          type: Sequelize.STRING(50),
      },
      FullName: {
        type: Sequelize.STRING(100)
      },
      Nick: {
        type: Sequelize.STRING(100)
      },
      TeamType: {
        type: Sequelize.STRING(10),
      },
      ConferenceAbbr: {
        type: Sequelize.STRING(10)
      },
      DivisionAbbr: {
        type: Sequelize.STRING(10)
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
    return queryInterface.dropTable('Team');
  }
};

