'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    title: { type: String, required: true },
    description: String,
    picture: String,
    moreLink: String,
    position: [Number]
  },
  { timestamps: true }
);

const Place = mongoose.model('Place', schema);

module.exports = Place;
