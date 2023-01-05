'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    comment: String
  },
  { timestamps: true }
);

const Rating = mongoose.model('Rating', schema);

module.exports = Rating;
