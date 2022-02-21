const router = require('express').Router();
module.exports = router;

// router.use('uri', require('modulepath'))

router.use((req, res, next) => {
  res.status(404).send('Not found');
});