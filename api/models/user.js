const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  did: { type: String, required: true },
  name: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
