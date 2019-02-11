'use strict';
module.exports = (sequelize, DataTypes) => {
  const Site = sequelize.define('Site', {
    SiteID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    SiteCity: {
      type: DataTypes.STRING(50)
    },
    SiteFullname: {
      type: DataTypes.STRING(50),
    },
    SiteState: {
      type: DataTypes.STRING(20)
    },
    RoofType: {
      type: DataTypes.STRING(50)
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
    tableName: 'Site'
  });

  Site.associate = function(models) {
    // associations can be defined here
  };
  return Site;
};