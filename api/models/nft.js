const mongoose = require('mongoose');

const NFTSchema = new mongoose.Schema({
  address: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: Array, required: true },
  customType: { type: String, required: true },
  customCategory: { type: String, required: true },
  owner: { type: Array, required: true },
  issuer: { type: Array, required: true },
  issuerName: { type: Array, required: true },
  transferable: { type: Boolean, required: true },
  createdAt: { type: Date, required: true },
});

const NFT = mongoose.model('NFT', NFTSchema);

module.exports = NFT;
