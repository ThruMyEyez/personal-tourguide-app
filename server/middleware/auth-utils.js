'use strict';

const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');

const {
  JWT_SECRET,
  GOOGLE_OAUTH_CLIENT_ID,
  GOOGLE_OAUTH_CLIENT_SECRET,
  GOOGLE_OAUTH_REDIRECT_URL
} = process.env;

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

module.exports = { signNewJWT, verifyGoogleToken };
