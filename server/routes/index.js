const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const categoryRouter = require('./category');
const historyRouter = require('./history');
const categoryRouter = require('./category');

/* GET home page. */
router.use(userRouter);
router.use(categoryRouter);
router.use(historyRouter);
router.use(categoryRouter);

module.exports = router;
