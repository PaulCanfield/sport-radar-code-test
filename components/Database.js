"use strict";
//var Sequelize = require('sequelize');

module.exports = class Database {
	constructor() {
		this.connection = new Sequelize('database', 'username', 'password', {
			dialect: 'sqlite',
			storage: './database/database.sqlite'
		});
	}

	game() {
		return new Game();
	}
}
