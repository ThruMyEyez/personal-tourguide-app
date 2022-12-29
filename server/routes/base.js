'use strict';

const express = require('express');
const router = express.Router();
const ImageKit = require('imagekit');
const { routeGuard } = require('../middleware/route-guard');

const { sendEmail } = require('../utils/sendEmail');

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL
});

router.get('/', (req, res, next) => {
  console.log(req.body);
  res.json({ type: 'success', data: { title: 'Hello World', body: req.body } });
});

router.get('/mail', (req, res, next) => {
  console.log(true);
  sendEmail(
    'artur.baumeister@gmail.com',
    'NodeJS test mail',
    'content content and more content'
  );
});

router.get('/imagakit-authentication', (req, res, next) => {
  console.log('first');
  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.json(authenticationParameters);
});

router.get('/private', routeGuard, (req, res, next) => {
  res.json({ type: 'success', data: { title: 'Hello User' } });
});

module.exports = router;
