const router = require('express').Router();
module.exports = router;

// router.use('/authorization', require('./authorization'))

router.use((req, res, next) => {
  res.status(404).send('Not found');
});