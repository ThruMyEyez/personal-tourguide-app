'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    productThumbnail: { type: String },
    productItem: {
      // Product item should contain the product item Type
      type: Schema.Types.ObjectId,
      ref: 'productItem',
      required: true
    }
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', schema);

module.exports = Product;
