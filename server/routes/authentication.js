'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const User = require('./../models/user');
const jwt = require('jsonwebtoken');
const routeGuard = require('../middleware/route-guard');

const router = new Router();

router.get('/checkToken', routeGuard, (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (token) {
    res.status(200);
    res.json({ type: 'success', data: { foo: 'bar' } });
  } else {
    res.status(401);
    res.json({ type: 'error', error: { message: 'NO_AuthToken' } });
  }
});

router.post('/sign-up', (req, res, next) => {
  const { name, email, password } = req.body;
  bcryptjs
    .hash(password, 10)
    .then((hash) => {
      return User.create({
        name,
        email,
        passwordHashAndSalt: hash
      });
    })
    .then((user) => {
      req.session.userId = user._id;
      res.json({ user });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;

  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        console.log('result: ', result, user);
        //req.session.userId = user._id;
        const token = jwt.sign(
          { id: user._id, name: user.name, email: user.email },
          process.env.JWT_SECRET,
          { algorithm: 'HS256', expiresIn: '4h' }
        );
        res.json({ authToken: token });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

router.get('/me', routeGuard, (req, res, next) => {
  console.log('req.headerAuth: ', req.headers['x-access-token']);
  res.json({ user: req.user });
});

module.exports = router;
