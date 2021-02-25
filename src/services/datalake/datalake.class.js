const { Service } = require('feathers-sequelize');
// const logger = require('../../logger');

exports.Datalake = class Datalake extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }
  find(params) {
    return super.find(params);
  }

  async create(data, params) {
    // logger.info(`create air: ${data.air}\n\t`, data);

    // let { data: lastData } = await this.find({ query: { $limit: 1, $sort: { createdAt: -1 } } });
    // lastData = lastData[0];

    // let tinggi = lastData.air - 10;
    // if (tinggi < 10) tinggi = 10;
    // if(data.air > tinggi) tinggi = tinggi - data.air;
    // let debit = air;

    // logger.info(`find last air ${lastData.air} \n\t`, lastData);
    return super.create(data, params);
  }
};
