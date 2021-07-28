const express = require('express');
const router = express.Router();
const userService = require('../services/user');

router.get('/user/auth', async (req, res, next) => {
  const { code } = req.query;
  if (!code) {
    res.status(400).json({});
    return;
  }
  try {
    const { error, user, token, created } = await userService.auth(code);
    if (error) throw new Error(error);
    if (created) {
      res.status(201).json({ user, token });
      return;
    }
    res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
