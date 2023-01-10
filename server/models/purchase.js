'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    product: {
      _id: { type: Schema.Types.ObjectId, required: true, ref: 'product' },
      title: { type: String, required: true },
      price: { type: Number },
      tagline: { type: String },
      productThumbnail: { type: String },
      productType: { type: String, enum: ['tour', 'event'] },
      productItem: {
        // Product item should contain the product item Type
        type: Schema.Types.ObjectId,
        ref: 'productItem',
        required: true
      }
    },

    status: {
      type: String,
      enum: ['PaymentPending', 'PaymentDone', 'ClientVisited', 'Expired']
    }
  },
  { timestamps: true }
);

const Purchase = mongoose.model('Purchase', schema);

module.exports = Purchase;
