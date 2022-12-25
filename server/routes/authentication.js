'use strict';

const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const { routeGuard } = require('../middleware/route-guard');

router.post('/signup', (req, res, next) => {
  const { name, email, password } = req.body;

  if (email === '' || password === '' || name === '') {
    res
      .status(400)
      .json({ message: 'Name, Email and Password must be provided' });
    return;
  }
  //regex validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.'
    });
    return;
  }

  //regex validate the email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email)) {
    res.status(400).json({ message: 'Provide a valid email address.' });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).json({ message: 'This Email is already registrated' });
        return;
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
      res.status(200).json({ authToken: authToken });
    })
    .catch((error) => next(error));
});

router.post('/login', (req, res, next) => {
  const { email, password, stayLoggedInFlag } = req.body; // provide user a boolean to stay logged in

  if (email === '' || password === '') {
    res.status(400).json({ message: 'Fill in email and password.' });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ message: 'invalid credentials.' });
        return;
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
        res.status(200).json({ authToken: authToken });
      } else {
        res.status(401).json({ message: 'invalid credentials.' });
      }
    })
    .catch((error) => next(error));
});

router.get('/verify', routeGuard, (req, res, next) => {
  console.log('payload: ', req.payload);
  res.status(200).json(req.payload);
});

//ToDo
router.post('/password-reset', (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      res
        .status(409)
        .json({ message: 'User with given email does not exist!' });
    }
  });
});

module.exports = router;
