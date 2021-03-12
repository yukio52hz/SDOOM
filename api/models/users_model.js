'use strict';
const mongoose = require('mongoose')

const schema_bodyUsers = new mongoose.Schema({
    'type': { type: String, required: true, unique: false },
    'name': { type: String, required: true, unique: false },
    'nickname': { type: String, required: true, unique: true },
    'birth_date': { type: Date, required: true, unique: false },
    'gender': { type: String, required: true, unique: false },
    'email': { type: String, required: true, unique: true },
    'password': { type: String, require: true, unique: false },
    'password_confirmation': { type: String, require: true, unique: false },
    'profile_picture': { type: String, required: false, unique: false },
    'playlists': [{ type: mongoose.Schema.Types.ObjectId, ref: 'Playlists' }],
});

module.exports = mongoose.model('Users', schema_bodyUsers, 'users');