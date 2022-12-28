'use strict';

const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require('./../models/user');

const SecureToken = require('../models/secureToken');

const { routeGuard } = require('../middleware/route-guard');
const {
  signNewJWT,
  verifyGoogleToken,
  createSecureToken
} = require('../middleware/auth-utils');
const { sendEmail } = require('../utils/sendEmail');

//Login by Google account
router.post('/google/login', (req, res, next) => {
  if (!req.body.googleAccessToken) {
    res.status(203).json({ message: 'Could not recive Google Auth Token' });
  }
  let payload;
  verifyGoogleToken(req.body.googleAccessToken)
    .then((response) => {
      const { payload: data } = response;
      payload = {
        email: data?.email,
        name: data?.name,
        profilePicture: data?.picture,
        email_verified: data?.email_verified,
        firstName: data?.given_name,
        lastName: data?.family_name
      };
      return User.findOne({ email: payload.email });
    })
    .then((user) => {
      if (!user) {
        return User.create(payload);
      }

      const { _id, email, name, firstName, lastName, profilePicture, role } =
        user;
      const authToken = signNewJWT({
        _id,
        email,
        name,
        firstName,
        lastName,
        profilePicture,
        role
      });
      res.status(201).json({
        authToken: authToken,
        message: 'Login with google successful'
      });
    })
    .then((newUser) => {
      const { _id, email, name, firstName, lastName, profilePicture, role } =
        newUser;
      const authToken = signNewJWT({
        _id,
        email,
        name,
        firstName,
        lastName,
        profilePicture,
        role
      });
      console.log(authToken);
      res.status(201).json({
        authToken: authToken,
        message: 'signing up with google successful'
      });
    })
    .catch((error) => {
      next(error);
    });
});

//SignUp by Google account
router.post('/google/signup', (req, res, next) => {
  if (!req.body.googleAccessToken) {
    res.status(401).json({ message: 'Could not get Google Auth Token' });
  }
  let payload;
  verifyGoogleToken(req.body.googleAccessToken)
    .then((response) => {
      const { email, email_verified, name, picture, given_name, family_name } =
        response.payload;
      payload = {
        email,
        name,
        profilePicture: picture,
        email_verified,
        firstName: given_name,
        lastName: family_name
      };
      return User.findOne({ email });
    })
    .then((user) => {
      if (user) {
        res.status(401).json({ message: 'User already exist' });
      }
      return User.create(payload);
    })
    .then((user) => {
      const { _id, email, name, firstName, lastName, profilePicture, role } =
        user;
      const authToken = signNewJWT({
        _id,
        email,
        name,
        firstName,
        lastName,
        profilePicture,
        role
      });
      console.log(authToken);
      res.status(201).json({
        authToken: authToken,
        message: 'signing up with google successful'
      });
    })
    .catch((error) => {
      error.message =
        'An error occurred while registering new user with google';
      next(error);
    });
});

router.post('/signup', (req, res, next) => {
  //SignUp by Mail
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
      const authToken = signNewJWT(payload);
      res.status(200).json({
        authToken: authToken,
        message: 'signing up with email successful'
      });
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
        const authToken = signNewJWT(payload);
        console.log('TRUEE', authToken);
        res
          .status(200)
          .json({ authToken: authToken, message: 'Login successful' });
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

//get PW reset-url Email route
router.post('/password-reset', (req, res, next) => {
  let user;
  User.findOne({ email: req.body.email })
    .then((foundUser) => {
      if (!foundUser) {
        res
          .status(409)
          .json({ message: 'User with with this email does not exist!' });
      }
      user = foundUser;
      return createSecureToken(user._id, 1800);
    })
    .then((newSecureToken) => {
      const resetUrl = `http://localhost:3000/lost-password/${user.id}/${newSecureToken.token}`;
      sendEmail(req.body.email, 'password reset email', resetUrl);
      res
        .status(200)
        .json({ message: 'Email with Password reset-link sent successfully' });
    })
    .catch((error) => next(error));
});

router.get('/password-reset/:id/:token', (req, res, next) => {
  User.findOne({ _id: req.params.id })
    .then((user) => {
      if (!user) return res.status(400).json({ message: 'invalid URL' });
      return SecureToken.findOne({ userId: user._id, token: req.params.token });
    })
    .then((token) => {
      if (!token)
        return res.status(400).json({ message: 'Invalid reset SecureToken' });
      res.status(200).json({ message: 'Valid reset SecureToken' });
    })
    .catch((error) => next(error));
});

router.put('/password-reset/:id/:token', (req, res, next) => {
  const { password } = req.body;
  const { id, token } = req.params;

  //regex validate the password format
  const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!passwordRegex.test(password)) {
    res.status(400).json({
      message:
        'Password must have at least 6 characters and contain at least one number, one lowercase and one uppercase letter.'
    });
    return;
  }

  let passwordHashAndSalt;
  User.findOne({ id })
    .then((foundUser) => {
      if (!foundUser)
        return res.status(400).json({ message: 'Invalid user ID' });
      return SecureToken.findOne({ userId: id, token });
    })
    .then((token) => {
      if (!token)
        return res
          .status(400)
          .json({ message: 'SecurityToken not found or expired' });

      const salt = bcryptjs.genSaltSync(10);
      passwordHashAndSalt = bcryptjs.hashSync(password, salt);
      return User.findByIdAndUpdate(
        id,
        { passwordHashAndSalt, $inc: { __v: 1 } },
        { new: true }
      );
    })
    .then((user) => {
      res
        .status(200)
        .json({ message: `Password change successfully for ${user.name}` });
      return SecureToken.findOneAndRemove({ token: token });
    })
    .catch((error) => next(error));
});

module.exports = router;
