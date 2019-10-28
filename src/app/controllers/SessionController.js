const User = require('../models/User');
const yup = require('yup');
const jwt = require('jsonwebtoken');

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const schema = yup.object().shape({
      email: yup.string().required(),
      password: yup.string().required(),
    });

    if (!(await schema.isValid({ email, password }))) {
      return res.status(400).json({ error: 'validation fails' });
    }

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: 'user not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'password does not match' });
    }

    const { id, name } = user;

    return res.json({
      userId: id,
      token: jwt.sign({ id, name }, process.env.SECRET_KEY, { expiresIn: '1d' }),
    });
  }
}

module.exports = new SessionController();