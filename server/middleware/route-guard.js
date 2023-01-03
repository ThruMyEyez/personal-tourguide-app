'use strict';

// Route Guard Middleware
// This piece of middleware is going to check if a user is authenticated
// If not, it sends the request to the app error handler with a message
const { expressjwt: jwt } = require('express-jwt');

const getTokenFromHeaders = (req) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];
    return token;
  }
  return null;
};

const routeGuard = jwt({
  secret: process.env.JWT_SECRET,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders
});

module.exports = { routeGuard };