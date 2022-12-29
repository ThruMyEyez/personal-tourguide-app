'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true
  },
  token: { type: String, required: true },
  expireAt: {
    type: Date,
    /* Defaults 7 days from now */
    default: new Date(),
    // Remove Token after 60 seconds after specified date
    expires: 60
  }
});

const SecureToken = mongoose.model('SecureToken', schema);

module.exports = SecureToken;
