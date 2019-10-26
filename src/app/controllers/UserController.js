const User = require('../models/User');
const yup = require('yup');

class UserController {
  async store(req, res) {
    const data = req.body;

    const schema = yup.object().shape({
      name: yup.string().required(),
      password: yup.string().min(6).required(),
      email: yup.string().email().required(),
    });

    if (!schema.isValid(data)) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const userExist = await User.findOne({
      where: { email: data.email },
    });
    if (userExist) {
      return res.status(401).json({ error: 'user exists' });
    }

    const { name, email } = await User.create(data);

    return res.json({
      name,
      email,
    })
  }
}

module.exports = new UserController();