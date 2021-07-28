const express = require('express');
const router = express.Router();
const historyService = require('../services/history');
const { privateRouter } = require('../middlewares/auth');
const { validDate } = require('../utils/date');

router.get('/api/v1/history', privateRouter, async (req, res, next) => {
  const { user } = req;
  const { year, month } = req.query;

  if (!year) {
    res.status(400).json({});
    return;
  }

  if (month && !validDate(year, month)) {
    res.status(400).json({});
    return;
  }

  try {
    const histories = await historyService.findAllHistoryByDate({ userId: user.id, year, month });
    res.status(200).json({ histories });
  } catch (err) {
    next(err);
  }
});

router.post('/api/v1/history', privateRouter, async (req, res, next) => {
  try {
    const { user } = req;
    const { content, cardId, typeId, price } = req.body;

    if (!(content && cardId && typeId && price)) {
      res.status(400).json({});
      return;
    }

    const history = await historyService.createHistory({ userId: user.id, cardId, content, price, typeId });
    res.status(201).json({ history });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
