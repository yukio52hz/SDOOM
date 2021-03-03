'use strict';

const mongoose = require("mongoose");

const schema_bodyAlbums = new mongoose.Schema({
    'code': { type: String, required: true, unique: true },
    'name': { type: String, required: true, unique: false },
    'realese_date': { type: Date, required: true, unique: false },
    'length_album': { type: Number, required: false, unique: false },
    'songs_list': { type: Array, required: false, unique: false },
});

module.exports = mongoose.model('Albums', schema_bodyAlbums, 'albums');