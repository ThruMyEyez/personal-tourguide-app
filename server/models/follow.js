'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    follower: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    followee: { type: Schema.Types.ObjectId, required: true, ref: 'User' }
  },
  { timestamps: true }
);

const Follow = mongoose.model('Follow', schema);

module.exports = Follow;
