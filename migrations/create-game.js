'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Game', {
      GameID: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      GameKey: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      GameDateTime: {
        type: Sequelize.DATE,
        allowNull: false
      },
      GameType: {
        type: Sequelize.STRING(10),
        allowNull: false
      },
      ISOTime: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      NetworkChannel: {
        type: Sequelize.STRING(10)
      },
      NGSGame: {
        type: Sequelize.BOOLEAN
      },
      Season: {
        type: Sequelize.INTEGER
      },
      SeasonType: {
        type: Sequelize.STRING(10)
      },
      Week: {
        type: Sequelize.STRING(10)
      },
      WeekName: {
        type: Sequelize.STRING(20)
      },
      Validated: {
        type: Sequelize.BOOLEAN
      },
      ReleasedToClubs: {
        type: Sequelize.BOOLEAN
      },

      ScoreTime: {
        type: Sequelize.STRING
      },
      ScorePhase: {
        type: Sequelize.STRING(10)
      },
      VisitorPointTotal: {
        type: Sequelize.INTEGER,
      },
      VisitorPointQ1: {
        type: Sequelize.INTEGER,
      },
      VisitorPointQ2: {
        type: Sequelize.INTEGER,
      },
      VisitorPointQ3: {
        type: Sequelize.INTEGER,
      },
      VisitorPointQ4: {
        type: Sequelize.INTEGER,
      },
      VisitorPointOT: {
        type: Sequelize.INTEGER,
      },
      VisitorTimeOutsRemaining: {
        type: Sequelize.INTEGER
      },
      HomePointTotal: {
        type: Sequelize.INTEGER,
      },
      HomePointQ1: {
        type: Sequelize.INTEGER,
      },
      HomePointQ2: {
        type: Sequelize.INTEGER,
      },
      HomePointQ3: {
        type: Sequelize.INTEGER,
      },
      HomePointQ4: {
        type: Sequelize.INTEGER,
      },
      HomePointOT: {
        type: Sequelize.INTEGER,
      },
      HomeTimeOutsRemaining: {
        type: Sequelize.INTEGER
      },

      SiteID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      HomeTeamID: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      VisitorTeamID: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    return queryInterface.dropTable('Game');
  }
};
