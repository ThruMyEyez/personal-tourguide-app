'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    status: {
      type: String,
      enum: ['PaymentPending', 'PaymentDone', 'ClientVisited', 'Expired']
    }
  },
  { timestamps: true }
);

const Purchase = mongoose.model('Purchase', schema);

module.exports = Purchase;
