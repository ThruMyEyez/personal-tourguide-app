'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    title: {
      type: String,
      required: [true, 'Title can not be empty, no new place created!'],
      maxLength: [92, 'Title can have max 92 characters, got {VALUE}'],
      unique: true
    },
    eventDate: Date,
    description: String,
    places: {
      type: [Schema.Types.ObjectId],
      ref: 'place'
    }
  },
  { timestamps: true }
);

const ProductItem = mongoose.model('ProductItem', schema);

module.exports = ProductItem;
