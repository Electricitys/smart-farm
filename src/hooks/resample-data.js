// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const sequelize = require('sequelize');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { params } = context;
    
    if (params.query.$sample) {
      let sample = 'hour';
      sample = params.query.$sample;
      delete context.params.query.$sample;

      context.params.sequelize = {
        attributes: [
          [sequelize.fn('date_trunc', sample, sequelize.col('createdAt')), 'id'],
          [sequelize.fn('max', sequelize.col('createdAt')), 'createdAt'],
          [sequelize.fn('avg', sequelize.col('kelengasan_1')), 'kelengasan_1'],
          [sequelize.fn('avg', sequelize.col('kelengasan_2')), 'kelengasan_2'],
          [sequelize.fn('avg', sequelize.col('kelengasan_3')), 'kelengasan_3'],
          [sequelize.fn('avg', sequelize.col('suhu')), 'suhu'],
          [sequelize.fn('avg', sequelize.col('kelembapan')), 'kelembapan'],
          [sequelize.fn('max', sequelize.col('cahaya')), 'cahaya'],
          [sequelize.fn('sum', sequelize.col('air')), 'air']
        ],
        group: [sequelize.fn('date_trunc', sample, sequelize.col('createdAt'))]
      };
    }

    return context;
  };
};
