const router = require('express').Router();

const UserController = require('./app/controllers/UserController');
const SessionController = require('./app/controllers/SessionController');

router.post('/users', UserController.store);
router.post('/sessions', SessionController.store);

module.exports = router;