'use strict';
module.exports = (sequelize, DataTypes) => {
  const Team = sequelize.define('Team', {
    TeamID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Abbr: {
      type: DataTypes.STRING(10)
    },
    CityState: {
      type: DataTypes.STRING(50),
    },
    FullName: {
      type: DataTypes.STRING(100)
    },
    Nick: {
      type: DataTypes.STRING(100)
    },
    TeamType: {
      type: DataTypes.STRING(10),
    },
    ConferenceAbbr: {
      type: DataTypes.STRING(10)
    },
    DivisionAbbr: {
      type: DataTypes.STRING(10)
    },
    RowInsertDate: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    RowUpdateDate: {
      type: DataTypes.DATE
    }
  }, {
    createdAt: 'RowInsertDate',
    updatedAt: 'RowUpdateDate',
    tableName: 'Team',
  });

  Team.associate = function(models) {
    Team.hasMany(models.Game, { as: 'HomeGames', targetKey: 'TeamID', foreignKey: 'HomeTeamID' });
    Team.hasMany(models.Game, { as: 'AwayGames', targetKey: 'TeamID', foreignKey: 'VisitorTeamID' });
  };

  Team.prototype.getByeWeek = function () {
    let weeks = [ ];

    for (let index = 0 ; index < this.HomeGames.length ; index++) {
      let game = this.HomeGames[index];
      weeks[game.Week] = game.Week;
    }

    for (let index = 0 ; index < this.AwayGames.length ; index++) {
      let game = this.AwayGames[index];
      weeks[game.Week] = game.Week;
    }

    for (let index = 1 ; index < 17 ; index++) {
      if (weeks[index]) {
        // pass
      } else {
        return index;
      }
    }
    return false;
  };

  Team.prototype.getAverateScores = function(quarter) {
    let byeWeek = this.getByeWeek();
    let score = {
      total: 0,
      games: 0,
      byeWeek: byeWeek,
      q1: 0,
      q2: 0,
      q3: 0,
      q4: 0,
      ot: 0
    };

    for (let index = 0 ; index < this.HomeGames.length ; index++) {
      let game = this.HomeGames[index];
      if (game.Week > byeWeek) {
        score.total += parseInt(game.HomePointTotal);
        score.q1 += parseInt(game.HomePointQ1);
        score.q2 += parseInt(game.HomePointQ2);
        score.q3 += parseInt(game.HomePointQ3);
        score.q4 += parseInt(game.HomePointQ4);
        score.ot += parseInt(game.HomePointOT);

        score.games++;
      }
    }

    for (let index = 0 ; index < this.AwayGames.length ; index++) {
      let game = this.AwayGames[index];
      if (game.Week > byeWeek) {
        score.total += parseInt(game.VisitorPointTotal);
        score.q1 += parseInt(game.VisitorPointQ1);
        score.q2 += parseInt(game.VisitorPointQ2);
        score.q3 += parseInt(game.VisitorPointQ3);
        score.q4 += parseInt(game.VisitorPointQ4);
        score.ot += parseInt(game.VisitorPointOT);

        score.games++;
      }
    }
    return score;
  };

  return Team;
};