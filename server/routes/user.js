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
    const { error, token, created } = await userService.auth(code);
    if (error) {
      res.status(400).json({});
      return;
    }
    if (created) {
      res.status(201).json({ token });
      return;
    }
    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
