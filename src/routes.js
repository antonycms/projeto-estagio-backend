const router = require('express').Router();

const UserController = require('./app/controllers/UserController');

router.post('/users', UserController.store);

module.exports = router;