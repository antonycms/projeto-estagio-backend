const Sequelize = require('sequelize');
const Model = Sequelize.Model;

class City extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        state: Sequelize.STRING,
        temp: Sequelize.STRING,
        temp_min: Sequelize.STRING,
        temp_max: Sequelize.STRING,
      },
      {
        sequelize
      });

    return this;
  }
}

module.exports = City;