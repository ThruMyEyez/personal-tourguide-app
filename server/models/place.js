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
    title: {
      type: String,
      required: [true, 'Title can not be empty, no new place created!'],
      minLength: [3, 'Title must be betwee least 3 characters, got {VALUE}'],
      maxLength: [92, 'Title can have max 92 characters, got {VALUE}']
    },
    description: {
      type: String,
      // min|maxLength to prevent provider to missuse or abuse the description
      /* perhaps not a good idea 
      minLength: [
        3,
        'Description must be betwee least 3 characters, got {VALUE}'
      ],*/
      maxLength: [240, 'Description can have max 240 characters, got {VALUE}']
    },
    picture: String,
    moreLink: String,
    position: [Number]
  },
  { timestamps: true }
);

const Place = mongoose.model('Place', schema);

module.exports = Place;
