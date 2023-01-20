'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
    product: {
      type: String
    },

    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    session: {
      type: String
    },
    sessionId: { type: String },

    status: {
      type: String,
      enum: ['PaymentPending', 'PaymentDone', 'ClientVisited', 'Expired']
    }
  },
  { timestamps: true }
);

const Purchase = mongoose.model('Purchase', schema);

module.exports = Purchase;
