const jwt = require('jsonwebtoken');
const { promisify } = require('util');

async function checkToken(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) {
    return res.status(401).json({ error: 'token not provided' });
  }

  const [, token] = auth.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    req.userId = decoded.id;
    next();
  }
  catch ({ messsage }) {
    return res.status(401).json({ error: 'invalid token' });
  }
}

module.exports = checkToken;