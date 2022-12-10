'use strict';

const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  console.log(req.body);
  res.json({ type: 'success', data: { title: 'Hello World', body: req.body } });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello User' } });
});

module.exports = router;
