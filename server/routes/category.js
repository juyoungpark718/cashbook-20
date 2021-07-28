const express = require('express');
const router = express.Router();
const categoryService = require('../services/category');

router.get('/api/v1/category', async (req, res, next) => {
  try {
    const { types, cardCategories } = await categoryService.findAllCategories();
    res.status(200).json({ types, cardCategories });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
