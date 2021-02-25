// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const datalake = sequelizeClient.define('datalake', {
    kelengasan_1: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    kelengasan_2: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    kelengasan_3: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    suhu: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    kelembapan: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cahaya: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    air: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    debit: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  datalake.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return datalake;
};
