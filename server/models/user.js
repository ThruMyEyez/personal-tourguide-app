'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true
    },
    passwordHashAndSalt: {
      type: String
    },
    firstName: { type: String },
    lastName: { type: String },
    profilePicture: { type: String },
    role: {
      type: String,
      enum: {
        values: ['user', 'provider', 'admin'],
        message: '{VALUE} is not supported as role!'
      },
      default: 'user'
    },
    email_verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

const User = mongoose.model('User', schema);

module.exports = User;
