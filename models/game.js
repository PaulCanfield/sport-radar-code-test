'use strict';
module.exports = function (sequelize, DataTypes) {
	const Game = sequelize.define('Game', {
		GameID: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		GameKey: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		GameDateTime: {
			type: DataTypes.DATE,
			allowNull: false
		},
		GameType: {
			type: DataTypes.STRING(10),
			allowNull: false
		},
		ISOTime: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		NetworkChannel: {
			type: DataTypes.STRING(10)
		},
		NGSGame: {
			type: DataTypes.BOOLEAN
		},
		Season: {
			type: DataTypes.INTEGER
		},
		SeasonType: {
			type: DataTypes.STRING(10)
		},
		Week: {
			type: DataTypes.STRING(10)
		},
		WeekName: {
			type: DataTypes.STRING(20)
		},
		Validated: {
			type: DataTypes.BOOLEAN
		},
		ReleasedToClubs: {
			type: DataTypes.BOOLEAN
		},

		ScoreTime: {
			type: DataTypes.STRING
		},
		ScorePhase: {
			type: DataTypes.STRING(10)
		},
		VisitorPointTotal: {
			type: DataTypes.INTEGER,
		},
		VisitorPointQ1: {
			type: DataTypes.INTEGER,
		},
		VisitorPointQ2: {
			type: DataTypes.INTEGER,
		},
		VisitorPointQ3: {
			type: DataTypes.INTEGER,
		},
		VisitorPointQ4: {
			type: DataTypes.INTEGER,
		},
		VisitorPointOT: {
			type: DataTypes.INTEGER,
		},
		VisitorTimeOutsRemaining: {
			type: DataTypes.INTEGER
		},
		HomePointTotal: {
			type: DataTypes.INTEGER,
		},
		HomePointQ1: {
			type: DataTypes.INTEGER,
		},
		HomePointQ2: {
			type: DataTypes.INTEGER,
		},
		HomePointQ3: {
			type: DataTypes.INTEGER,
		},
		HomePointQ4: {
			type: DataTypes.INTEGER,
		},
		HomePointOT: {
			type: DataTypes.INTEGER,
		},
		HomeTimeOutsRemaining: {
			type: DataTypes.INTEGER
		},

		SiteID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		HomeTeamID: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		VisitorTeamID: {
			type: DataTypes.INTEGER,
			allowNull: false
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
		tableName: 'Game'
	});

	Game.associate = function (models) {
//		Game.hasOne(models.Site, { as: 'Site', foreignKey: 'SiteID' });
	};

	return Game;
}