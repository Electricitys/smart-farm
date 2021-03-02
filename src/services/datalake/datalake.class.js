const { Service } = require('feathers-sequelize');
const moment = require('moment');
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
    const now = moment().startOf('minutes');
    const reminder = 5 - (now.get('minute') % 5);
    const round = moment(now)
      .add(reminder, 'minutes')
      .subtract(5, 'minutes')
      ;

    let { data: lastData } = await this.find({
      query: {
        $limit: 1,
        createdAt: {
          $gte: round.toISOString()
        },
        $sort: { createdAt: -1 }
      }
    });
    lastData = lastData[0];

    if (lastData) {
      let patchData = {};
      Object.keys(data).forEach(key => {
        patchData[key] = (data[key] + lastData[key]) / 2;
      });
      return this.patch(lastData.id, patchData);
    }
    data.createdAt = round.toISOString();
    return super.create(data, params);
  }
};
