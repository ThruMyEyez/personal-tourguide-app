'use strict';

const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const { routeGuard } = require('../middleware/route-guard');

//? Registration route
router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).json({ message: 'This user already exist' });
      }
      const salt = bcryptjs.genSaltSync(10);
      const passwordHashAndSalt = bcryptjs.hashSync(password, salt);
      return User.create({ email, passwordHashAndSalt, name });
    })
    .then((user) => {
      const { _id, email, name } = user;
      const payload = { _id, email, name };
      const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '24h'
      });
      console.log(authToken);
      res.json({ authToken: authToken });
    })
    .catch((error) => next(error));
});

//? Login route
router.post('/login', (req, res, next) => {
  const { email, password, stayLoggedInFlag } = req.body; // provide user a boolean to stay logged in

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'invalid credentials.' });

      }
      const passwordCorrect = bcryptjs.compareSync(
        password,
        user.passwordHashAndSalt
      );
      if (passwordCorrect) {
        const { _id, email, name } = user;
        const payload = { _id, email, name };
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: 'HS256',
          expiresIn: 60 * 60 * 24
        });
        console.log(authToken);
        res.json({ authToken: authToken });
      } else {
        res.status(401).json({ message: 'invalid credentials.' });
      }
    })
    .catch((error) => next(error));
});

router.post('/logout', (req, res, next) => {
  res.json({});
});

router.get('/verify', routeGuard, (req, res, next) => {
  console.log('payload: ', req.payload);
  res.json(req.payload);
});

module.exports = router;
