const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const categoryRouter = require('./category');
const historyRouter = require('./history');

/* GET home page. */
router.use(userRouter);
router.use(categoryRouter);
router.use(historyRouter);
router.get('/', (req, res) => {
  res.send('<h1>hi!!! 자동배포다!!</h1>');
});

module.exports = router;
