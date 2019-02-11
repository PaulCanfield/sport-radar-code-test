var express = require('express');
var router = express.Router();
var Request = require("request");
var Sequelize = require("sequelize");
var db = require("../models");
var sequelize = new Sequelize({
	"dialect": "sqlite",
	"storage": "./database/database.sqlite"
});
var async = require('async');

router.get('/:year(\\d{4})/?:team(\\w+)?', (req, res, next) => {
	let year = 2018;
	if (req.params.year) {
		year = req.params.year;
	}

	let url = "https://api.ngs.nfl.com/league/schedule?season="+ year +"&seasonType=REG";

	Request({
		"headers": {"content-type": "application/json"},
		"url": url
	}, (error, response, body) => { handleResponse(body, req, res, renderByeWeeks); });
});

router.get('/:team(\\w+)/?:year(\\d{4})?/?:quarter([oO][tT]\\b|[qQ][1234]\\b|all\\b)?/?', (req, res, next) => {
	let year = 2018;
	if (req.params.year) {
		year = req.params.year;
	}

	let url = "https://api.ngs.nfl.com/league/schedule?season="+ year +"&seasonType=REG";

	Request({
		"headers": {"content-type": "application/json"},
		"url": url
	}, (error, response, body) => { handleResponse(body, req, res, renderAveragePoints); });
});


function handleResponse(body, req, res, renderCallback) {
	const games = JSON.parse(body);

	async.eachSeries(games, (rawData, callback) => {
		db.Game.findByPk(rawData.gameId)
			.then((game) => {
				if (game) {
					callback();
				} else {
					db.Site.findByPk(rawData.site.siteId)
						.then( (site) => {
							if (site) {
								//pass
								//return site;
							} else {
								let siteData = {
									SiteID: rawData.site.siteId,
									SiteCity: rawData.site.siteCity,
									SiteFullname: rawData.site.siteFullname,
									SiteState: rawData.site.siteState,
									RoofType: rawData.site.roofType
								};

								return db.Site.create(siteData);
							}
						});

					insertTeam(rawData.homeTeam);
					insertTeam(rawData.visitorTeam);

					let dateString = rawData.gameDate + " " + rawData.gameTimeEastern;
					let gameData = {
						GameID: rawData.gameId,
						GameKey: rawData.gameKey,
						GameType: rawData.gameType,
						ISOTime: rawData.isoTime,
						SiteID: rawData.site.siteId,
						HomeTeamID: rawData.homeTeamId,
						VisitorTeamID: rawData.visitorTeamId,
						GameDateTime: dateString,
						NetworkChannel: rawData.networkChannel,
						NGSGame: rawData.ngsGame,
						Season: rawData.season,
						SeasonType: rawData.seasonType,
						Week: rawData.week,
						WeekName: rawData.weekName,
						ScoreTime: rawData.score.time,
						ScorePhase: rawData.score.phase,
						VisitorPointTotal: rawData.score.visitorTeamScore.pointTotal,
						VisitorPointQ1: rawData.score.visitorTeamScore.pointQ1,
						VisitorPointQ2: rawData.score.visitorTeamScore.pointQ2,
						VisitorPointQ3: rawData.score.visitorTeamScore.pointQ3,
						VisitorPointQ4: rawData.score.visitorTeamScore.pointQ4,
						VisitorPointOT: rawData.score.visitorTeamScore.pointOT,
						VisitorTimeOutsRemaining: rawData.score.visitorTeamScore.timeoutsRemaining,
						HomePointTotal: rawData.score.homeTeamScore.pointTotal,
						HomePointQ1: rawData.score.homeTeamScore.pointQ1,
						HomePointQ2: rawData.score.homeTeamScore.pointQ2,
						HomePointQ3: rawData.score.homeTeamScore.pointQ3,
						HomePointQ4: rawData.score.homeTeamScore.pointQ4,
						HomePointOT: rawData.score.homeTeamScore.pointOT,
						HomeTimeOutsRemaining: rawData.score.homeTeamScore.timeoutsRemaining,
						Validated: rawData.validated,
						ReleasedToClubs: rawData.releasedToClubs
					};
					db.Game.create(gameData)
						.then( () => {
							callback();
						});
				}
			});
	}, () => { renderCallback(req, res) });
}

function renderByeWeeks(req, res) {
	let year = 2018;
	if (req.params.year != null) {
		year = req.params.year;
	}

	let team = req.params.team;
	let whereClause = { };
	if (team) {
		whereClause = {
			Nick: team.toLowerCase().replace(/\b[a-z]/g, function(letter) {
				return letter.toUpperCase();
			})
		};
	}

	db.Team.findAll({
		include: [
			{association: 'HomeGames', where: { Season: year }},
			{association: 'AwayGames', where: { Season: year }},
		],
		where: whereClause
		})
		.then((teams) => {
			res.render('index', { title: 'NFL Team Bye Weeks', 'teams': teams } );
		});

	return true;
}

function renderAveragePoints(req, res) {
	let year = 2018;
	if (req.params.year != null) {
		year = req.params.year;
	}
	let teamNick = req.params.team;
	let quarter = req.params.quarter;
	if (quarter) {
		quarter.toLowerCase();
	}

	db.Team.findOne({
		include: [
			{association: 'HomeGames', where: { Season: year }},
			{association: 'AwayGames', where: { Season: year }},
		],
		where: {
			Nick: teamNick.toLowerCase().replace(/\b[a-z]/g, function(letter) {
				return letter.toUpperCase();
			})
		}
	})
	.then((team) => {
		let scores = team.getAverateScores();

		let quarters = null;
		if (quarter) {
			if (quarter == 'all') {
				quarters = [
					{
						name: 'Q1',
						points: Math.floor((scores['q1'] / scores.games) * 100) / 100
					},
					{
						name: 'Q2',
						points: Math.floor((scores['q2'] / scores.games) * 100) / 100
					},
					{
						name: 'Q3',
						points: Math.floor((scores['q3'] / scores.games) * 100) / 100
					},
					{
						name: 'Q4',
						points: Math.floor((scores['q4'] / scores.games) * 100) / 100
					},
					{
						name: 'Q5',
						points: Math.floor((scores['ot'] / scores.games) * 100) / 100
					}
				];
			} else {
				quarters = [{
					name: quarter.toUpperCase(),
					points: Math.floor((scores[quarter] / scores.games) * 100) / 100
				}];
			}
		}

		res.render('average', {
			title: "Average Points Since Bye Week",
			team: team,
			scores: scores,
			quarters: quarters,
			year: year,
			points: Math.floor((scores.total / scores.games) * 100) / 100
		});
	});
}

function insertTeam(rawData) {
	return db.Team.findByPk(rawData.teamId)
		.then( (team) => {
			if (team) {
				return team;
			} else {
				let teamData = {
					TeamID: rawData.teamId,
					Abbr: rawData.abbr,
					CityState: rawData.cityState,
					FullName: rawData.fullName,
					Nick: rawData.nick,
					TeamType: rawData.teamType,
					ConferenceAbbr: rawData.conferenceAbbr,
					DivisionAbbr: rawData.divisionAbbr
				};

				return db.Team.create(teamData);
			}
		});
}

module.exports = router;
