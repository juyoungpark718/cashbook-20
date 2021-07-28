const express = require('express');
const router = express.Router();
const userService = require('../services/user');
const cardService = require('../services/card');
const { privateRouter } = require('../middlewares/auth');

router.get('/user/auth', async (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    res.status(400).json({});
    return;
  }
  try {
    const { error, token, created, cards, user } = await userService.auth(code);
    if (error) {
      res.status(400).json({});
      return;
    }
    if (created) {
      res.status(201).json({ token, cards, user });
      return;
    }
    res.status(200).json({ token, cards, user });
  } catch (err) {
    next(err);
  }
});

router.get('/user', privateRouter, async (req, res, next) => {
  try {
    const { user } = req;
    const findedUser = await userService.findUserById(user.id);

    if (!findedUser) {
      res.status(400).json({});
      return;
    }

    const cards = await cardService.findAllByUserId(user.id);

    res.status(200).json({
      cards,
      user,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
