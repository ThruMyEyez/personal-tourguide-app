'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'product',
      required: true
    },
    eventDate: String,
    description: Object,
    places: {
      type: [Schema.Types.ObjectId],
      ref: 'place'
    }
  },
  { timestamps: true }
);

const ProductItem = mongoose.model('ProductItem', schema);

module.exports = ProductItem;
