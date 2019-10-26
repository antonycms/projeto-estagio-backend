const Sequelize = require('sequelize');
const Model = Sequelize.Model;
const bcrypt = require('bcrypt');

class User extends Model {

  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (user) => {
      user.password_hash = await bcrypt.hash(user.password, 10);
    });

    return this;
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

module.exports = User;