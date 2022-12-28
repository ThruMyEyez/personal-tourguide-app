'use strict';

const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const SecureToken = require('../models/secureToken');
const crypto = require('crypto');

const { JWT_SECRET, GOOGLE_OAUTH_CLIENT_ID } = process.env;

const signNewJWT = (payload) => {
  return jwt.sign(payload, JWT_SECRET, {
    algorithm: 'HS256',
    expiresIn: '24h'
  });
};

const verifyGoogleToken = (googleAccessToken) => {
  const client = new OAuth2Client(GOOGLE_OAUTH_CLIENT_ID);
  return client.verifyIdToken({
    idToken: googleAccessToken,
    audience: GOOGLE_OAUTH_CLIENT_ID
  });
};

const createSecureToken = (userId, expirationSeconds) => {
  return SecureToken.findOne({ userId }).then((token) => {
    if (!token) {
      return SecureToken.create({
        userId: userId,
        token: crypto.randomBytes(32).toString('hex'),
        //PW Reset Token expires after defined seconds.
        expireAt: new Date(new Date().valueOf() + 1000 * expirationSeconds)
      });
    }
    return token;
  });
};

module.exports = { signNewJWT, verifyGoogleToken, createSecureToken };
