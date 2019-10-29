const router = require('express').Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');
const CityController = require('./app/controllers/CityController');

const auth = require('./app/middlewares/auth');

router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);

router.use(auth);

router.get('/', (req, res) => res.json({ tokenIsValid: true }));
router.post('/cities', CityController.store);
router.put('/cities', CityController.update);
router.get('/cities', CityController.index);

module.exports = router;