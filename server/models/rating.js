'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    stars: { type: Number, required: true, min: 1, max: 5 },
    comment: String
  },
  { timestamps: true }
);

const Rating = mongoose.model('Rating', schema);

module.exports = Rating;
