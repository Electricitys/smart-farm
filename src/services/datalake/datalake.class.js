const sequelize = require("sequelize");
const { Service } = require('feathers-sequelize');

exports.Datalake = class Datalake extends Service {
  constructor(options, app) {
    super(options);
    this.app = app;
  }
  find(params) {
    let sample = "hour";
    if (params.query.$sample) {
      sample = params.query.$sample;
      delete params.query.$sample;
    }
    params.paginate = {
      ...this.app.get("paginate"),
      max: 25
    }
    params.sequelize = {
      attributes: [
        [sequelize.fn("date_trunc", sample, sequelize.col("createdAt")), "id"],
        [sequelize.fn("max", sequelize.col("createdAt")), "createdAt"],
        [sequelize.fn("avg", sequelize.col("kelengasan_1")), "kelengasan_1"],
        [sequelize.fn("avg", sequelize.col("kelengasan_2")), "kelengasan_2"],
        [sequelize.fn("avg", sequelize.col("kelengasan_3")), "kelengasan_3"],
        [sequelize.fn("avg", sequelize.col("suhu")), "suhu"],
        [sequelize.fn("avg", sequelize.col("kelembapan")), "kelembapan"],
        [sequelize.fn("max", sequelize.col("cahaya")), "cahaya"],
        [sequelize.fn("sum", sequelize.col("air")), "air"]
      ],
      group: [sequelize.fn("date_trunc", sample, sequelize.col("createdAt"))]
    }
    return super.find(params);
  }
};
