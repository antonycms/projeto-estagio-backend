const City = require('../models/City');
const yup = require('yup');

class CityController {
  async store(req, res) {
    const data = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      state: yup.string().required(),
    });

    if (!(await schema.isValid(data))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const cityExist = await City.findOne({
      where: {
        name: data.name,
      }
    });

    if (cityExist) {
      return res.status(400).json({ error: 'city has already been saved' })
    }

    const city = await City.create(data);

    const { name, state } = city;

    return res.json({
      name,
      state,
      sucess: true,
    });
  }

  async index(req, res) {
    const cities = await City.findAll({
      attributes: ['name', 'state', 'temp', 'temp_min', 'temp_max'],
    });

    return res.json(cities);
  }

  async update(req, res) {
    const userId = req.userId;
    const data = req.body;

    const schema = yup.object().shape({
      temp: yup.string(),
      temp_min: yup.string(),
      temp_max: yup.string(),
    });

    if (!(await schema.isValid(data))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const user = await City.findByPk(userId);

    const { temp, temp_min, temp_max } = await user.update(data);

    return res.json({
      temp,
      temp_min,
      temp_max,
      sucess: true,
    });
  }
}

module.exports = new CityController();