//'use strict';
//
//const jwt = require('jsonwebtoken');
//const User = require('./../models/user');
//const { JWT_SECRET } = process.env;
//
//module.exports = (req, res, next) => {
//  const token = req.headers['auth-token'];
//  if (token) {
//    const decoded = jwt.verify(token, JWT_SECRET);
//    const userId = decoded.id; //req.session.userId;
//    User.findById(userId)
//      .then((user) => {
//        req.user = user;
//        res.locals.user = user;
//        next();
//      })
//      .catch((error) => {
//        next(error);
//      });
//  } else {
//    /*const error = new Error('AUTHENTICATION_TOKEN_REQUIRED');
//    error.status = 401;*/
//    next();
//  }
//};
