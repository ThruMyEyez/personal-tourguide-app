'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    stars: { type: Number, min: 1, max: 5 },
    comment: String
  },
  { timestamps: true }
);

const Rating = mongoose.model('Rating', schema);

module.exports = Rating;
