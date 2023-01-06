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
    providerType: {
      type: [String],
      enum: ['Guide', 'Host']
    },
    taxID: { type: String /*required: true*/ },
    bio: String,
    //Propably gallery is false here, we will see
    gallery: [String]
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', schema);

module.exports = Profile;
