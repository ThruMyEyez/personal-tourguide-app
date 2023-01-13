'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'user'
    },
    title: { type: String, required: true },
    priceInCents: { type: Number, required: true },
    tagline: { type: String },
    productThumbnail: { type: String },
    productType: { type: String, enum: ['tour', 'event'], default: 'event' },
    productItem: {
      // Product item should contain the product item Type
      type: Schema.Types.ObjectId,
      ref: 'productItem'
    },
    rating: { type: [Schema.Types.ObjectId], ref: 'rating' }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', schema);

module.exports = Product;
