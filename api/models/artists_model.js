'use strict';
const mongoose = require('mongoose');

const schema_bodyArtits = new mongoose.Schema({
    'name': { type: String, required: true, unique: false },
    'record_house': { type: String, required: true, unique: false },
    'birth_date': { type: Date, required: true, unique: false },
    'profile_picture': { type: String, required: false, unique: false },
    'age': { type: Number, required: false, unique: false },
    'albums': [{ type: mongoose.Schema.Types.ObjectId, ref: 'Albums' }]

});

module.exports = mongoose.model('Artits', schema_bodyArtits, 'artits');