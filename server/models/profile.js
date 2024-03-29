'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true,
      unique: true
    },
    providerType: {
      type: String,
      enum: ['Tourguide', 'Host']
    },
    taxID: { type: String /*required: true*/, default: 'XX XXX XXX XXX' },
    company: {
      type: String,
      maxLength: [60, 'Title can have max 60 characters, got {VALUE}'],
      default: 'No company set'
    },
    bio: {
      type: String,
      default: `A short "Bio" or "About Me". Describe yourself!`
    },
    //Propably gallery is false here, we will see
    gallery: [String]
  },
  { timestamps: true }
);

const Profile = mongoose.model('Profile', schema);

module.exports = Profile;
