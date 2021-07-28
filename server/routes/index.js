const express = require('express');
const router = express.Router();
const userRouter = require('./user');

/* GET home page. */
router.use(userRouter);

module.exports = router;
