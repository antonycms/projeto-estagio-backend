const router = require('express').Router();

//router.post('/users');
router.get('/', (req, res) => res.json({ test: "ok" }));
module.exports = router;