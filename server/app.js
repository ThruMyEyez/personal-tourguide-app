'use strict';

/* required packages */
const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const createError = require('http-errors');
const connectMongo = require('connect-mongo');
const cors = require('cors');
const expressSession = require('express-session');
const logger = require('morgan');
const serveFavicon = require('serve-favicon');
const mongoose = require('mongoose');
/* middleware folder */
//const authenticationDeserializer = require('./middleware/authentication-deserializer.js');
/* routes folder */
const baseRouter = require('./routes/base');
const authenticationRouter = require('./routes/authentication');
const placeRouter = require('./routes/place');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');
const profileRouter = require('./routes/profile');

const app = express();

/* config middleware */
app.use(serveFavicon(path.join(__dirname, 'public/images', 'favicon.ico')));
app.use(logger('dev'));
app.use(
  cors({
    ...(process.env.CLIENT_APP_ORIGINS && {
      origin: process.env.CLIENT_APP_ORIGINS.split(',')
    }),
    credentials: true
  })
);

app.use(express.json()); // rest req.body with json

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    proxy: true,
    proxy: true,
    cookie: {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : false,
      secure: process.env.NODE_ENV === 'production'
    },
    store: connectMongo.create({
      mongoUrl: process.env.MONGODB_URI,
      ttl: 60 * 60
    })
  })
);

/* init custom */
//app.use(authenticationDeserializer);

/* Routes path config */
app.use('/', baseRouter);
app.use('/authentication', authenticationRouter);
app.use('/place', placeRouter);
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/profile', profileRouter);
/* Catch missing routes and forward to error handler */
app.use((req, res, next) => {
  next(createError(404));
});

/* Catch all error handler */
app.use((error, req, res, next) => {
  console.log('Error Catch all handling Middleware called');
  console.log('Path: ', req.path);
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

/* db */

const { NODE_ENV, PORT, MONGODB_URI } = process.env;
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Database connected to URI "${MONGODB_URI}"`);
    app
      .listen(Number(PORT), () => {
        console.log(`Server listening to requests on port ${PORT}`);
        if (NODE_ENV === 'development') {
          console.log(`Visit http://localhost:${PORT} to develop your app`);
        }
      })
      .on('error', (error) => {
        console.log('There was a server error.', error);
        process.exit(1);
      });
  })
  .catch((error) => {
    console.log(
      `There was an error connecting to the database "${MONGODB_URI}"`,
      error
    );
  });
